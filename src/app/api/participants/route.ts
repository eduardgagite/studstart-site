import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 15000;

export async function GET() {
  const webhookUrl = process.env.N8N_PARTICIPANTS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Загрузка списка участников недоступна." },
      { status: 500 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Не удалось получить данные участников." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Не удалось получить данные участников." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
