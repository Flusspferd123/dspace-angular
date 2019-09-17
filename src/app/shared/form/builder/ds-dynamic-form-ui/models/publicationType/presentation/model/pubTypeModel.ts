import {
  DynamicFormControlModel,
   DynamicSelectModel
} from '@ng-dynamic-forms/core';

export const TYPE_SELECTOR_FORM_MODEL:  DynamicFormControlModel[] = [
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
