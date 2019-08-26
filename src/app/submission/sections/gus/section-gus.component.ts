import {ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {
  DynamicCheckboxModel,
  DynamicDatePickerModel,
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout, DynamicFormLayoutService,
  DynamicFormModel, DynamicFormValidationService, DynamicInputModel, DynamicRadioGroupModel
} from '@ng-dynamic-forms/core';

import {Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, filter, find, first, flatMap, map, take, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {isEqual} from 'lodash';

import {FormBuilderService} from '../../../shared/form/builder/form-builder.service';
import {FormComponent} from '../../../shared/form/form.component';
import {FormService} from '../../../shared/form/form.service';
import {SectionModelComponent} from '../models/section.model';
import {SubmissionFormsConfigService} from '../../../core/config/submission-forms-config.service';
import {hasValue, isNotEmpty, isUndefined} from '../../../shared/empty.util';
import {ConfigData} from '../../../core/config/config-data';
import {JsonPatchOperationPathCombiner} from '../../../core/json-patch/builder/json-patch-operation-path-combiner';
import {SubmissionFormsModel} from '../../../core/config/models/config-submission-forms.model';
import {SubmissionSectionError, SubmissionSectionObject} from '../../objects/submission-objects.reducer';
import {FormFieldPreviousValueObject} from '../../../shared/form/builder/models/form-field-previous-value-object';
import {GLOBAL_CONFIG} from '../../../../config';
import {GlobalConfig} from '../../../../config/global-config.interface';
import {SectionDataObject} from '../models/section-data.model';
import {renderSectionFor} from '../sections-decorator';
import {SectionsType} from '../sections-type';
import {SubmissionService} from '../../submission.service';
import {SectionGusOperationsService} from './section-gus-operations.service';
import {NotificationsService} from '../../../shared/notifications/notifications.service';
import {SectionsService} from '../sections.service';
import {difference} from '../../../shared/object.util';
import {WorkspaceitemSectionFormObject} from '../../../core/submission/models/workspaceitem-section-form.model';
import {SECTION_LICENSE_FORM_LAYOUT, SECTION_LICENSE_FORM_MODEL} from '../license/section-license.model';
import {SECTION_GUS_FORM_LAYOUT, SECTION_GUS_FORM_MODEL} from './section-gus.model';
import {AuthorityService} from '../../../core/integration/authority.service';
import {IntegrationData} from '../../../core/integration/integration-data';
import {PageInfo} from '../../../core/shared/page-info.model';
import {AuthorityValue} from '../../../core/integration/models/authority.value';
import {PanelData} from '../../../shared/form/builder/ds-dynamic-form-ui/models/gus/gus.panelData.models';
import {IntegrationSearchOptions} from '../../../core/integration/models/integration-options.model';
import {NgbAccordion, NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';


/**
 * This component represents a section that contains a Form.
 */
@Component({
  selector: 'ds-submission-section-form',
  styleUrls: ['./section-gus.component.scss'],
  templateUrl: './section-gus.component.html',
})
@renderSectionFor(SectionsType.gus)
export class SubmissionSectionGusComponent extends SectionModelComponent {

  /**
   * The form id
   * @type {string}
   */
  public formId: string;

  /**
   * The form model
   * @type {DynamicFormControlModel[]}
   */
  public formModel: DynamicFormControlModel[];

  /**
   * A boolean representing if this section is updating
   * @type {boolean}
   */
  public isUpdating = false;

  /**
   * A boolean representing if this section is loading
   * @type {boolean}
   */
  public isLoading = true;

  /**
   * The form config
   * @type {SubmissionFormsModel}
   */
  protected formConfig: SubmissionFormsModel;

  /**
   * The form data
   * @type {any}
   */
  protected formData: any = Object.create({});

  /**
   * The [JsonPatchOperationPathCombiner] object
   * @type {JsonPatchOperationPathCombiner}
   */
  protected pathCombiner: JsonPatchOperationPathCombiner;

  /**
   * The [FormFieldPreviousValueObject] object
   * @type {FormFieldPreviousValueObject}
   */
  protected previousValue: FormFieldPreviousValueObject = new FormFieldPreviousValueObject();

  /**
   * The list of Subscription
   * @type {Array}
   */
  protected subs: Subscription[] = [];

  /**
   * The FormComponent reference
   */
  @ViewChild('formRef') private formRef: FormComponent;

  /**
   * The [[DynamicFormLayout]] object
   * @type {DynamicFormLayout}
   */
  public formLayout: DynamicFormLayout = SECTION_GUS_FORM_LAYOUT;

  protected searchOptions: IntegrationSearchOptions;

  public optionsList: any;

  public panelData: PanelData[];

  /**
   * Initialize instance variables
   *
   * @param {ChangeDetectorRef} cdr
   * @param {FormBuilderService} formBuilderService
   * @param {SectionGusOperationsService} formOperationsService
   * @param {FormService} formService
   * @param {SubmissionFormsConfigService} formConfigService
   * @param {NotificationsService} notificationsService
   * @param {SectionsService} sectionService
   * @param {SubmissionService} submissionService
   * @param {TranslateService} translate
   * @param {GlobalConfig} EnvConfig
   * @param {string} injectedCollectionId
   * @param {SectionDataObject} injectedSectionData
   * @param {string} injectedSubmissionId
   */
  constructor(protected cdr: ChangeDetectorRef,
              protected formBuilderService: FormBuilderService,
              protected formOperationsService: SectionGusOperationsService,
              protected formService: FormService,
              protected formConfigService: SubmissionFormsConfigService,
              protected notificationsService: NotificationsService,
              protected sectionService: SectionsService,
              protected submissionService: SubmissionService,
              protected translate: TranslateService,
              private authorityService: AuthorityService,
              @Inject(GLOBAL_CONFIG) protected EnvConfig: GlobalConfig,
              @Inject('collectionIdProvider') public injectedCollectionId: string,
              @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
              @Inject('submissionIdProvider') public injectedSubmissionId: string) {
    super(injectedCollectionId, injectedSectionData, injectedSubmissionId);
  }

  /**
   * Initialize all instance variables and retrieve form configuration
   */
  onSectionInit() {
    this.panelData = new Array<PanelData>();
    this.pathCombiner = new JsonPatchOperationPathCombiner('sections', this.sectionData.id);
    this.formId = this.formService.getUniqueId(this.sectionData.id);

    this.isLoading = false;

    this.searchOptions = new IntegrationSearchOptions(
      // this.model.authorityOptions.scope
      this.collectionId,
      // this.model.authorityOptions.name
      'gus',
      // this.model.authorityOptions.metadata
      'dc.subject',
      '',
      // this.model.maxOptions
      100,
      1
    );

    this.authorityService.getEntriesByName(this.searchOptions).pipe(
      catchError(() => {
        const emptyResult = new IntegrationData(
          new PageInfo(),
          []
        );
        return observableOf(emptyResult);
      }),
      first())
      .subscribe((object: IntegrationData) => {
          console.log('IntegrationData: ', IntegrationData)
          this.optionsList = object.payload;

          for (const option  of this.optionsList) {
            console.log('option: ', option);
          }

          for (const option  of this.optionsList) {
            const currAuthority: AuthorityValue = option as AuthorityValue;
            const panelData: PanelData = new PanelData();
            if ((currAuthority.display.match(new RegExp('::', 'g')) || []).length === 1) {
              const parts: string[] = currAuthority.display.split('::');
              const panelTitle: string = parts[1];
              panelData.panelTitle = panelTitle;
              // console.log('panelTitle: ', panelTitle);
              const panelItemNames: string[] = new Array<string>();
              for (const option1 of this.optionsList) {
                // console.log('option1: ', option1);
                if (option1.display.includes(panelTitle + '::')) {
                  panelItemNames.push(option1.display.split('::')[2])
                }
              }
              panelData.panelItemNames = panelItemNames;
              this.panelData.push(panelData);
              console.log('this.panelData: ', this.panelData)
            }

          }

        }
      )

  }

  /**
   * Unsubscribe from all subscriptions
   */
  onSectionDestroy() {
    this.subs
      .filter((subscription) => hasValue(subscription))
      .forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Get section status
   *
   * @return Observable<boolean>
   *     the section status
   */
  protected getSectionStatus(): Observable<boolean> {
    return this.formService.isValid(this.formId);
  }

  /**
   * Check if the section data has been enriched by the server
   *
   * @param sectionData
   *    the section data retrieved from the server
   */
  hasMetadataEnrichment(sectionData: WorkspaceitemSectionFormObject): boolean {
    const diffResult = [];

    // compare current form data state with section data retrieved from store
    const diffObj = difference(sectionData, this.formData);

    // iterate over differences to check whether they are actually different
    Object.keys(diffObj)
      .forEach((key) => {
        diffObj[key].forEach((value) => {
          if (value.hasOwnProperty('value')) {
            diffResult.push(value);
          }
        });
      });
    return isNotEmpty(diffResult);
  }

  /**
   * Initialize form model
   *
   * @param sectionData
   *    the section data retrieved from the server
   */
  initForm(sectionData: WorkspaceitemSectionFormObject): void {
    try {
      this.formModel = this.formBuilderService.modelFromConfiguration(
        this.formConfig,
        this.collectionId,
        sectionData,
        this.submissionService.getSubmissionScope());
    } catch (e) {
      const msg: string = this.translate.instant('error.submission.sections.init-form-error') + e.toString();
      const sectionError: SubmissionSectionError = {
        message: msg,
        path: '/sections/' + this.sectionData.id
      };
      this.sectionService.setSectionError(this.submissionId, this.sectionData.id, sectionError);
    }
  }

  /**
   * Update form model
   *
   * @param sectionData
   *    the section data retrieved from the server
   * @param errors
   *    the section errors retrieved from the server
   */
  updateForm(sectionData: WorkspaceitemSectionFormObject, errors: SubmissionSectionError[]): void {

    if (isNotEmpty(sectionData) && !isEqual(sectionData, this.sectionData.data)) {
      this.sectionData.data = sectionData;
      if (this.hasMetadataEnrichment(sectionData)) {
        const msg = this.translate.instant(
          'submission.sections.general.metadata-extracted',
          {sectionId: this.sectionData.id});
        this.notificationsService.info(null, msg, null, true);
        this.isUpdating = true;
        this.formModel = null;
        this.cdr.detectChanges();
        this.initForm(sectionData);
        this.checksForErrors(errors);
        this.isUpdating = false;
        this.cdr.detectChanges();
      } else if (isNotEmpty(errors) || isNotEmpty(this.sectionData.errors)) {
        this.checksForErrors(errors);
      }
    } else if (isNotEmpty(errors) || isNotEmpty(this.sectionData.errors)) {
      this.checksForErrors(errors);
    }

  }

  /**
   * Check if there are form validation error retrieved from server
   *
   * @param errors
   *    the section errors retrieved from the server
   */
  checksForErrors(errors: SubmissionSectionError[]): void {
    this.formService.isFormInitialized(this.formId).pipe(
      find((status: boolean) => status === true && !this.isUpdating))
      .subscribe(() => {
        this.sectionService.checkSectionErrors(this.submissionId, this.sectionData.id, this.formId, errors, this.sectionData.errors);
        this.sectionData.errors = errors;
        this.cdr.detectChanges();
      });
  }

  /**
   * Initialize all subscriptions
   */
  subscriptions(): void {
    this.subs.push(
      /**
       * Subscribe to form's data
       */
      this.formService.getFormData(this.formId).pipe(
        distinctUntilChanged())
        .subscribe((formData) => {
          this.formData = formData;
        }),

      /**
       * Subscribe to section state
       */
      this.sectionService.getSectionState(this.submissionId, this.sectionData.id).pipe(
        filter((sectionState: SubmissionSectionObject) => {
          return isNotEmpty(sectionState) && (isNotEmpty(sectionState.data) || isNotEmpty(sectionState.errors))
        }),
        distinctUntilChanged())
        .subscribe((sectionState: SubmissionSectionObject) => {
          this.updateForm(sectionState.data as WorkspaceitemSectionFormObject, sectionState.errors);
        })
    )
  }

  /**
   * Method called when a form dfChange event is fired.
   * Dispatch form operations based on changes.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onChange(event: DynamicFormControlEvent): void {
    this.formOperationsService.dispatchOperationsFromEvent(
      this.pathCombiner,
      event,
      this.previousValue,
      this.hasStoredValue(this.formBuilderService.getId(event.model), this.formOperationsService.getArrayIndexFromEvent(event)));
    const metadata = this.formOperationsService.getFieldPathSegmentedFromChangeEvent(event);
    const value = this.formOperationsService.getFieldValueFromChangeEvent(event);

    if (this.EnvConfig.submission.autosave.metadata.indexOf(metadata) !== -1 && isNotEmpty(value)) {
      this.submissionService.dispatchSave(this.submissionId);
    }
  }

  /**
   * Method called when a form dfFocus event is fired.
   * Initialize [FormFieldPreviousValueObject] instance.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onFocus(event: DynamicFormControlEvent): void {
    const value = this.formOperationsService.getFieldValueFromChangeEvent(event);
    const path = this.formBuilderService.getPath(event.model);
    if (this.formBuilderService.hasMappedGroupValue(event.model)) {
      this.previousValue.path = path;
      this.previousValue.value = this.formOperationsService.getQualdropValueMap(event);
    } else if (isNotEmpty(value) && ((typeof value === 'object' && isNotEmpty(value.value)) || (typeof value === 'string'))) {
      this.previousValue.path = path;
      this.previousValue.value = value;
    }
  }

  /**
   * Method called when a form remove event is fired.
   * Dispatch form operations based on changes.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onRemove(event: DynamicFormControlEvent): void {
    this.formOperationsService.dispatchOperationsFromEvent(
      this.pathCombiner,
      event,
      this.previousValue,
      this.hasStoredValue(this.formBuilderService.getId(event.model), this.formOperationsService.getArrayIndexFromEvent(event)));
  }

  /**
   * Check if the specified form field has already a value stored
   *
   * @param fieldId
   *    the section data retrieved from the serverù
   * @param index
   *    the section data retrieved from the server
   */
  hasStoredValue(fieldId, index): boolean {
    if (isNotEmpty(this.sectionData.data)) {
      return this.sectionData.data.hasOwnProperty(fieldId) && isNotEmpty(this.sectionData.data[fieldId][index]);
    } else {
      return false;
    }
  }
}
