import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  DynamicFormControlComponent,
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormGroupModel,
  DynamicFormLayout,
  DynamicFormLayoutService,
  DynamicFormValidationService,
  DynamicRadioGroupModel,
  DynamicSelectModel
} from '@ng-dynamic-forms/core';
import { FormBuilderService } from '../../../../form-builder.service';
import { TYPE_SELECTOR_FORM_LAYOUT, TypSelectorConstants } from './models/pubTypeModel';
import { DropdownOption } from './models/dropdownOption';

@Component({
  selector: 'ds-dynamic-publicationtype-presentation',
  styleUrls: ['./publication-type.presentation.component.scss'],
  templateUrl: './publication-type.presentation.component.html'
})
export class PublicationTypePresentationComponent implements OnInit {
  @Input() public categoryDropDownOptions: DropdownOption[]; //  = TYPE_SELECTOR_FORM_MODEL;
  @Input() public categoryToTypesMap: Map<string, DropdownOption[]>;
  public formGroup: FormGroup;
  public model: DynamicFormControlModel[];
  public formLayout: DynamicFormLayout;

  constructor(private formService: FormBuilderService) {
  }

  ngOnInit() {
    this.initModel();
    this.formLayout = TYPE_SELECTOR_FORM_LAYOUT;
    this.formGroup = this.formService.createFormGroup(this.model);
  }

  private initModel() {
    this.model = [];
    const categoryDropDownModel = Object.create(null);
    categoryDropDownModel.id = TypSelectorConstants.CATEGORY_FORM_CONTROL_ID;
    categoryDropDownModel.label = 'Pick the publication\'s category';
    categoryDropDownModel.options = this.categoryDropDownOptions;
    // categoryDropDownModel.value = this.categoryDropDownOptions[0].value;
    categoryDropDownModel.value = null;
    const categorySelectModel = new DynamicSelectModel(categoryDropDownModel);
    this.model.push(categorySelectModel);

    const typeDropDownModel = Object.create(null);
    typeDropDownModel.id = TypSelectorConstants.TYPE_FORM_CONTROL_ID;
    typeDropDownModel.label = 'Pick the publication\'s type';
    typeDropDownModel.options = this.getTypeDropDownOptionsByKey(categoryDropDownModel.value);
    typeDropDownModel.value = null;

    const typeSelectModel = new DynamicSelectModel<string>(typeDropDownModel);
    this.model.push(typeSelectModel);
  }

  private getTypeDropDownOptionsByKey(categoryKey: string): DropdownOption[] {
    return this.categoryToTypesMap.get(categoryKey);
  }

  changeTypeDropDownOptions(key: string) {
    const typeDropDownModel = Object.create(null);
    typeDropDownModel.id = TypSelectorConstants.TYPE_FORM_CONTROL_ID;
    typeDropDownModel.label = 'Pick the publication\'s type';
    typeDropDownModel.options = this.getTypeDropDownOptionsByKey(key);
    typeDropDownModel.value = null;
    const typeSelectModel = new DynamicSelectModel(typeDropDownModel);
    this.model.splice(1, 1, typeSelectModel);
  }

  onChange($event: DynamicFormControlEvent) {
    if ($event.model.id === TypSelectorConstants.CATEGORY_FORM_CONTROL_ID) {
      // console.log('event came from category', $event);
      this.changeTypeDropDownOptions($event.control.value);
    }
  }

}
