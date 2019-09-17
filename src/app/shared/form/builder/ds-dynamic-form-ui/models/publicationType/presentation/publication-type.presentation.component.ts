import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of, of as observableOf } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import {
  DynamicFormControlComponent, DynamicFormControlEvent, DynamicFormControlModel,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { FormBuilderService } from '../../../../form-builder.service';
import { TYPE_SELECTOR_FORM_MODEL } from './model/pubTypeModel';

@Component({
  selector: 'ds-dynamic-publicationtype-presentation',
  styleUrls: ['./publication-type.presentation.component.scss'],
  templateUrl: './publication-type.presentation.component.html'
})
export class PublicationTypePresentationComponent implements OnInit {
  private model:  DynamicFormControlModel[] = TYPE_SELECTOR_FORM_MODEL;
  private formGroup: FormGroup;

  constructor(private formService: FormBuilderService) {}

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.model);
  }

}
