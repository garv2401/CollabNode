import React, { Suspense } from "react";
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
import AuthHeader from "./authHeader";
import SearchInput from "./SearchInput";
import Image from "next/image";

const Header = () => {
  return (
    <div className="border-b-2 border-gray-100 p-4">
      {/* Top Row: Logo + User */}
      <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-4">
        {/* Left: Logo */}
        <div className="flex justify-between md:justify-start items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/assets/DiscussLogo2.jpg"
              height={35}
              width={35}
              alt="logo"
              className="rounded-3xl"
            />
            <h1 className="font-bold text-2xl text-blue-500">DiscussLy</h1>
          </div>

          {/* Right: Auth (on mobile stays in same row) */}
          <div className="block md:hidden">
            <AuthHeader />
          </div>
        </div>

        {/* Center: Search bar (spans full width on mobile) */}
        <div className="w-full flex justify-center md:col-span-1">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>

        {/* Right: Auth section for desktop */}
        <div className="hidden md:flex justify-end gap-2">
          <AuthHeader />
        </div>
      </div>
    </div>
  );
};

export default Header;
