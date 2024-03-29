import { Input } from "@wavelop/dynamic-form-base-components";

export const form = ({ t }) => {

  return [
    {
      name: "email",
      label: t("Signup.form.email"),
      helperText: t("Signup.form.email.helperText"),
      tag: Input,
      type: "email",
      validations: [
        {
          kind: "required",
          message: t("Error.message.required")
        },
        {
          kind: "pattern",
          reg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          negate: true,
          message: t("Error.message.pattern.email")
        }
      ]
    },
    {
      name: "password",
      label: t("Signup.form.password"),
      helperText: t("Signup.form.password.helperText"),
      tag: Input,
      type: "password",
      crypt: true,
      validations: [
        {
          kind: "required",
          message: t("Error.message.required")
        },
        {
          kind: "minlength",
          value: 8,
          message: `${t("Error.message.minlength")}: 8`
        },
        {
          kind: "maxlength",
          value: 22,
          message: `${t("Error.message.maxlength")}: 22`
        },
        {
          kind: "pattern",
          reg: /[^A-Za-z0-9\-_ ]/,
          message: t("Error.message.pattern")
        }
      ]
    },
    {
      name: "confirmPassword",
      label: t("Signup.form.confirmPassword"),
      helperText: t("Signup.form.confirmPassword.helperText"),
      tag: Input,
      type: "password",
      crypt: true,
      validations: [
        {
          kind: "required",
          message: t("Error.message.required")
        },
        {
          kind: "minlength",
          value: 8,
          message: `${t("Error.message.minlength")}: 8`
        },
        {
          kind: "pattern",
          reg: /[^A-Za-z0-9\-_ ]/,
          message: t("Error.message.pattern")
        },
        {
          kind: "equalfield",
          name: "password",
          message: t("Error.message.passwordMustBeTheSame")
        }
      ]
    },
    // {
    //   name: "firstName",
    //   label: t("Signup.form.firstName"),
    //   helperText: t("Signup.form.firstName.helperText"),
    //   tag: Input,
    //   validations: [
    //     {
    //       kind: "required",
    //       message: t("Error.message.required")
    //     },
    //     {
    //       kind: "pattern",
    //       reg: /[^A-Za-z0-9\-_ ]/,
    //       message: t("Error.message.pattern")
    //     }
    //   ]
    // },
    // {
    //   name: "lastName",
    //   label: t("Signup.form.lastName"),
    //   helperText: t("Signup.form.lastName.helperText"),
    //   tag: Input,
    //   validations: [
    //     {
    //       kind: "required",
    //       message: t("Error.message.required")
    //     },
    //     {
    //       kind: "pattern",
    //       reg: /[^A-Za-z0-9\-_ ]/,
    //       message: t("Error.message.pattern")
    //     }
    //   ]
    // },
    // {
    //   name: "address",
    //   label: t("Signup.form.address"),
    //   helperText: t("Signup.form.address.helperText"),
    //   tag: "mapboxautocomplete",
    //   mapboxApiKey: "pk.eyJ1IjoibGFnb2Rlc2lnbiIsImEiOiJjanIxc3hpaDcwcmVtM3hydTZveTZrcTBiIn0.VnmaRvgxt_R5tHG-n8ObVg",
    //   validations: [
    //     {
    //       kind: "required",
    //       message: t("Error.message.required")
    //     },
    //     {
    //       kind: "validobject",
    //       message: t("Error.message.validAdressObject")
    //     }
    //   ]
    // },
    // {
    //   name: "phone",
    //   label: t("Signup.form.phone"),
    //   helperText: t("Signup.form.phone.helperText"),
    //   tag: Input,
    //   defaultValue: "",
    //   validations: [
    //     {
    //       kind: "pattern",
    //       reg: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
    //       negate: true,
    //       message: t("Error.message.validPhone")
    //     }
    //   ]
    // },
    // {
    //   name: "occupation",
    //   label: t("Signup.form.occupation"),
    //   helperText: t("Signup.form.occupation.helperText"),
    //   tag: "select",
    //   disabled: ({ options }) => {
    //     return !options || (options && options.length === 1) ? true : false;
    //   },
    //   validations: [
    //     {
    //       kind: "required",
    //       message: t("Error.message.required")
    //     }
    //   ],
    //   options: [
    //     { value: "Imprenditore", name: t("Signup.form.occupation.Imprenditore") },
    //     { value: "Titolare", name: t("Signup.form.occupation.Titolare") },
    //     { value: "Associato", name: t("Signup.form.occupation.Associato") },
    //     { value: "CEO/Director", name: t("Signup.form.occupation.CEO/Director") },
    //     { value: "Manager", name: t("Signup.form.occupation.Manager") },
    //     { value: "Architect", name: t("Signup.form.occupation.Architect") },
    //     { value: "Architect Director", name: t("Signup.form.occupation.Architect Director") },
    //     { value: "Interior Designer", name: t("Signup.form.occupation.Interior Designer") },
    //     { value: "Senior Architect/Designer", name: t("Signup.form.occupation.Senior Architect/Designer") },
    //     { value: "Junior Architect/Designer", name: t("Signup.form.occupation.Junior Architect/Designer") },
    //     { value: "Progettista", name: t("Signup.form.occupation.Progettista") },
    //     { value: "Progettista Strutturale", name: t("Signup.form.occupation.Progettista Strutturale") },
    //     { value: "Direttore Punto Vendita", name: t("Signup.form.occupation.Direttore Punto Vendita") },
    //     { value: "Project Manager", name: t("Signup.form.occupation.Project Manager") },
    //     { value: "Venditore", name: t("Signup.form.occupation.Venditore") },
    //     { value: "Freelance", name: t("Signup.form.occupation.Freelance") },
    //     { value: "Agente", name: t("Signup.form.occupation.Agente") },
    //     { value: "Sales Manager", name: t("Signup.form.occupation.Sales Manager") },
    //     { value: "Sales Team", name: t("Signup.form.occupation.Sales Team") },
    //     { value: "Marketing Manager", name: t("Signup.form.occupation.Marketing Manager") },
    //     { value: "Marketing Team", name: t("Signup.form.occupation.Marketing Team") },
    //     { value: "Ufficio Acquisti - Responsabile", name: t("Signup.form.occupation.Ufficio Acquisti - Responsabile") },
    //     { value: "Ufficio Acquisti - Staff", name: t("Signup.form.occupation.Ufficio Acquisti - Staff") },
    //     { value: "Referente tecnico", name: t("Signup.form.occupation.Referente tecnico") },
    //     { value: "Referente Logistica", name: t("Signup.form.occupation.Referente Logistica") },
    //     { value: "Invio Ordini", name: t("Signup.form.occupation.Invio Ordini") },
    //     { value: "Impiegato", name: t("Signup.form.occupation.Impiegato") },
    //     { value: "Amministrativo", name: t("Signup.form.occupation.Amministrativo") },
    //     { value: "Stagista", name: t("Signup.form.occupation.Stagista") },
    //     { value: "Studente", name: t("Signup.form.occupation.Studente") },
    //     { value: "Altro", name: t("Signup.form.occupation.Altro") },
    //     { value: "Privato", name: t("Signup.form.occupation.Privato") },
    //     { value: "Product Designer", name: t("Signup.form.occupation.Product Designer") },
    //     { value: "Assistant", name: t("Signup.form.occupation.Assistant") },
    //     { value: "Chief Editor", name: t("Signup.form.occupation.Chief Editor") },
    //     { value: "Editor", name: t("Signup.form.occupation.Editor") },
    //     { value: "Journalist", name: t("Signup.form.occupation.Journalist") }
    //   ]
    // },
    // {
    //   name: "interests",
    //   label: t("Signup.form.interests"),
    //   tag: "checkboxes",
    //   defaultValue: [],
    //   checkboxes: [
    //     {
    //       name: "bathroom",
    //       label: t("Signup.form.interests.bath"),
    //       tag: "checkbox"
    //     },
    //     {
    //       name: "living room",
    //       label: t("Signup.form.interests.livingRoom"),
    //       tag: "checkbox"
    //     },
    //     {
    //       name: "bedroom",
    //       label: t("Signup.form.interests.bedroom"),
    //       tag: "checkbox"
    //     },
    //     {
    //       name: "kids",
    //       label: t("Signup.form.interests.kids"),
    //       tag: "checkbox"
    //     },
    //     {
    //       name: "kitchen",
    //       label: t("Signup.form.interests.kitchen"),
    //       tag: "checkbox"
    //     },
    //   ]
    // },
    // {
    //   name: "privacyAgreements",
    //   label: t("Signup.form.privacyAgreements"),
    //   tag: "label"
    // },
    // {
    //   name: "newsletterAgreement",
    //   label: t("Signup.form.newsletterAgreement"),
    //   tag: "checkbox",
    //   defaultValue: false
    // },
    // {
    //   name: "marketingAgreement",
    //   label: t("Signup.form.marketingAgreement"),
    //   tag: "checkbox",
    //   defaultValue: false
    // },
    // {
    //   name: "profilationAgreement",
    //   label: t("Signup.form.profilationAgreement"),
    //   tag: "checkbox",
    //   defaultValue: false
    // },
    // {
    //   name: "locale",
    //   tag: "hidden",
    //   value: dynamics["locale"]
    // },
  ];
}
