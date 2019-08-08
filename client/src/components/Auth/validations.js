const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const email = value => value && !EMAIL_REGEX.test(value) ? 'Invalid email address' : undefined;
export const required = value => value ? undefined : 'Required';