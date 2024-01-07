"use client";

import { Post, User } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getUserById } from "@/lib/get-user";
import copyIcon from "@/public/assets/icons/copy.svg";
import tickIcon from "@/public/assets/icons/tick.svg";

interface PostCardProps {
  post: Post;
  handleTagClick: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PostCardProps) => {
  const {data: session} = useSession();
  const [copied, setCopied] = useState("");

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={`${session?.user?.image}`}
            alt="Auth"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">username</h3>
            <p className="font-inter text-sm text-gray-500">username@gmail.com</p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => {}}>
          <Image 
            src={
              copied === post.body 
                ? tickIcon
                : copyIcon
            }
            alt="copy content"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.body}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">{post.tags}</p>
    </div>
  );
};

export default PostCard;
