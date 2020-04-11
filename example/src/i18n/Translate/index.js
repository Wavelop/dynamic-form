let _currentLanguage = "";
let _fallbackLanguage = "";
let _languages = [];
let _translations = {};

export const getCurrentLanguage = () => {
  return _currentLanguage;
};

export const setCurrentLanguage = currentLanguage => {
  _currentLanguage = currentLanguage;
};

export const getFallbackLanguage = () => {
  return _fallbackLanguage;
};

export const setFallbackLanguage = fallbackLanguage => {
  _fallbackLanguage = fallbackLanguage;
};

export const getLanguages = () => {
  return _languages;
};

export const getFlags = () => {
  const flagMapLanguages = {
    en: "gb",
    it: "it",
    fr: "fr",
    es: "es"
  };
  let availableFlags = {};

  Object.keys(flagMapLanguages).forEach(key => {
    if (_languages.indexOf(key) !== -1) {
      availableFlags[key] = flagMapLanguages[key];
    }
  });

  return availableFlags;
};

export const setLanguages = languages => {
  _languages = languages;

  _languages.forEach(language => {
    const loadedLanguage = require(`../Languages/${language}.json`);
    _translations[language] = loadedLanguage;
  });
};

export const getTranslations = () => {
  return _translations;
};

export const setTranslations = translations => {
  _translations = translations;
};

export const t = (label, params) => {
  let labelTranslated =
    _translations[_currentLanguage] && _translations[_currentLanguage][label]
      ? _translations[_currentLanguage][label]
      : _translations[_fallbackLanguage] &&
        _translations[_fallbackLanguage][label]
      ? _translations[_fallbackLanguage][label]
      : label;

  if(params) {
    labelTranslated = addParamsToLabel(labelTranslated, params);
  }

  return labelTranslated;
};

const addParamsToLabel = (label, params) =>{

  const finalLabel = [];
  const splittedLabel = label.split("${");

  if(splittedLabel.length > 1) {
    splittedLabel.forEach(element => {
      const parmsSplitted = element.split("}");
      if(parmsSplitted.length > 1) {        
        finalLabel.push(params[parmsSplitted[0]]);
        finalLabel.push(parmsSplitted[1]);
      } else {
        finalLabel.push(parmsSplitted[0]);
      }

    });
  } else {
    finalLabel.push(splittedLabel);
  }

  return finalLabel.join("");
}