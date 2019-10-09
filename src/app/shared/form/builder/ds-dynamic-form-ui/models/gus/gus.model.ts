import {
  AUTOCOMPLETE_OFF,
  DynamicFormControlLayout,
  DynamicInputModelConfig,
  serializable
} from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';
import { AuthorityOptions } from '../../../../../../core/integration/models/authority-options.model';

export const DYNAMIC_FORM_CONTROL_TYPE_GUS = 'GUS_TYPE';

export const GUS_CONTAINER_LAYOUT = {

  granted: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  }
};

export interface GusModelConfig extends DynamicInputModelConfig {
  authorityOptions: AuthorityOptions;
  maxOptions?: number;
  value?: any;
}

export class GusModel extends DsDynamicInputModel {

  @serializable() maxOptions: number;
  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_GUS;

  constructor(config: GusModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    this.autoComplete = AUTOCOMPLETE_OFF;
    this.authorityOptions = config.authorityOptions;
    this.maxOptions = config.maxOptions || 100;
  }

}
