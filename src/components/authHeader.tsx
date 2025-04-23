"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import Link from "next/link";
const AuthHeader = () => {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === "loading") return null;

  if (session?.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Welcome back,</span>
              <span className="text-md font-semibold text-gray-800">
                {session.data?.user?.name || "User"}
              </span>
            </div>
            <Avatar>
              <AvatarImage
                src={session.data?.user?.image || ""}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>

        <PopoverContent className="bg-white border-0 w-36 flex flex-col gap-2 justify-center items-center">
          <h1 className="font-bold">{session.data?.user?.name}</h1>
          <Separator className="bg-gray-300 my-1" />
          <Link
            href={`/user/${session?.data?.user?.id}/posts`}
            className="font-semibold hover:text-blue-500"
          >
            My Posts
          </Link>
          <Separator className="bg-gray-300 my-1" />

          <Link
            href={`/user/${session?.data?.user?.id}/liked`}
            className="font-semibold hover:text-blue-500"
          >
            Liked Posts
          </Link>
          <Separator className="bg-gray-300 my-1" />
          <Link
            href={`/user/${session?.data?.user?.id}/saved`}
            className="font-semibold hover:text-blue-500"
          >
            Saved Posts
          </Link>
          <Separator className="bg-gray-300 my-1" />

          <form action={signOut} className="">
            <Button className="border-0 text-white bg-black">Sign Out</Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <div className="flex flex-row-reverse items-center justify-center gap-2 bg-white p-1 rounded-2xl max-w-sm ">
          <form action={signIn} className="w-full">
            <Button className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2 rounded-lg transition">
              Sign in
            </Button>
          </form>
          
          <div className="flex items-center gap-2">
            
            <svg
              height="32"
              width="32"
              viewBox="0 0 24 24"
              version="1.1"
              aria-hidden="true"
              className="fill-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              data-view-component="true"
            >
              <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z" />
            </svg>
          </div>
        </div>
      </>
    );
  }

  return authContent;
};

export default AuthHeader;
