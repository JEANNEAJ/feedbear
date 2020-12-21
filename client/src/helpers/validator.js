import validator from 'validator';

export const validateUrl = url => validator.isURL(url, { protocols: ['http', 'https'] });