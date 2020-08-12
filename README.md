<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![NPM][node-package-shield]][node-package-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Wavelop/dynamic-form">
    <img src="images/logo.svg" alt="Logo" width="300">
  </a>

  <h3 align="center">Dynamic Form</h3>

  <p align="center">
    Build forms 📄 with React 🚀
    <br />
    <a href="https://dynamic-form-wavelop.firebaseapp.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://dynamic-form-wavelop-example.firebaseapp.com/">View Demo</a>
    ·
    <a href="https://github.com/Wavelop/dynamic-form/issues">Open an Issue</a>
    ·
    <a href="https://github.com/Wavelop/dynamic-form/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## 📑 Table of Contents

- [📑 Table of Contents](#-table-of-contents)
- [🔍 About The Project](#-about-the-project)
  - [🔧 Built With](#-built-with)
- [🔫 Getting Started](#-getting-started)
  - [👶 Prerequisites](#-prerequisites)
  - [💻 Installation](#-installation)
- [🚲 Usage](#-usage)
- [📚Documentation](#documentation)
- [🏘 Using existing components](#-using-existing-components)
  - [🧱Build your custom components](#build-your-custom-components)
- [✈️ Roadmap](#️-roadmap)
- [🚑 Contributing](#-contributing)
- [💰 License](#-license)
- [📞 Contact](#-contact)


<!-- ABOUT THE PROJECT -->
## 🔍 About The Project

This project implements a form generator with React Hooks. 

### 🔧 Built With

* [React](https://reactjs.org/)
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)


<!-- GETTING STARTED -->
## 🔫 Getting Started

To start to use the library, follow these simple steps. 

### 👶 Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```bash
npm install react react-dom
```

### 💻 Installation
 
```bash
npm install @wavelop/dynamic-form @wavelop/dynamic-form-base-components
```


<!-- USAGE EXAMPLES -->
## 🚲 Usage

Create a configuration file: 

```js
// config.js

import { Input } from "@wavelop/dynamic-form-base-components";

export default     
{
  name: "email",
  label: "Email",
  helperText: "Write your email",
  tag: Input,
  type: "email",
  validations: [
    {
      kind: "required",
      message: "Email is required"
    },
    {
      kind: "pattern",
      reg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      considerRegAs: "positive",
      message: "You must type an email i.e. test@test.com"
    }
  ]
};
```

```jsx

import React, { useRef } from "react";
import PropTypes from "prop-types";

import {
  DynamicForm,
  useDynamicForm,
  withDynamicForm
} from "dynamic-form";

import { form as formConfig } from "./config.js";

function Example(props) {

  const dynamicForm = useDynamicForm();

  const onSubmit = event => {

    event.preventDefault();

    try {
      const { state, stateCrypted, stateFull } = dynamicForm.submit();
      // Do something with you valid state...
      console.log(state, stateCrypted, stateFull);

    } catch ({numberOfErrors, errors}) {
      // Do something in case of error...
      console.log(numberOfErrors, errors);
    }
  };

  // Render
  return (
    <form onSubmit={onSubmit}>
      <DynamicForm
        config={formConfig}
        updateErrorAtBlur={true}
        debug={true}
      />

      <button
        type="submit"
        onClick={onSubmit}
      >
        Confirm
      </button>
    </form>
  );
}

Example.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withDynamicForm()(Example);
```

_For more examples, please refer to the [Example folder](https://github.com/Wavelop/dynamic-form/tree/master/example)_.

## 📚Documentation

Check out our [documentation website](https://dynamic-form-wavelop.firebaseapp.com/).

## 🏘 Using existing components

Core functionalities can be used with exinsing components, as with the one of the package `@wavelop/dynamic-form-base-components` or you can create your custom components to inject inside the configuration. 

### 🧱Build your custom components

WIP.

<!-- ROADMAP -->
## ✈️ Roadmap

See the [open issues](https://github.com/Wavelop/dynamic-form/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## 🚑 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

<!-- LICENSE -->
## 💰 License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## 📞 Contact

Matteo Granzotto - [@wavelop](https://twitter.com/blundert) - [matteo.granzotto@wavelop.com](mailto:matteo.granzotto@wavelop.com)

[Wavelop](wavelop.com) - [info@wavelop.com](mailto:info@wavelop.com)

Project Link: [https://github.com/Wavelop/dynamic-form](https://github.com/Wavelop/dynamic-form)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[node-package-shield]: https://img.shields.io/npm/v/@wavelop/dynamic-form.svg
[node-package-url]: https://www.npmjs.com/package/@wavelop/dynamic-form
[contributors-shield]: https://img.shields.io/github/contributors/Wavelop/dynamic-form.svg?style=flat-square
[contributors-url]: https://github.com/Wavelop/dynamic-form/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Wavelop/dynamic-form.svg?style=flat-square
[forks-url]: https://github.com/Wavelop/dynamic-form/network/members
[stars-shield]: https://img.shields.io/github/stars/Wavelop/dynamic-form.svg?style=flat-square
[stars-url]: https://github.com/Wavelop/dynamic-form/stargazers
[issues-shield]: https://img.shields.io/github/issues/Wavelop/dynamic-form.svg?style=flat-square
[issues-url]: https://github.com/Wavelop/dynamic-form/issues
[license-shield]: https://img.shields.io/github/license/Wavelop/dynamic-form.svg?style=flat-square
[license-url]: https://github.com/Wavelop/dynamic-form/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/wavelop