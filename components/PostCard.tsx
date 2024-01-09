"use client";

import { Post, User } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import copyIcon from "@/public/assets/icons/copy.svg";
import tickIcon from "@/public/assets/icons/tick.svg";
import axios from "axios";

interface PostCardProps {
  post: Post;
  handleTagClick?: (tags: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PostCardProps) => {
  const [copied, setCopied] = useState("");
  const [author, setAuthor] = useState<User | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const user = await axios.get(`/api/user/${post.authorId}`);

        setAuthor(user.data);
      } catch (error) {
        console.log("[ERROR FINDING AUTHOR]");
      }
    };

    getAuthor();
  }, [post.authorId]);

  const handleCopy = () => {
    setCopied(post.body);
    navigator.clipboard.writeText(post.body);

    setTimeout(() => setCopied(""), 3000);
  };
  
  const handleProfileClick = () => {
    router.push(`/profile?id=${author?.id}&name=${author?.name}`);
  }

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div 
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={`${author?.image || ''}` || tickIcon}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {author?.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {author?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.body ? tickIcon : copyIcon}
            alt="copy content"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.body}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tags)}
      >
        {post.tags}
      </p>

      {session?.user?.id === post.authorId && pathName === "/profile" && (
        <div className="flex-end gap-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
