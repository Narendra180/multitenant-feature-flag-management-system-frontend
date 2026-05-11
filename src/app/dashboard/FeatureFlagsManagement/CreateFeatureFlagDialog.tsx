import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { featureFlagsFormSchema } from "./FeatureFlagsManagement";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

type CreateFeatureFlagDialogProps = {
  form: UseFormReturn<z.infer<typeof featureFlagsFormSchema>>;
  handleCreateFlagBtnClick: (data: z.infer<typeof featureFlagsFormSchema>) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  isCreatingFeatureFlag: boolean;
  dialogTrigger: ReactNode;
  isEdit?: boolean;
}

const CreateFeatureFlagDialog = ({
  form,
  handleCreateFlagBtnClick,
  isOpen,
  onOpenChange,
  isCreatingFeatureFlag,
  dialogTrigger,
  isEdit = false
}: CreateFeatureFlagDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Feature Flag</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleCreateFlagBtnClick)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <Controller
                name="key"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="" htmlFor="key">
                      Key
                    </FieldLabel>
                    <Input
                      {...field}
                      className="h-9"
                      id="key"
                      type="text"
                      placeholder="Key"
                      disabled={isEdit}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />


              <Controller
                name="isEnabled"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="horizontal">
                    <Checkbox 
                      id="isEnabled" 
                      name="isEnabled" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-base" htmlFor="isEnabled">Is Enabled</Label>
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
                  {
                    isEdit?"Save":"Create"
                  }
                </span>
                {
                  isCreatingFeatureFlag && (
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

export default CreateFeatureFlagDialog;
