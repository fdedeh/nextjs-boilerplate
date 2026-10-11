"use client";

import type { FormEvent } from "react";
import { Button } from "@/core/ui/primitives/button";
import { Input } from "@/core/ui/primitives/input";
import { Label } from "@/core/ui/primitives/label";

export type TSignInValues = {
  username: string;
  password: string;
};

export function SignInForm({
  onSubmit,
  error,
  isSubmitting = false,
}: {
  onSubmit: (values: TSignInValues) => void | Promise<void>;
  error?: string | null;
  isSubmitting?: boolean;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void onSubmit({
      username: String(data.get("username") ?? ""),
      password: String(data.get("password") ?? ""),
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "signin-error" : undefined}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "signin-error" : undefined}
        />
      </div>
      {error ? (
        <p id="signin-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
