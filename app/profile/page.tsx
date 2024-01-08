"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

import Profile from "@/components/Profile";
import axios from "axios";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const handleEdit = (post: Post) => {
    router.push(`/update-post?id=${post.id}`);
  };

  const handleDelete = async (post: Post) => {
    const isConfirmed = confirm(`Are you sure you want to delete the post`);

    if(isConfirmed) {
      try {
        await axios.delete(`/api/posts/${post.id}`);

        console.log("Post deleted successfully.");
      } catch (error) {
        console.log("Error deleting post", error);
      }
      const filteredPost = posts.filter(p => p.id !== post.id)
      setPosts(filteredPost);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/api/users/${session?.user?.email}/posts`);
        setPosts(res.data.posts);
      } catch (error) {
        console.log("[ERROR FETCHING USER'S POSTS]");
      }
    };

    if (session?.user?.email) getPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your pesonalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
