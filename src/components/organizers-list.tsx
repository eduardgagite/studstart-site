"use client";

import { useMemo, useState } from "react";
import { organizerRoles, organizers } from "@/data/organizers";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

const roles = ["Все", ...organizerRoles];

export function OrganizersList() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState(roles[0]);

  const filtered = useMemo(() => {
    return organizers.filter((item) => {
      const matchesRole = role === "Все" || item.role === role;
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [query, role]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <input
          className="w-full rounded-md border border-border/70 bg-surface px-4 py-2 text-sm text-foreground md:w-64"
          placeholder="Поиск по имени"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {roles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={cn(
                "rounded-md border border-border/60 px-3 py-2 text-xs font-semibold transition",
                role === item
                  ? "border-primary/70 bg-primary text-slate-900"
                  : "bg-surface text-muted hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((organizer) => (
          <div
            key={organizer.id}
            className="flex items-center gap-4 rounded-md border border-border/60 bg-surface p-4"
          >
            <img
              src={assetPath(organizer.photo)}
              alt={organizer.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{organizer.name}</p>
              <p className="text-xs text-muted">{organizer.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
