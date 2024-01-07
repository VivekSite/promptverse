import React from "react";
import Form from "@/components/Form";
import { auth } from "@/auth";

const CreatePrompt = async () => {
  const session = await auth();

  if (!session) {
    return <div>Access Denied</div>;
  }

  return <Form type="Create" />;
};

export default CreatePrompt;
