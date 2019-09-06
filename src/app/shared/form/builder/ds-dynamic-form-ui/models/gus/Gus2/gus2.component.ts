import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Observable, of, of as observableOf} from 'rxjs';
import {catchError, first, tap} from 'rxjs/operators';
import {
  DynamicFormControlComponent, DynamicFormControlEvent, DynamicFormControlModel,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { GUS2_FORM_LAYOUT, Gus2Model } from './gus2.model';

@Component({
  selector: 'ds-dynamic-gus2',
  styleUrls: ['./gus2.component.scss'],
  templateUrl: './gus2.component.html'
})
export class Gus2Component extends DynamicFormControlComponent implements OnInit {
  @Input() bindId = true;
  @Input() formGroup: FormGroup;
  @Input() model: Gus2Model;
  @Input() formId: string;
  @Input() formModel: DynamicFormControlModel[];

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public currentValue: Observable<string>;
  public loading = false;

  public optionsList: any;

  public formLayout = GUS2_FORM_LAYOUT;

  constructor(
              private cdr: ChangeDetectorRef,
              protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService
  ) {
    super(layoutService, validationService);
  }

  ngOnInit() {

  }

  // inputFormatter = (x: AuthorityValue): string => x.display || x.value;

  onChange($event: any): void {
    console.log('onChange() emitted: ', $event)
  }

  onBlur(event: Event) {
    this.blur.emit(event);
  }

  onFocus(event) {
    this.focus.emit(event);
  }

/*  onSelect(event) {
    this.group.markAsDirty();
    this.model.valueUpdates.next(event);
    this.change.emit(event);
    this.setCurrentValue(event);
  }*/

/*  setCurrentValue(value): void {
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
  }*/

  onEvent($event: DynamicFormControlEvent, type: string) {
    console.log('some event in GUS: ', $event)
  }
}
