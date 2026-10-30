/**
 * Contact-form schema shared by the client form and the API route, so the
 * same rules are enforced in the browser and on the server.
 */

export const enquiryCategories = [
  { value: "collaboration", label: "Collaboration & partnerships" },
  { value: "community", label: "Community wellbeing programme" },
  { value: "institutional", label: "Institutional programme" },
  { value: "knowledge-exchange", label: "Professional knowledge exchange" },
  { value: "general", label: "General enquiry" },
] as const;

export type EnquiryCategory = (typeof enquiryCategories)[number]["value"];

export const isEnquiryCategory = (value: unknown): value is EnquiryCategory =>
  enquiryCategories.some((c) => c.value === value);

export const categoryLabel = (value: EnquiryCategory) =>
  enquiryCategories.find((c) => c.value === value)?.label ?? value;

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  category: string;
  message: string;
  consent: boolean;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const limits = {
  name: 120,
  email: 254,
  phone: 30,
  organisation: 160,
  message: 5000,
  messageMin: 10,
} as const;

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]{6,}$/;

export function normaliseEnquiry(raw: Partial<Record<EnquiryField, unknown>>): EnquiryInput {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: text(raw.name),
    email: text(raw.email),
    phone: text(raw.phone),
    organisation: text(raw.organisation),
    category: text(raw.category),
    message: text(raw.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!input.name) errors.name = "Please tell us your name.";
  else if (input.name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > limits.email || !EMAIL_PATTERN.test(input.email))
    errors.email = "Please enter a valid email address, for example name@example.com.";

  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "");
    if (input.phone.length > limits.phone || !PHONE_PATTERN.test(input.phone) || digits.length < 6)
      errors.phone = "Please enter a valid phone number, or leave this field empty.";
  }

  if (input.organisation.length > limits.organisation)
    errors.organisation = `Please keep this under ${limits.organisation} characters.`;

  if (!input.category) errors.category = "Please choose the subject of your enquiry.";
  else if (!isEnquiryCategory(input.category)) errors.category = "Please choose one of the listed subjects.";

  if (!input.message) errors.message = "Please write a short message.";
  else if (input.message.length < limits.messageMin)
    errors.message = `Please write at least ${limits.messageMin} characters so we can understand your enquiry.`;
  else if (input.message.length > limits.message)
    errors.message = `Please keep your message under ${limits.message} characters.`;

  if (!input.consent) errors.consent = "Please confirm that we may use these details to respond to you.";

  return errors;
}
