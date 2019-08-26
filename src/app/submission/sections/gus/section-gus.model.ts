
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
    "type": "INPUT",
    "id": "sampleInput",
    "label": "Sample Input",
    "maxLength": 42,
    "placeholder": "Sample input"
  },
  {
    "type": "RADIO_GROUP",
    "id": "sampleRadioGroup",
    "label": "Sample Radio Group",
    "options": [
      {
        "label": "Option 1",
        "value": "option-1",
      },
      {
        "label": "Option 2",
        "value": "option-2"
      },
      {
        "label": "Option 3",
        "value": "option-3"
      }
    ],
    "value": "option-3"
  },
  {
    "type": "CHECKBOX",
    "id": "sampleCheckbox",
    "label": "I do agree"
  }
]






/* [
  {
    "asyncValidators": null,
    "errorMessages": null,
    "hidden": false,
    "id": "7_array",
    "label": "Authors",
    "labelTooltip": null,
    "controlTooltip": null,
    "layout": {
      "grid": {
        "group": "form-row"
      }
    },
    "name": "7_array",
    "relation": [],
    "updateOn": null,
    "validators": null,
    "disabled": false,
    "groups": [
      {
        "group": [
          {
            "asyncValidators": null,
            "errorMessages": null,
            "hidden": false,
            "id": "dc_contributor_author_CONCAT_GROUP",
            "label": null,
            "labelTooltip": null,
            "controlTooltip": null,
            "layout": {
              "element": {
                "control": "form-row",
                "host": "col"
              }
            },
            "name": "dc.contributor.author",
            "relation": [],
            "updateOn": null,
            "validators": null,
            "disabled": false,
            "group": [
              {
                "asyncValidators": null,
                "errorMessages": null,
                "hidden": false,
                "id": "DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA",
                "label": null,
                "labelTooltip": null,
                "controlTooltip": null,
                "layout": {
                  "grid": {
                    "host": "col-sm-6"
                  }
                },
                "name": "DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA",
                "relation": [],
                "updateOn": null,
                "validators": null,
                "disabled": false,
                "additional": null,
                "hint": null,
                "required": false,
                "tabIndex": null,
                "value": null,
                "autoComplete": "on",
                "autoFocus": false,
                "maxLength": null,
                "minLength": null,
                "placeholder": "form.last-name",
                "prefix": null,
                "readOnly": false,
                "spellCheck": false,
                "suffix": null,
                "list": null,
                "type": "INPUT",
                "accept": null,
                "inputType": "text",
                "mask": null,
                "max": null,
                "min": null,
                "multiple": null,
                "pattern": null,
                "step": null
              },
              {
                "asyncValidators": null,
                "errorMessages": null,
                "hidden": false,
                "id": "DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA",
                "label": null,
                "labelTooltip": null,
                "controlTooltip": null,
                "layout": {
                  "grid": {
                    "host": "col-sm-6"
                  }
                },
                "name": "DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA",
                "relation": [],
                "updateOn": null,
                "validators": null,
                "disabled": false,
                "additional": null,
                "hint": null,
                "required": false,
                "tabIndex": null,
                "value": null,
                "autoComplete": "on",
                "autoFocus": false,
                "maxLength": null,
                "minLength": null,
                "placeholder": "form.first-name",
                "prefix": null,
                "readOnly": false,
                "spellCheck": false,
                "suffix": null,
                "list": null,
                "type": "INPUT",
                "accept": null,
                "inputType": "text",
                "mask": null,
                "max": null,
                "min": null,
                "multiple": null,
                "pattern": null,
                "step": null
              }
            ],
            "type": "GROUP",
            "legend": null,
            "hasLanguages": false,
            "separator": ", "
          }
        ],
        "index": 0
      }
    ],
    "type": "ARRAY",
    "groupAsyncValidators": null,
    "groupPrototype": [
      {
        "asyncValidators": null,
        "errorMessages": null,
        "hidden": false,
        "id": "dc_contributor_author_CONCAT_GROUP",
        "label": null,
        "labelTooltip": null,
        "controlTooltip": null,
        "layout": {
          "element": {
            "control": "form-row",
            "host": "col"
          }
        },
        "name": "dc.contributor.author",
        "relation": [],
        "updateOn": null,
        "validators": null,
        "disabled": false,
        "group": [
          {
            "asyncValidators": null,
            "errorMessages": null,
            "hidden": false,
            "id": "dc_contributor_author_CONCAT_FIRST_INPUT",
            "label": "Authors",
            "labelTooltip": null,
            "controlTooltip": null,
            "layout": {
              "grid": {
                "host": "col-sm-6"
              }
            },
            "name": "dc.contributor.author_CONCAT_FIRST_INPUT",
            "relation": [],
            "updateOn": null,
            "validators": null,
            "disabled": false,
            "additional": null,
            "hint": null,
            "required": false,
            "tabIndex": null,
            "value": null,
            "autoComplete": "on",
            "autoFocus": false,
            "maxLength": null,
            "minLength": null,
            "placeholder": "form.last-name",
            "prefix": null,
            "readOnly": false,
            "spellCheck": false,
            "suffix": null,
            "list": null,
            "type": "INPUT",
            "accept": null,
            "inputType": "text",
            "mask": null,
            "max": null,
            "min": null,
            "multiple": null,
            "pattern": null,
            "step": null
          },
          {
            "asyncValidators": null,
            "errorMessages": null,
            "hidden": false,
            "id": "dc_contributor_author_CONCAT_SECOND_INPUT",
            "label": "&nbsp;",
            "labelTooltip": null,
            "controlTooltip": null,
            "layout": {
              "grid": {
                "host": "col-sm-6"
              }
            },
            "name": "dc.contributor.author_CONCAT_SECOND_INPUT",
            "relation": [],
            "updateOn": null,
            "validators": null,
            "disabled": false,
            "additional": null,
            "hint": null,
            "required": false,
            "tabIndex": null,
            "value": null,
            "autoComplete": "on",
            "autoFocus": false,
            "maxLength": null,
            "minLength": null,
            "placeholder": "form.first-name",
            "prefix": null,
            "readOnly": false,
            "spellCheck": false,
            "suffix": null,
            "list": null,
            "type": "INPUT",
            "accept": null,
            "inputType": "text",
            "mask": null,
            "max": null,
            "min": null,
            "multiple": null,
            "pattern": null,
            "step": null
          }
        ],
        "type": "GROUP",
        "legend": null,
        "hasLanguages": false,
        "separator": ", "
      }
    ],
    "groupValidators": null,
    "initialCount": 1,
    notRepeatable: false
  }
];
*/
