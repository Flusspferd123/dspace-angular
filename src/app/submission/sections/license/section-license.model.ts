import { DynamicRadioGroupModel } from '@ng-dynamic-forms/core';

export const SECTION_LICENSE_FORM_LAYOUT = {

  granted: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  },
  openAccess: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  }
};

export const SECTION_LICENSE_FORM_MODEL = [
  {
    id: 'granted',
    label: 'I confirm the license above',
    required: true,
    value: false,
    validators: {
      required: null
    },
    errorMessages: {
      required: 'You must accept the license',
      notgranted: 'You must accept the license'
    },
    type: 'CHECKBOX',
  },
  {
    id: 'openAccess',
    label: 'I confirm that this publication is published under an Open Access licence in the TU\'s reposiTUm',
    required: false,
    value: false,
    validators: {
      required: null
    },
    errorMessages: {
      required: 'You must accept the license',
      notgranted: 'You must accept the license'
    },
    type: 'CHECKBOX',
  },
  new DynamicRadioGroupModel<string>({

    id: 'OpenAccessPayment',
    label: 'Costs for Open Access is assumed by',
    options: [
      {
        label: 'TU Biblothek',
        value: 'TU_Bibliothek',
      },
      {
        label: 'Insitut / FWF',
        value: 'Institut/FWF'
      },

    ],
    // value: "option-3"
  }),
];
