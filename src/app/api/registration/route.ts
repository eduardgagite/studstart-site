import { NextResponse } from "next/server";
import { registrationFields } from "@/data/registration";
import { buildN8nPayload, type RegistrationFields, type RegistrationMetadata } from "@/lib/n8n";

const REQUIRED_FIELD_IDS = registrationFields
  .filter((field) => field.required)
  .map((field) => field.id);

const OPTIONAL_METADATA_FIELDS: Array<keyof RegistrationMetadata> = [
  "referrer",
  "theme",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeMetadata(input: Record<string, unknown>): RegistrationMetadata | null {
  if (!isNonEmptyString(input.timestamp) || !isNonEmptyString(input.page_url)) {
    return null;
  }

  const metadata: RegistrationMetadata = {
    timestamp: input.timestamp.trim(),
    page_url: input.page_url.trim(),
  };

  for (const key of OPTIONAL_METADATA_FIELDS) {
    const value = input[key];
    if (isNonEmptyString(value)) {
      metadata[key] = value.trim();
    }
  }

  return metadata;
}

function normalizeFields(input: Record<string, unknown>): RegistrationFields {
  const fields: RegistrationFields = {};

  for (const field of registrationFields) {
    const value = input[field.id];
    if (typeof value === "string") {
      fields[field.id] = value.trim();
    }
  }

  return fields;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook не настроен. Свяжитесь с организаторами." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const honeypot = payload.honeypot;

  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  const metadataInput = payload.metadata;
  if (!metadataInput || typeof metadataInput !== "object") {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  const metadata = normalizeMetadata(metadataInput as Record<string, unknown>);
  if (!metadata) {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  const fields = normalizeFields(payload);
  const missingRequired = REQUIRED_FIELD_IDS.filter((id) => !isNonEmptyString(fields[id]));

  if (missingRequired.length > 0) {
    return NextResponse.json(
      { error: "Пожалуйста, заполните все обязательные поля." },
      { status: 422 }
    );
  }

  const n8nPayload = buildN8nPayload(fields, metadata);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(n8nPayload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Попробуйте позже." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
