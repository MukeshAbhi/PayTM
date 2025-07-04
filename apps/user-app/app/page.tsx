"use client";

import { Intro } from "@/components/Intro";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  if (session?.user) {
    redirect('/dashboard/home')
  } else {
    return (
      <Intro/>
    )
  }
    
}

