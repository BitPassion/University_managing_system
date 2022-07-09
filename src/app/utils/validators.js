export const rules = {
  email: v => !!(v || '').match(/[\w\\.-]{3,}@[\w]{2,}\.[a-z]{2,}/) || 'Please enter a valid email',
  length: len => v =>
    (v || '').length <= len ||
    `Invalid character length, required less than ${len}`,
  range: (from, to) => (v = 0) =>
    (!isNaN(Number(v)) && Number(v) > from && Number(v) < to) ||
    `Value must be number in range ${from} - ${to}`,
  sameAs: pass => v => pass === v || 'Password do not match!',
  password: v =>
    (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character',
  required: field => v => !!v || `${field || 'This field'} is required`,
  min: num => v => (v || '').length >= num || `Min ${num} characters`,
  max: num => v => (v || '').length <= num || `Max ${num} characters`
};
