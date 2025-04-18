'use client'

import React, { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createTopic } from "@/actions/createTopic";

const TopicCreateForm = () => {

  const [formState,action]=useActionState(createTopic,{errors:{}});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" border-0 text-white bg-black">Create Topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-0">
        <form action={action} className="">
          <DialogHeader>
            <DialogTitle>Create a Topic</DialogTitle>
            <DialogDescription className="text-stone-600">
              Write a topic to start discussion. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="">
              <Label htmlFor="name" className="text-right my-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3 border-gray-300 shadow-md"
              />
            </div>
            {formState.errors.name && <p className="text-sm text-red-600">{formState.errors.name}</p>}
            <div className="">
              <Label htmlFor="description" className="text-right my-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3 border-gray-300 shadow-md"
              />
            </div>
            {formState.errors.description && <p className="text-sm text-red-600">{formState.errors.description}</p>}
            {formState.errors.formError && <div className="border border-red-600 bg-red-200 p-2 text-center rounded-lg text-red-600">{formState.errors.formError + "!"}</div>}
          </div>
          <DialogFooter>
            <Button
              className=" border-0 text-white bg-black w-full"
              type="submit"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopicCreateForm;
