export type RegistrationFields = Record<
  string,
  string | number | boolean | null | RegistrationMetadata
>;

export type RegistrationMetadata = {
  timestamp: string;
  page_url: string;
  referrer?: string;
  theme?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type RegistrationPayload = RegistrationFields & {
  metadata: RegistrationMetadata;
};

export function buildN8nPayload(
  fields: RegistrationFields,
  metadata: RegistrationMetadata
): RegistrationPayload {
  return {
    ...fields,
    metadata,
  };
}
