import { CustomInput, CustomRow, DatePicker } from "Components";
import { validations } from "@wavelop/dynamic-form";
import { TextField } from "@wavelop/dynamic-form-material-ui-components";

const { required, pattern } = validations;

export const form = ({ t }) => {

  return [
    {
      name: "row1",
      tag: "row",
      customRow: CustomRow,
      fields: [
        {
          name: "progetto",
          label: "Progetto",
          helperText: "Seleziona il progetto",
          tag: TextField,
          validations: [
            {
              kind: required,
              message: t("Error.message.required")
            }
          ]
        },
        {
          name: "cell2",
          tag: "row",
          customRow: CustomRow,
          fields: [
            {
              name: "attivita",
              label: "Attività",
              helperText: "Seleziona il tipo di attività",
              tag: CustomInput,
              validations: [
                {
                  kind: required,
                  message: t("Error.message.required")
                }
              ]
            },
            {
              name: "postazione",
              label: "Postazione",
              helperText: "Seleziona la postazione",
              tag: CustomInput,
              validations: [
                {
                  kind: required,
                  message: t("Error.message.required")
                }
              ]
            },
          ]
        },
      ]
    },
    {
      name: "row2",
      tag: "row",
      customRow: CustomRow,
      fields: [
        {
          name: "descrizione",
          label: "Descrizione",
          helperText: "Inserisci una descrizione",
          tag: CustomInput,
          validations: [
            {
              kind: required,
              message: t("Error.message.required")
            }
          ]
        },
        {
          name: "link",
          label: "Link di riferimento",
          helperText: "Inserisci un link di riferimenti",
          tag: CustomInput,
          validations: [
            {
              kind: required,
              message: t("Error.message.required")
            },
            {
              kind: pattern,
              reg: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
              negate: true,
              message: t("Wavelop.error.message.link.pattern")
            }
          ]
        },
        {
          name: "dateInline",
          label: "Date picker Default",
          helperText: "Inserisci una data valida",
          tag: DatePicker,
          dataManipulatorIn: (date) => {
            return date ? new Date(date) : new Date();
          },
          validations: [
            {
              kind: required,
              message: t("Error.message.required")
            }
          ]
        },
      ]
    }
  ];
}
