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
    <img src="images/logo.png" alt="Logo" width="160" height="160">
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
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project

This project implements a form generator with React. Using mainly React Hooks. 

### Built With

* [React](https://reactjs.org/)
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)


<!-- GETTING STARTED -->
## Getting Started

To start to use the library, follow these simple steps. 

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```bash
npm i react react-dom react-jss
```

### Installation
 
```bash
npm i dynamic-form-wavelop
```


<!-- USAGE EXAMPLES -->
## Usage

Create a configuration file: 

```js
// config.js
export default     
{
  name: "email",
  label: "Email",
  helperText: "Write your email",
  tag: "input",
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
  applyCrypt2State,
  useDynamicForm,
  DynamicFormProvider
} from "dynamic-form";

import { form as formConfig } from "./config.js";

function Example(props) {

  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const { _globalErrors } = errorFromService;

  const onSubmit = event => {

    if (_globalErrors === 0) {
      console.log(stateFromService);
    }

    event.preventDefault();
  };

  // Render
  return (
    <DynamicFormProvider>

      <section>

        {_globalErrors === 0 ? <p>Form contains error.</p>}

        <form onSubmit={onSubmit}>
          <DynamicForm
            config={formConfig}
            ref={childRef}
            updateModelAtBlur={true}
            debug={true}
          />

          <button
            type="submit"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </form>

      </section>

    </DynamicFormProvider>
  );
}

Example.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Example;
```

_For more examples, please refer to the [Documentation](https://dynamic-form-wavelop.firebaseapp.com/)_

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Wavelop/dynamic-form/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project;
1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`);
1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`);
1. Push to the Branch (`git push origin feature/AmazingFeature`);
1. Open a Pull Request.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Matteo Granzotto - [@wavelop](https://twitter.com/blundert) - [matteo.granzotto@wavelop.com](mailto:matteo.granzotto@wavelop.com)

[Wavelop](wavelop.com) - [info@wavelop.com](mailto:info@wavelop.com)

Project Link: [https://github.com/Wavelop/dynamic-form](https://github.com/Wavelop/dynamic-form)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[node-package-shield]: https://img.shields.io/npm/v/dynamic-form-wavelop.svg
[node-package-url]: https://www.npmjs.com/package/dynamic-form-wavelop
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