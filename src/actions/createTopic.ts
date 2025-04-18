"use server";
import { auth } from "@/auth";
import zod from "zod";
import { prisma } from "@/lib/index";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createTopicSchema = zod.object({
  name: zod
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z-]+$/,"Must be lower case letters without spaces"),
  description: zod.string().min(10),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    formError?: string[];
  };
};

export const createTopic = async (
  prevState: CreateTopicFormState,
  formdata: FormData
): Promise<CreateTopicFormState> => {
  const name = formdata.get("name")?.toString();
  const description = formdata.get("description")?.toString();

  const result = createTopicSchema.safeParse({ name, description });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        formError: ["You must be logged in to create a topic"],
      },
    };
  }

  let topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name, // Use the name as the slug
        description: result.data.description,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          formError: [err.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath("/");
  redirect(`/topic/${topic.slug}`);
};
