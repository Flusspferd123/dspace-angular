import { FieldParser } from './field-parser';
import { DynamicFormControlLayout, } from '@ng-dynamic-forms/core';
import {
  DynamicScrollableDropdownModel,
  DynamicScrollableDropdownModelConfig
} from '../ds-dynamic-form-ui/models/scrollable-dropdown/dynamic-scrollable-dropdown.model';
import { isNotEmpty } from '../../../empty.util';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { GusModel } from '../ds-dynamic-form-ui/models/gus/gus.model';
import { Gus2Model } from '../ds-dynamic-form-ui/models/gus/Gus2/gus2.model';

export class Gus2FieldParser extends FieldParser {

  public modelFactory(fieldValue?: FormFieldMetadataValueObject | any, label?: boolean): any {
    const dropdownModelConfig: DynamicScrollableDropdownModelConfig = this.initModel(null, label);
    let layout: DynamicFormControlLayout;

    // if (isNotEmpty(this.configData.selectableMetadata[0].authority)) {
    if (isNotEmpty(this.configData)) {
      this.setAuthorityOptions(dropdownModelConfig, this.parserOptions.authorityUuid);
      if (isNotEmpty(fieldValue)) {
        dropdownModelConfig.value = fieldValue;
      }
      layout = {
        element: {
          control: 'col'
        },
        grid: {
          host: 'col'
        }
      };
      const gusModel = new Gus2Model(dropdownModelConfig, layout);
      return gusModel;
    } else {
      throw  Error(`Gus-field-parser error. Please check form configuration file.`);
    }
  }
}
