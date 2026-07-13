"use client";

import { Suspense } from "react";
import CreateClient from "./CreateClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateClient />
    </Suspense>
  );
}