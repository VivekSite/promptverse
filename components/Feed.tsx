"use client";

import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { Post } from "@prisma/client";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<string | number | undefined | NodeJS.Timeout >(undefined);

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.authorName) ||
        regex.test(item.tags) ||
        regex.test(item.body)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/*--------------------- List of all posts ---------------------*/}
      <div className="mt-16 prompt_layout">
        {searchText === "" 
          ?posts.map((post) => (
            <PostCard 
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
          :searchedResults.map((post) => (
            <PostCard 
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
