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
- [✈️ Roadmap](#️-roadmap)
- [🚑 Contributing](#-contributing)
  - [📝 Commit messages](#-commit-messages)
    - [📝 Commit message by default](#-commit-message-by-default)
    - [📝 Examples of good commit message](#-examples-of-good-commit-message)
    - [📝 Why a structured commit message](#-why-a-structured-commit-message)
- [💰 License](#-license)
- [📞 Contact](#-contact)


<!-- ABOUT THE PROJECT -->
## 🔍 About The Project

This project implements a form generator with React. Using mainly React Hooks. 

### 🔧 Built With

* [React](https://reactjs.org/)
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)


<!-- GETTING STARTED -->
## 🔫 Getting Started

To start to use the library, follow these simple steps. 

### 👶 Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```bash
npm i react react-dom react-jss
```

### 💻 Installation
 
```bash
npm i dynamic-form-wavelop
```


<!-- USAGE EXAMPLES -->
## 🚲 Usage

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

_For more examples, please refer to the [Documentation](https://dynamic-form-wavelop.firebaseapp.com/)_

<!-- ROADMAP -->
## ✈️ Roadmap

See the [open issues](https://github.com/Wavelop/dynamic-form/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## 🚑 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project;
1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`);
1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`);
1. Push to the Branch (`git push origin feature/AmazingFeature`);
1. Open a Pull Request.

### 📝 Commit messages

The commit message should be structured as follows (custom version of the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) rules set):

```
<type>(#<issue-id>): <description>

[optional body]

[optional footer(s)]
```

first line is the `header` and it must be a string with max 100 chars.  

Where `<type>` must be one of the following:

- `build`: changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm);
- `ci`: changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs);
- `docs`: documentation only changes;
- `feat`: a new feature;
- `fix`: a bug fix;
- `perf`: a code change that improves performance;
- `refactor`: a code change that neither fixes a bug nor adds a feature;
- `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc);
- `test`: adding missing tests or correcting existing tests.

Where `<issue-id>` is the automatic generated number of Gitlab issue. 

Where `<description>` contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes";
- don't capitalize the first letter;
- no dot (.) at the end.

Where `<body>` should include the motivation for the change and contrast this with previous behavior. Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes".

Where `<footer>` should contain any information about Breaking Changes. Breaking Changes should start with the word `BREAKING CHANGE: ` with a space. 

#### 📝 Commit message by default

By default, it is necessary only to write the `<description>`. This becasue the pre-commit hooks, `prepare-commit-msg`, will add the `<type>` and the `<issue-id>`.

For example: 

```
> $ git branch
    * feature/37
> $ git commit -am "modify the header logo"
    husky > pre-commit (node v10.13.0)
    ℹ No staged files match any configured task.
    husky > prepare-commit-msg (node v10.13.0)
    COMMIT MESSAGE LINTING
    .
    .
    BRANCHES_TO_SKIP:
    . release
    BRANCHES_PROTECTED:
    . master
    . develop
    IS THIS BRANCH EXCLUDED: 0
    DOES COMMIT MESSAGE OVERRIDE PREPEND: 0
    DOES COMMIT MESSAGE OVERRIDE PREPEND_WITH_ID: 0
    Appling autoprepending...
    .
    .
    COMMIT MESSAGE LINTING DONE!
    husky > commit-msg (node v10.13.0)
    husky > post-commit (node v10.13.0)
    [feature/3 7674404] feat(#3): modify the header logo
    1 file changed, 88 insertions(+), 3 deletions(-)
```

as you can see the final commit message is: 

```
feat(#37): modify the header logo
```

`feature` branch will add automatically the `feat` type. 
`hotfix` branch will add automatically the `fix` type. 

Any commit starting with another type, one of the above paragraph, will override the prepending system.

Writing: 

```
fix(#37): modify the header logo
```

or

```
fix: modify the header logo
```

are both allowed. Not specifyng the `<issue-id>` will add at the end of the commit message the follwoing information of the issue: 

```
Issue type: <branch-type>
Issue number: <issue-id> 
```

To summarize: 

1)

 ```
> $ git branch
    * feature/37
> $ git commit -am "modify the header logo"
    
##  Commit message will be: 
##  feat(#37): modify the header logo
```

2)

 ```
> $ git branch
    * feature/37
> $ git commit -am "feat(#37): modify the header logo"
    
##  Commit message will be: 
##  feat(#37): modify the header logo
```

3) 

```
> $ git branch
    * feature/37
> $ git commit -am "feat: modify the header logo"
    
##  Commit message will be: 
##  feat: modify the header logo
##  
##  Issue type: feat
##  Issue number: #37 
```

4) 

```
> $ git branch
    * feature/37
> $ git commit -am "fix(#37): modify the header logo"
    
##  Commit message will be: 
##  fix(#37): modify the header logo
```

5)

```
> $ git branch
    * feature/37
> $ git commit -am "fix: modify the header logo"
    
##  Commit message will be: 
##  fix: modify the header logo
##  
##  Issue type: feat
##  Issue number: #37 
```

6) 

```
> $ git branch
    * hotfix/37
> $ git commit -am "modify the header logo"
    
##  Commit message will be: 
##  fix(#37): modify the header logo
```

#### 📝 Examples of good commit message

1)

```
feat(#34): update button props

Add new props to the generic butto to allow it the possibility to manage more state. For example, 
disabled, readonly, loading, etc. 

BREAKING CHANGE: the old props disabled is "depracted" in favour of new one, "status"
```

2)

```
fix(#35): resolve button props problem of rendering
```

#### 📝 Why a structured commit message
- Automatically generating CHANGELOGs.
- Automatically determining a semantic version bump (based on the types of commits landed).
- Communicating the nature of changes to teammates, the public, and other stakeholders.
- Triggering build and publish processes.
- Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

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