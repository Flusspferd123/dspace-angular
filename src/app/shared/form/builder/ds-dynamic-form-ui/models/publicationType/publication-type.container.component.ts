import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of, of as observableOf } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import {
  DynamicFormControlComponent, DynamicFormControlEvent, DynamicFormControlModel,
  DynamicFormLayoutService,
  DynamicFormValidationService, DynamicSelectModel, DynamicSelectModelConfig
} from '@ng-dynamic-forms/core';

import { AuthorityValue } from '../../../../../../core/integration/models/authority.value';
import { PageInfo } from '../../../../../../core/shared/page-info.model';
import { isNull, isUndefined } from '../../../../../empty.util';
import { AuthorityService } from '../../../../../../core/integration/authority.service';
import { IntegrationSearchOptions } from '../../../../../../core/integration/models/integration-options.model';
import { IntegrationData } from '../../../../../../core/integration/integration-data';
import { PUBLICATIONTYPE_CONTAINER_LAYOUT, PublicationtypeModel } from './publicationtype.model';
import { DropdownOption } from './presentation/models/dropdownOption';

@Component({
  selector: 'ds-dynamic-publicationtype-container',
  styleUrls: ['./publication-type.container.component.scss'],
  templateUrl: './publication-type.container.component.html'
})
export class PublicationTypeContainerComponent extends DynamicFormControlComponent implements OnInit {
  @Input() bindId = true;
  @Input() formGroup: FormGroup;
  @Input() model: PublicationtypeModel;
  @Input() formId: string;
  @Input() formModel: DynamicFormControlModel[];

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public currentValue: Observable<string>;
  public loading = false;
  public pageInfo: PageInfo;
  public optionsList: any;

  public formLayout = PUBLICATIONTYPE_CONTAINER_LAYOUT;

  protected searchOptions: IntegrationSearchOptions;

  public categorySet: Set<string>;
  public categoryToTypesMap: Map<string, DropdownOption[]>
  public categoryDropDownOptions: DropdownOption[];

  constructor(private authorityService: AuthorityService,
              private cdr: ChangeDetectorRef,
              protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService
  ) {
    super(layoutService, validationService);
  }

  ngOnInit() {
    this.searchOptions = new IntegrationSearchOptions(
      this.model.authorityOptions.scope,
      this.model.authorityOptions.name,
      this.model.authorityOptions.metadata,
      '',
      this.model.maxOptions,
      1);
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
          this.optionsList = object.payload;

          if (this.model.value) {
            this.setCurrentValue(this.model.value);
          }
          this.pageInfo = object.pageInfo;
          this.cdr.detectChanges();
        },
        (error) => console.log('There was an error retrieving the optionsList for publication type selector'),
        () => this.setTypesData()
      )

  }

  private setTypesData() {
    this.categorySet = new Set<string>();
    this.categoryToTypesMap = new Map<string, DropdownOption[]>();
    this.categoryDropDownOptions = new Array<DropdownOption>();
    // create the category dropdown set
    for (const option  of this.optionsList) {
      const currAuthority: AuthorityValue = option as AuthorityValue;

      if ((currAuthority.display.match(new RegExp('::', 'g')) || []).length === 2) {
        const parts: string[] = currAuthority.display.split('::');
        const category: string = parts[1];
        // const dropdownOption = new DropdownOption(category, category) // category is used as label and value
        if (!this.categorySet.has(category)) {
          this.categorySet.add(category)
        }
      }
    }
    for (const category of Array.from(this.categorySet.values())) {
      const dropDownOption: DropdownOption = new DropdownOption(category, category);
      this.categoryDropDownOptions.push(dropDownOption);
    }
    console.log('categoryDropDownOptions: ', this.categoryDropDownOptions);

    // create the categoryToTypesMap
    // tslint:disable-next-line:forin
    for (const category of Array.from(this.categorySet.values())) {
      const typesPerCategory: DropdownOption[] = new Array<DropdownOption>();
      for (const option  of this.optionsList) {
        const currAuthority: AuthorityValue = option as AuthorityValue;
        const parts: string[] = currAuthority.display.split('::');
        if (parts.length === 3) {
          const currAuthorityCategory: string = parts[1];
          if (currAuthorityCategory === category) {
            typesPerCategory.push(new DropdownOption(parts[2], parts[2]));
          }
        }
      }
      this.categoryToTypesMap.set(category, typesPerCategory);
    }
    console.log(this.categoryToTypesMap);
  }

  inputFormatter = (x: AuthorityValue): string => x.display || x.value;

  onChange($event: any): void {
    console.log('onChange() emitted: ', $event)
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  onFocus(event) {
    this.focus.emit(event);
  }

  onSelect(event) {
    this.group.markAsDirty();
    this.model.valueUpdates.next(event);
    this.change.emit(event);
    this.setCurrentValue(event);
  }

  setCurrentValue(value): void {
    let result: string;
    if (isUndefined(value) || isNull(value)) {
      result = '';
    } else if (typeof value === 'string') {
      result = value;
    } else {
      for (const item of this.optionsList) {
        if (value.value === (item as any).value) {
          result = this.inputFormatter(item);
          break;
        }
      }
    }
    this.currentValue = observableOf(result);
  }

  onEvent($event: DynamicFormControlEvent, type: string) {
    console.log('some event in PUBLICATIONTYPE: ', $event)
  }

}
