"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, Home, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-background">
          <div className="container flex flex-col items-center justify-center gap-6 text-center">
            <div className="space-y-2">
              <AlertOctagon className="mx-auto h-12 w-12 text-destructive" />
              <h1 className="text-4xl font-bold tracking-tight">
                Something went wrong!
              </h1>
              <p className="text-muted-foreground">
                Probably ran out of daytime quota, try replacing the API key
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => reset()}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
