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
    <div className="grid grid-cols-3 h-16 items-center border-b-2 border-gray-100">
      <div className="flex justify-start">
        <div className="flex flex-row gap-1 justify-center items-center">
        <Image src={"/assets/DiscussLogo2.jpg"} height={35} width={35} alt="logo" className="rounded-3xl"/>
        <h1 className="font-bold text-2xl text-blue-500">DiscussLy</h1>
        </div>
      </div>
      <div className="flex justify-center"> 
        <Suspense>
        <SearchInput/>
        </Suspense>
      </div>
      <div className="flex justify-end gap-2">
        <AuthHeader/>
      </div>
    </div>
  );
};

export default Header;
