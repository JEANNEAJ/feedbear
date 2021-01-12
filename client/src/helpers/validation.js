import validator from 'validator';

export const validateUrl = url => validator.isURL(url, { protocols: ['http', 'https'] });

export function formatToUrl(str) {
  if (str.startsWith('http')) {
    return str;
  } else {
    return 'http://' + str
  }
}

export const validateEmail = email => validator.isEmail(email);

// default settings: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
export const validatePassword = pssw => validator.isStrongPassword(pssw, { minSymbols: 0 })