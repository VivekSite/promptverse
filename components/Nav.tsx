"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SignIn, SignOut } from "./auth-components";

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = session ? true : false;
  const [toggleDropDown, setToggleDropDown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*––––––––––––––––––––––– Desktop Navigation –––––––––––––––––––––––*/}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => SignOut()}
              className="outline_btn"
            >
              SignOut
            </button>

            {session?.user && (
              <Link href="/profile">
                <Image
                  src={`${session.user.image}`}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => SignIn({ provider: "google" })}
              className="black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/*––––––––––––––––––––––– Mobile Navigation –––––––––––––––––––––––*/}
      <div className="md:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  MyProfile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    SignOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => SignIn({ provider: "google" })}
              className="black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
