import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "./Organizations";
import { Spinner } from "@/components/ui/spinner";


type CreateDialogProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleCreateOrgBtnClick: (data: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  isCreatingOrg: boolean;
}

const CreateOrgDialog = ({
  form,
  handleCreateOrgBtnClick,
  isOpen,
  onOpenChange,
  isCreatingOrg
}: CreateDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          className="text-base h-auto py-2 px-4 cursor-pointer"
        >
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleCreateOrgBtnClick)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="" htmlFor="orgName">
                      Organization Name
                    </FieldLabel>
                    <Input
                      {...field}
                      className="h-9"
                      id="orgName"
                      type="text"
                      placeholder="Organization name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="" htmlFor="address">
                      Address
                    </FieldLabel>
                    <Textarea
                      {...field}
                      className="h-9"
                      id="address"
                      placeholder="Address"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="subdomainName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="" htmlFor="subdomain">
                      Subdomain
                    </FieldLabel>
                    <Input
                      {...field}
                      className="h-9"
                      id="subdomain"
                      type="text"
                      placeholder="Please enter subdomain"
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
                type="submit"
              >
                <span>
                  Create
                </span>
                {
                  isCreatingOrg && (
                    <Spinner />
                  )
                }
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrgDialog;