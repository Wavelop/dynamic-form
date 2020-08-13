# 🚑 Contributing to Dynamic Form

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 📑 Table of Contents

- [🚑 Contributing to Dynamic Form](#-contributing-to-dynamic-form)
  - [📑 Table of Contents](#-table-of-contents)
  - [⚒ Create a new feature](#-create-a-new-feature)
  - [📝 Commit messages](#-commit-messages)
    - [📝 Commit message by default](#-commit-message-by-default)
    - [📝 Examples of good commit message](#-examples-of-good-commit-message)
    - [📝 Why a structured commit message](#-why-a-structured-commit-message)
  - [📲 Create a release](#-create-a-release)

## ⚒ Create a new feature

1. Fork the Project;
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`);
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`);
4. Push to the Branch (`git push origin feature/AmazingFeature`);
5. Open a Pull Request.

## 📝 Commit messages

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

### 📝 Commit message by default

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

### 📝 Examples of good commit message

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

### 📝 Why a structured commit message
- Automatically generating CHANGELOGs.
- Automatically determining a semantic version bump (based on the types of commits landed).
- Communicating the nature of changes to teammates, the public, and other stakeholders.
- Triggering build and publish processes.
- Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

## 📲 Create a release

Execute the following command inside a package folder (I.E. core): 

```
npm publish
```

To test the package generation execute: 

```
npm pack
```