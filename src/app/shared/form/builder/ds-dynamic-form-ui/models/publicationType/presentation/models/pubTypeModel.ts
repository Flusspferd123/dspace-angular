import {
  DynamicFormControlModel,
  DynamicSelectModel
} from '@ng-dynamic-forms/core';

export class TypSelectorConstants {
  public static readonly CATEGORY_FORM_CONTROL_ID = 'category';
  public static readonly TYPE_FORM_CONTROL_ID = 'type';
}

export const TYPE_SELECTOR_FORM_LAYOUT =  {

  CATEGORY_FORM_CONTROL_ID: {

    element: {
      label: 'control-label'
    },
    grid: {
      control: 'col-sm-9',
      label: 'col-sm-3'
    }
  },

  TYPE_FORM_CONTROL_ID: {

    element: {
      label: 'control-label'
    },
    grid: {
      control: 'col-sm-9',
      label: 'col-sm-3'
    }
  }
};

export const TYPE_SELECTOR_FORM_MODEL: DynamicFormControlModel[] = [
  new DynamicSelectModel({

    id: 'category',
    label: 'Pick the publication\'s category'
    /*options: [
      {
        label: "Single Room",
        value: "single-room"
      },
      {
        label: "Double Room",
        value: "double-room"
      },
      {
        label: "Business Suite",
        value: "business-suite"
      },
      {
        label: "Presidential Suite",
        value: "presidential-suite"
      },
      {
        label: "Storeroom",
        value: "storeroom"
      }
    ],
    value: "single-room"*/
  })
]
