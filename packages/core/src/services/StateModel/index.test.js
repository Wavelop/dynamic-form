import { groupByRows, groupByRowsGroupIn } from "./";


describe("Services", () => {
  describe("StateModel", () => {
    describe("groupByRows", () => {

      it("given a config with fields grouped, it should return an object grouped by the same rows - state is completed", () => {
        const config = [
          {
            name: "row1",
            tag: "row",
            fields: [
              {
                name: "progetto",
                label: "Progetto",
                helperText: "Seleziona il progetto",
                tag: "notRow",
                validations: [
                  {
                    kind: "required",
                    message: "Errore"
                  }
                ]
              },
              {
                name: "cell2",
                tag: "row",
                fields: [
                  {
                    name: "attivita",
                    label: "Attività",
                    helperText: "Seleziona il tipo di attività",
                    tag: "notRow",
                    validations: [
                      {
                        kind: "required",
                        message: "Errore"
                      }
                    ]
                  },
                  {
                    name: "postazione",
                    label: "Postazione",
                    helperText: "Seleziona la postazione",
                    tag: "notRow",
                    validations: [
                      {
                        kind: "required",
                        message: "Errore"
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
            fields: [
              {
                name: "descrizione",
                label: "Descrizione",
                helperText: "Inserisci una descrizione",
                tag: "notRow",
                validations: [
                  {
                    kind: "required",
                    message: "Errore"
                  }
                ]
              },
              {
                name: "link",
                label: "Link di riferimento",
                helperText: "Inserisci un link di riferimenti",
                tag: "notRow",
                validations: [
                  {
                    kind: "required",
                    message: "Errore"
                  },
                  {
                    kind: "pattern",
                    reg: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                    negate: true,
                    message: "Errore pattern"
                  }
                ]
              },
              {
                name: "dateInline",
                label: "Date picker Default",
                helperText: "Inserisci una data valida",
                tag: "notRow",
                dataManipulatorIn: (date) => {
                  return date ? new Date(date) : new Date();
                },
                validations: [
                  {
                    kind: "required",
                    message: "Errore"
                  }
                ]
              },
            ]
          }
        ];

        const state = {
          "attivita": "attivita",
          "postazione": "postazione",
          "progetto": "progetto",
          "descrizione": "descrizione",
          "link": "http://wavelop.com",
          "dateInline": "2021-01-05T16:11:16.711Z"
        };

        expect(groupByRows(config)(state)).toEqual({
          "row1": {
            "progetto": "progetto",
            "cell2": {
              "attivita": "attivita",
              "postazione": "postazione"
            }
          },
          "row2": {
            "descrizione": "descrizione",
            "link": "http://wavelop.com",
            "dateInline": "2021-01-05T16:11:16.711Z"
          }
        });
      });

      it("given a config with fields not grouped, it should return an object grouped by the same rows - state is completed", () => {
        const config = [
          {
            name: "email",
            label: "email",
            helperText: "email",
            tag: "notRow",
            type: "email",
            validations: [
              {
                kind: "required",
                message: "required"
              },
              {
                kind: "pattern",
                reg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                negate: true,
                message: "pattern"
              }
            ]
          },
          {
            name: "password",
            label: "password",
            helperText: "password",
            tag: "noRow",
            type: "password",
            crypt: true,
            validations: [
              {
                kind: "required",
                message: "required"
              },
              {
                kind: "minlength",
                value: 8,
                message: "error"
              },
              {
                kind: "maxlength",
                value: 22,
                message: "error"
              },
              {
                kind: "pattern",
                reg: /[^A-Za-z0-9\-_ ]/,
                message: "pattern"
              },
              {
                kind: "equalTo",
                to: "confirmPassword",
                message: "error"
              }
            ]
          },
          {
            name: "confirmPassword",
            label: "confirmPassword",
            helperText: "confirmPassword",
            tag: "noRow",
            type: "password",
            crypt: true,
            validations: [
              {
                kind: "required",
                message: "required"
              },
              {
                kind: "minlength",
                value: 8,
                message: "errore"
              },
              {
                kind: "pattern",
                reg: /[^A-Za-z0-9\-_ ]/,
                message: "pattern"
              },
              {
                kind: "equalTo",
                to: "password",
                message: "confirmPassword"
              }
            ]
          },
          {
            name: "dateInline",
            label: "Date picker Default",
            helperText: "Inserisci una data valida",
            tag: "noRow",
            dataManipulatorIn: (date) => {
              return date ? new Date(date) : new Date();
            },
            validations: [
              {
                kind: "required",
                message: "required"
              }
            ]
          },
          {
            name: "dateDialog",
            label: "Date picker Dialog",
            helperText: "Inserisci una data valida",
            tag: "noRow",
            type: "dialog",
            dataManipulatorIn: (date) => {
              return date ? new Date(date) : new Date();
            },
            validations: [
              {
                kind: "required",
                message: "required"
              }
            ]
          },
          {
            name: "dateStatic",
            label: "Date picker Static",
            helperText: "Inserisci una data valida",
            tag: "noRow",
            type: "static",
            dataManipulatorIn: (date) => {
              return date ? new Date(date) : new Date();
            },
            validations: [
              {
                kind: "required",
                message: "required"
              }
            ]
          },
          {
            name: "firstName",
            label: "firstName",
            helperText: "firstName",
            tag: "noRow",
            validations: [
              {
                kind: "required",
                message: "required"
              },
              {
                kind: "pattern",
                reg: /[^A-Za-z0-9\-_ ]/,
                message: "pattern"
              }
            ]
          },
          {
            name: "lastName",
            label: "lastName",
            helperText: "lastName",
            tag: "noRow",
            validations: [
              {
                kind: "required",
                message: "required"
              },
              {
                kind: "pattern",
                reg: /[^A-Za-z0-9\-_ ]/,
                message: "pattern"
              }
            ]
          },
          {
            name: "phone",
            label: "phone",
            helperText: "phone",
            tag: "noRow",
            defaultValue: "",
            validations: [
              {
                kind: "pattern",
                reg: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                negate: true,
                message: "phone"
              }
            ]
          }
        ];

        const state = {
          "email": "test@company.it",
          "password": "ciaociao",
          "confirmPassword": "ciaociao",
          "dateInline": "2021-01-05T17:19:14.440Z",
          "dateDialog": "2021-01-05T17:19:14.440Z",
          "dateStatic": "2021-01-05T17:19:14.440Z",
          "firstName": "mateo",
          "lastName": "mateo",
          "phone": "1234567890"
        };

        expect(groupByRows(config)(state)).toEqual({
          "email": "test@company.it",
          "password": "ciaociao",
          "confirmPassword": "ciaociao",
          "dateInline": "2021-01-05T17:19:14.440Z",
          "dateDialog": "2021-01-05T17:19:14.440Z",
          "dateStatic": "2021-01-05T17:19:14.440Z",
          "firstName": "mateo",
          "lastName": "mateo",
          "phone": "1234567890"
        });
      });

      it("given a config with fields grouped, it should return an object grouped by the same rows - state is completed", () => {
        const config = [
          {
            name: "row1",
            tag: "row",
            fields: [
              {
                name: "field1_row1",
                label: "field1_row1",
                helperText: "field1_row1",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row1",
                label: "field2_row1",
                helperText: "field2_row1",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row2",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row2",
                label: "field1_row2",
                helperText: "field1_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row2",
                label: "field2_row2",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row3",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row3",
                label: "field1_row3",
                helperText: "field1_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row3",
                label: "field2_row3",
                helperText: "field2_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row4",
            tag: "row",
            fields: [
              {
                name: "field1_row4",
                label: "field1_row4",
                helperText: "field1_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row4",
                label: "field2_row4",
                helperText: "field2_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field2",
                }
              },
              {
                name: "field3_row4",
                label: "field3_row4",
                helperText: "field2_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field3",
                }
              },
            ]
          },
          {
            name: "row5",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray2"
            },
            fields: [
              {
                name: "field1_row5",
                label: "field1_row5",
                helperText: "field1_row5",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row5",
                label: "field2_row5",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row6",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray2"
            },
            fields: [
              {
                name: "field1_row6",
                label: "field1_row6",
                helperText: "field1_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row6",
                label: "field2_row6",
                helperText: "field2_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          }
        ];

        const state = {
          "field1_row1": "1a",
          "field2_row1": "1b",
          "field1_row2": "2a",
          "field2_row2": "2b",
          "field1_row3": "3a",
          "field2_row3": "3b",
          "field1_row4": "4a",
          "field2_row4": "4b",
          "field3_row4": "4c",
          "field1_row5": "5a",
          "field2_row5": "5b",
          "field1_row6": "6a",
          "field2_row6": "6b"
        };

        expect(groupByRows(config)(state)).toEqual({
          "row1": {
            "field1_row1": "1a",
            "field2_row1": "1b"
          },
          "row2": {
            "field1_row2": "2a",
            "field2_row2": "2b"
          },
          "row3": {
            "field1_row3": "3a",
            "field2_row3": "3b"
          },
          "row4": {
            "field1_row4": "4a",
            "field2_row4": "4b",
            "field3_row4": "4c"
          },
          "row5": {
            "field1_row5": "5a",
            "field2_row5": "5b"
          },
          "row6": {
            "field1_row6": "6a",
            "field2_row6": "6b"
          },
        });
      });
    });


    describe("groupByRowsGroupIn", () => {

      it("given a config with fields grouped using the rowOptions groupIn, it should return an object grouped by groupIn  - state is completed", () => {
        const config = [
          {
            name: "row1",
            tag: "row",
            fields: [
              {
                name: "field1_row1",
                label: "field1_row1",
                helperText: "field1_row1",
                tag: "notRow"
              },
              {
                name: "field2_row1",
                label: "field2_row1",
                helperText: "field2_row1",
                tag: "notRow",
              },
            ]
          },
          {
            name: "row2",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row2",
                label: "field1_row2",
                helperText: "field1_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row2",
                label: "field2_row2",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row3",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row3",
                label: "field1_row3",
                helperText: "field1_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row3",
                label: "field2_row3",
                helperText: "field2_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          }

        ];

        const state = {
          "field1_row1": "1a",
          "field2_row1": "1b",
          "field1_row2": "2a",
          "field2_row2": "2b",
          "field1_row3": "3a",
          "field2_row3": "3b"
        };

        expect(groupByRowsGroupIn(config)(state)).toEqual({
          "row1": {
            "field1_row1": "1a",
            "field2_row1": "1b"
          },
          "rowsToGroupAsArray": [
            {
              "field1": "2a",
              "field2": "2b"
            },
            {
              "field1": "3a",
              "field2": "3b"
            }
          ]
        });
      });

      it("given a config with fields grouped using more rowOptions groupIn with (same value), it should return an object grouped by groupIn  - state is completed", () => {
        const config = [
          {
            name: "row1",
            tag: "row",
            fields: [
              {
                name: "field1_row1",
                label: "field1_row1",
                helperText: "field1_row1",
                tag: "notRow"
              },
              {
                name: "field2_row1",
                label: "field2_row1",
                helperText: "field2_row1",
                tag: "notRow",
              },
            ]
          },
          {
            name: "row2",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row2",
                label: "field1_row2",
                helperText: "field1_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row2",
                label: "field2_row2",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row3",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row3",
                label: "field1_row3",
                helperText: "field1_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row3",
                label: "field2_row3",
                helperText: "field2_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row4",
            tag: "row",
            fields: [
              {
                name: "field1_row4",
                label: "field1_row4",
                helperText: "field1_row4",
                tag: "notRow"
              },
              {
                name: "field2_row4",
                label: "field2_row4",
                helperText: "field2_row4",
                tag: "notRow",
              },
              {
                name: "field3_row4",
                label: "field3_row4",
                helperText: "field2_row4",
                tag: "notRow",
              },
            ]
          },
          {
            name: "row5",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row5",
                label: "field1_row5",
                helperText: "field1_row5",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row5",
                label: "field2_row5",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row6",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row6",
                label: "field1_row6",
                helperText: "field1_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row6",
                label: "field2_row6",
                helperText: "field2_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          }
        ];

        const state = {
          "field1_row1": "1a",
          "field2_row1": "1b",
          "field1_row2": "2a",
          "field2_row2": "2b",
          "field1_row3": "3a",
          "field2_row3": "3b",
          "field1_row4": "4a",
          "field2_row4": "4b",
          "field3_row4": "4c",
          "field1_row5": "5a",
          "field2_row5": "5b",
          "field1_row6": "6a",
          "field2_row6": "6b"
        };

        expect(groupByRowsGroupIn(config)(state)).toEqual({
          "row1": {
            "field1_row1": "1a",
            "field2_row1": "1b"
          },
          "row4": {
            "field1_row4": "4a",
            "field2_row4": "4b",
            "field3_row4": "4c"
          },
          "rowsToGroupAsArray": [
            {
              "field1": "2a",
              "field2": "2b"
            },
            {
              "field1": "3a",
              "field2": "3b"
            },
            {
              "field1": "5a",
              "field2": "5b"
            },
            {
              "field1": "6a",
              "field2": "6b"
            }
          ]
        });
      });

      it("given a config with fields grouped using more rowOptions groupIn with (different value), it should return an object grouped by groupIn  - state is completed", () => {
        const config = [
          {
            name: "row1",
            tag: "row",
            fields: [
              {
                name: "field1_row1",
                label: "field1_row1",
                helperText: "field1_row1",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row1",
                label: "field2_row1",
                helperText: "field2_row1",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row2",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row2",
                label: "field1_row2",
                helperText: "field1_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row2",
                label: "field2_row2",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row3",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray"
            },
            fields: [
              {
                name: "field1_row3",
                label: "field1_row3",
                helperText: "field1_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row3",
                label: "field2_row3",
                helperText: "field2_row3",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row4",
            tag: "row",
            fields: [
              {
                name: "field1_row4",
                label: "field1_row4",
                helperText: "field1_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row4",
                label: "field2_row4",
                helperText: "field2_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field2",
                }
              },
              {
                name: "field3_row4",
                label: "field3_row4",
                helperText: "field2_row4",
                tag: "notRow",
                rowOptions: { // As test, I wrongly leave this option to the object -> it will not be considered 
                  alternativeName: "field3",
                }
              },
            ]
          },
          {
            name: "row5",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray2"
            },
            fields: [
              {
                name: "field1_row5",
                label: "field1_row5",
                helperText: "field1_row5",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row5",
                label: "field2_row5",
                helperText: "field2_row2",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          },
          {
            name: "row6",
            tag: "row",
            rowOptions: {
              groupIn: "rowsToGroupAsArray2"
            },
            fields: [
              {
                name: "field1_row6",
                label: "field1_row6",
                helperText: "field1_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field1",
                }
              },
              {
                name: "field2_row6",
                label: "field2_row6",
                helperText: "field2_row6",
                tag: "notRow",
                rowOptions: {
                  alternativeName: "field2",
                }
              },
            ]
          }
        ];

        const state = {
          "field1_row1": "1a",
          "field2_row1": "1b",
          "field1_row2": "2a",
          "field2_row2": "2b",
          "field1_row3": "3a",
          "field2_row3": "3b",
          "field1_row4": "4a",
          "field2_row4": "4b",
          "field3_row4": "4c",
          "field1_row5": "5a",
          "field2_row5": "5b",
          "field1_row6": "6a",
          "field2_row6": "6b"
        };

        expect(groupByRowsGroupIn(config)(state)).toEqual({
          "row1": {
            "field1_row1": "1a",
            "field2_row1": "1b"
          },
          "row4": {
            "field1_row4": "4a",
            "field2_row4": "4b",
            "field3_row4": "4c"
          },
          "rowsToGroupAsArray": [
            {
              "field1": "2a",
              "field2": "2b"
            },
            {
              "field1": "3a",
              "field2": "3b"
            }
          ],
          "rowsToGroupAsArray2": [
            {
              "field1": "5a",
              "field2": "5b"
            },
            {
              "field1": "6a",
              "field2": "6b"
            }
          ]
        });
      });

    });
  });
});