"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/ui/primitives/card";
import { SignInForm, type TSignInValues } from "../../SignInForm";

export function SignInScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: TSignInValues) {
    if (!values.username.trim() || !values.password) {
      setError("Invalid username or password.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    setIsSubmitting(false);
    if (!result || result.error) {
      setError("Invalid username or password.");
      return;
    }
    router.push("/now-playing");
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm onSubmit={onSubmit} error={error} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
