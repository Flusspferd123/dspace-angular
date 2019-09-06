
export const SECTION_GUS_FORM_LAYOUT = {

  granted: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1'
    }
  }
};

export const SECTION_GUS_FORM_MODEL = [
  {
    type: 'INPUT',
    id: 'sampleInput',
    label: 'Sample Input',
    maxLength: 42,
    placeholder: 'Sample input'
  },
  {
    type: 'RADIO_GROUP',
    id: 'sampleRadioGroup',
    label: 'Sample Radio Group',
    options: [
      {
        label: 'Option 1',
        value: 'option-1',
      },
      {
        label: 'Option 2',
        value: 'option-2'
      },
      {
        label: 'Option 3',
        value: 'option-3'
      }
    ],
    value: 'option-3'
  },
  {
    type: 'CHECKBOX',
    id: 'sampleCheckbox',
    label: 'I do agree'
  }
]
