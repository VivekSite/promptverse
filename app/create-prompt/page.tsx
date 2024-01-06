"use client"

import React from 'react';
import { useSession } from "next-auth/react";

const CreatePrompt =  () => {
  const { data: session } = useSession();
  console.log(session);

  if(!session) return (
    <div>
      access denied
    </div>
  )

  return (
    <div>CreatePrompt</div>
  )
}

export default CreatePrompt