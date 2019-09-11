import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of, of as observableOf } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import {
  DynamicFormControlComponent, DynamicFormControlEvent, DynamicFormControlModel,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';

import { AuthorityValue } from '../../../../../../core/integration/models/authority.value';
import { PageInfo } from '../../../../../../core/shared/page-info.model';
import { isNull, isUndefined } from '../../../../../empty.util';
import { AuthorityService } from '../../../../../../core/integration/authority.service';
import { IntegrationSearchOptions } from '../../../../../../core/integration/models/integration-options.model';
import { IntegrationData } from '../../../../../../core/integration/integration-data';
import { GUS_CONTAINER_LAYOUT, GusModel } from './gus.model';
import { PanelData } from './gus.panelData.models';

@Component({
  selector: 'ds-dynamic-gus-container',
  styleUrls: ['./gus.container.component.scss'],
  templateUrl: './gus.container.component.html'
})
export class GusContainerComponent extends DynamicFormControlComponent implements OnInit {
  @Input() bindId = true;
  @Input() formGroup: FormGroup;
  @Input() model: GusModel;
  @Input() formId: string;
  @Input() formModel: DynamicFormControlModel[];

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public currentValue: Observable<string>;
  public loading = false;
  public pageInfo: PageInfo;
  public optionsList: any;
  public panelData: PanelData[];

  public formLayout = GUS_CONTAINER_LAYOUT;

  protected searchOptions: IntegrationSearchOptions;

  constructor(private authorityService: AuthorityService,
              private cdr: ChangeDetectorRef,
              protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService
  ) {
    super(layoutService, validationService);
  }

  ngOnInit() {
    this.panelData = new Array<PanelData>();
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

        this.setPanelData();


        if (this.model.value) {
          this.setCurrentValue(this.model.value);
        }
        this.pageInfo = object.pageInfo;
        this.cdr.detectChanges();
      })



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
    console.log('some event in GUS: ', $event)
  }

  setPanelData() {
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
      }

    }
  }

}
