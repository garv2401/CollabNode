"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Auth } from "@auth/core";
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
            <AvatarImage src={session.data?.user?.image || ""} alt="@shadcn" />
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
        <form action={signIn} className="">
          <Button className="shadow-md border-0">Sign in</Button>
        </form>
{/* 
        <form action={signIn} className="">
          <Button className="shadow-md border-0">Sign up</Button>
        </form> */}
      </>
    );
  }

  return authContent;
};

export default AuthHeader;
