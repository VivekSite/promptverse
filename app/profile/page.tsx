"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@prisma/client";

import Profile from "@/components/Profile";
import axios from "axios";

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const isOhterUser = id && name;

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
        const res = await axios.get(`/api/user/${isOhterUser ? id : session?.user?.id}`);
        setPosts(res.data.posts);
      } catch (error) {
        console.log("[ERROR FETCHING USER'S POSTS]");
      }
    };

    if (session?.user?.id) getPosts();
  }, [id, isOhterUser, session]);

  return (
    <Profile
      name={isOhterUser ? name as string : "Your"}
      desc={isOhterUser ? `Welcome to ${name}'s profile`  : `Welcome to your pesonalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
