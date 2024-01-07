"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Form = ({ type }: { type: string }) => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const router = useRouter();

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post("/api/new-post", {
        data: {
          email: session?.user?.email,
          title: post.title,
          body: post.body,
        },
      });
      // router.push("/");
    } catch (error) {
      console.log("[ERROR WHILE MAKING POST REQUEST:]", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{type}</span> Post
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing promtps with the world, and let your
          imagination run wild withany AI-powered platform.
        </p>

        <form
          onSubmit={createPost}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700 ">
              Your AI Prompt
            </span>

            <textarea
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              placeholder="Write your prompt here..."
              required
              className="form_textarea"
            ></textarea>
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700 ">
              Title
            </span>

            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="title"
              required
              className="form_input"
            />
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-rose-500 rounded-xl text-white"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
