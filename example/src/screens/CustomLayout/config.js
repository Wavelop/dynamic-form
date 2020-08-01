import { CustomInput, CustomRow } from "Components";

export const form = ({ t, dynamics }) => {

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
          tag: CustomInput,
          validations: [
            {
              kind: "required",
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
                  kind: "required",
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
                  kind: "required",
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
              kind: "required",
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
              kind: "required",
              message: t("Error.message.required")
            }
          ]
        },
      ]
    }
  ];
}
