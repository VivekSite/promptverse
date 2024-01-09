"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import axios from "axios";

const UpdatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tags: "",
    body: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post("/api/new-post", {
        data: {
          authorName: session?.user?.name,
          userId: session?.user?.id,
          tags: post.tags,
          body: post.body,
        },
      });

      router.push("/");
    } catch (error) {
      console.log("[ERROR WHILE MAKING POST REQUEST:]", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form 
      type="Create" 
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default UpdatePost;
