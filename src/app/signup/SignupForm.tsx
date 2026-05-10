"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.string().min(1, { error: "Please enter email" }),
  password: z.string().min(1, { error: "Please enter password" }),
  confirmPassword: z.string().min(1, { error: "Please confirm password" })
})

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({ data })
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

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-base" htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  className="h-9"
                  id="confirmPassword"
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
          <Button
            className="text-base h-auto px-5 py-1.5 cursor-pointer"
            variant={"outline"}
            type="button"
            asChild
          >
            <Link href={"/login"}>
              Login
            </Link>
          </Button>
          <Button
            className="text-base h-auto px-5 py-1.5 cursor-pointer"
            type="submit"
          >
            Signup
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SignupForm;
