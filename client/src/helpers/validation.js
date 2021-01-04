import validator from 'validator';

export const validateUrl = url => validator.isURL(url, { protocols: ['http', 'https'] });

export function formatToUrl(str) {
  if (str.startsWith('http')) {
    return str;
  } else {
    return 'http://' + str
  }
}