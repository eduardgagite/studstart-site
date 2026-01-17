"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "studstart-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(420px,90vw)] rounded-md border border-border/70 bg-surface p-4 text-sm shadow-soft">
      <p className="text-foreground">
        Мы используем cookies и аналитику для улучшения сайта.
      </p>
      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "ok");
            setVisible(false);
          }}
        >
          Ок
        </Button>
      </div>
    </div>
  );
}
