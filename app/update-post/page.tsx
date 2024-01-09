"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import axios from "axios";

const UpdatePost = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const searchParams = useSearchParams();
  const [post, setPost] = useState({
    tags: "",
    body: "",
  });
  const id = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost({ tags: res.data.tags, body: res.data.body });
      } catch (error) {
        console.log("[ERROR GETTING DATA OF POST]", error);
      }
    };

    if (id) getPostData();
  }, [id]);

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await axios.patch(
        `/api/posts/${id}`,
        {
          tags: post.tags,
          body: post.body,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      router.push("/");
    } catch (error) {
      console.log("[ERROR WHILE EDITING POST REQUEST]", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={isUpdating}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
