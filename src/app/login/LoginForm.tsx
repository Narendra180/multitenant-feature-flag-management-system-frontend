"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useLoginMutation } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type LoginFormProps = {
  isRootSubdomain: boolean;
}

const formSchema = z.object({
  email: z.string().min(1, { error: "Please enter email" }),
  password: z.string().min(1, { error: "Please enter password" })
})

const LoginForm = ({
  isRootSubdomain
}: LoginFormProps) => {
  const router = useRouter();

  const loginMutation = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.info("Logged in successfully.", {
        position: "bottom-right"
      });
      form.reset();
      router.push("/dashboard");
    } catch (err: any) {
      const errMessage = err.response.data.message;
      toast.error(errMessage, {
        position: "bottom-right",
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-base" htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  className="h-9"
                  id="email"
                  type="email"
                  placeholder="Please enter email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-base" htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  className="h-9"
                  id="password"
                  type="password"
                  placeholder="Please enter password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          {
            !isRootSubdomain && (
              <Button
                className="text-base h-auto px-5 py-1.5 cursor-pointer"
                variant={"outline"}
                type="button"
                asChild
              >
                <Link href={"/signup"}>
                  Signup
                </Link>
              </Button>
            )
          }

          <Button
            className="text-base h-auto px-5 py-1.5 cursor-pointer"
            type="submit"
          >
            <span>
              Login
            </span>
            {
              loginMutation.isPending && (
                <Spinner />
              )
            }
          </Button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm;