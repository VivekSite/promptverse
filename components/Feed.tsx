"use client";

import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { Post } from "@prisma/client";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const filterPrompts = () => {
    // const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    // return allPosts.filter(
    //   (item) =>
    //     regex.test(item.creator.username) ||
    //     regex.test(item.tag) ||
    //     regex.test(item.prompt)
    // );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // clearTimeout(searchTimeout);
    // setSearchText(e.target.value);
    // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = filterPrompts(e.target.value);
    //     setSearchedResults(searchResult);
    //   }, 500)
    // );
  };

  const handleTagClick = () => {
    // setSearchText(tagName);
    // const searchResult = filterPrompts(tagName);
    // setSearchedResults(searchResult);
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
          // onClick={}
        />
      </form>

      {/*--------------------- List of all posts ---------------------*/}
      <div className="mt-16 prompt_layout">
        {
          posts.map((post) => (
            <PostCard 
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
              handleEdit={() => {}}
              handleDelete={() => {}}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
