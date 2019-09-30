import {
  AUTOCOMPLETE_OFF,
  DynamicFormControlLayout,
  DynamicInputModelConfig,
  serializable
} from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';
import { AuthorityOptions } from '../../../../../../core/integration/models/authority-options.model';

export const DYNAMIC_FORM_CONTROL_TYPE_PUBLICATIONTYPE = 'PUBLICATIONTYPE_TYPE';

export const PUBLICATIONTYPE_CONTAINER_LAYOUT = {

  granted: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  }
};

export interface PublicationtypeModelConfig extends DynamicInputModelConfig {
  authorityOptions: AuthorityOptions;
  maxOptions?: number;
  value?: any;
}

export class PublicationtypeModel extends DsDynamicInputModel {

  @serializable() maxOptions: number;
  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_PUBLICATIONTYPE;

  constructor(config: PublicationtypeModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    this.autoComplete = AUTOCOMPLETE_OFF;
    this.authorityOptions = config.authorityOptions;
    this.maxOptions = config.maxOptions || 100;
  }

}
