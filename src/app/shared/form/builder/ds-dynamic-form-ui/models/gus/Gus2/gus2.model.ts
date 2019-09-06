import {
  AUTOCOMPLETE_OFF,
  DynamicFormControlLayout,
  DynamicInputModelConfig,
  serializable
} from '@ng-dynamic-forms/core';
import { DsDynamicInputModel } from '../../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_GUS2 = 'GUS2_TYPE';

export const GUS2_FORM_LAYOUT = {

  granted: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  }
};

export interface Gus2ModelConfig extends DynamicInputModelConfig {

  maxOptions?: number;
  value?: any;
}

export class Gus2Model extends DsDynamicInputModel {

  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_GUS2;

  constructor(config: Gus2ModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    this.autoComplete = AUTOCOMPLETE_OFF;

  }

}
