import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetFeatureFlagByKeyMutation } from "@/services/featureflags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FeatureFlag } from "@/services/featureflags/types";

export const formSchema = z.object({
  key: z
    .string()
    .min(1, "Please enter key")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "key can only contain lowercase letters, numbers, and hyphens (e.g., 'test-152'). It cannot start or end with a hyphen.",
    })
})

const UserDashboard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: ""
    },
  });

  const getFeatureFlagByKeyMutation = useGetFeatureFlagByKeyMutation();

  const [flagData, setFlagData] = useState<FeatureFlag[]>([]);

  const handleSubmitBtn = async (data: z.infer<typeof formSchema>) => {
    try {
      const responseData = await getFeatureFlagByKeyMutation.mutateAsync({
        name: data.key
      });
      setFlagData(responseData.data);
      if (responseData.data.length) {
        toast.info("Fetched feature flag successfully.", {
          position: "bottom-right"
        });
      } else {
        toast.info("No feature flag found with this key.");
      }
      form.reset();
    } catch (err: any) {
      const errMessage = err.response.data.message;
      toast.error(errMessage, {
        position: "bottom-right",
      })
    }
  }

  return (
    <div
      className="flex flex-col gap-5 px-4 py-8"
    >
      <h1
        className="text-xl font-semibold"
      >
        User Dashboard
      </h1>
      <div
        className="flex flex-col gap-5"
      >
        <form onSubmit={form.handleSubmit(handleSubmitBtn)}>
          <div className="flex gap-4 items-start">
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              className="text-base h-auto px-5 py-1.5 cursor-pointer relative top-6"
              type="submit"
            >
              <span>
                Submit
              </span>
              {
                getFeatureFlagByKeyMutation.isPending && (
                  <Spinner />
                )
              }
            </Button>
          </div>
        </form>
        <div>
          {
            flagData.length ? (
              <Table className="w-full border">
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100">
                    <TableHead>
                      Key
                    </TableHead>
                    <TableHead colSpan={2}>
                      Enabled
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    flagData.map(obj => {
                      const {
                        id, key, isEnabled,
                      } = obj;
                      return (
                        <TableRow>
                          <TableCell>
                            {key}
                          </TableCell>
                          <TableCell>
                            {isEnabled ? "True" : "False"}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }

                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-10">
                No Data Found.
              </p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;

