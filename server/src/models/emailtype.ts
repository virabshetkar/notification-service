export const emailtypes = [
  "registration",
  "payment-success",
  "payment-failure",
] as const;

export type EmailType = typeof emailtypes[number];