import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCreateFeatureFlagMutation, useDeleteFeatureFlagMutation, useEditFeatureFlagMutation, useGetAllFeatureFlags } from "@/services/featureflags";
import { FeatureFlag } from "@/services/featureflags/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import CreateFeatureFlagDialog from "./CreateFeatureFlagDialog";

export const featureFlagsFormSchema = z.object({
  key: z
    .string()
    .min(1, "Please enter key")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "key can only contain lowercase letters, numbers, and hyphens (e.g., 'test-152'). It cannot start or end with a hyphen.",
    }),
  isEnabled: z.boolean()
})

const FeatureFlagsManagement = () => {
  const {
    data: featureFlags,
    isFetching: isFetchingFeatureFlags,
    error: isFailedToFetchFeatureFlags,
    refetch: refetchFeatureFlags
  } = useGetAllFeatureFlags();

  const createFeatureFlagMutation = useCreateFeatureFlagMutation();
  const editFeatureFlagMutation = useEditFeatureFlagMutation();
  const deleteFeatureFlagMutation = useDeleteFeatureFlagMutation();

  const [isCreateFlagDialogOpen, setIsCreateFlagDialogOpen] = useState(false);

  const [selectedFeatureFlagToEdit, setSelectedFeatureFlagToEdit] = useState<FeatureFlag | null>(null);

  const form = useForm<z.infer<typeof featureFlagsFormSchema>>({
    resolver: zodResolver(featureFlagsFormSchema),
    defaultValues: {
      key: "",
      isEnabled: false
    },
  });

  const handleDialogClose = (value: boolean) => {
    if (!value) {
      form.reset();
      if (selectedFeatureFlagToEdit) {
        setSelectedFeatureFlagToEdit(null);
      }
    }
    setIsCreateFlagDialogOpen(value);
  }

  const handleCreateFlagBtnClick = async (data: z.infer<typeof featureFlagsFormSchema>) => {
    try {
      await createFeatureFlagMutation.mutateAsync(data);
      toast.info("Created feature flag successfully.", {
        position: "bottom-right"
      });
      form.reset();
      refetchFeatureFlags();
      setIsCreateFlagDialogOpen(false);
    } catch (err: any) {
      const errMessage = err.response.data.message;
      toast.error(errMessage, {
        position: "bottom-right",
      })
    }
  }

  const handleSaveFlagBtnClick = async (data: z.infer<typeof featureFlagsFormSchema>) => {
    try {
      if (selectedFeatureFlagToEdit) {
        await editFeatureFlagMutation.mutateAsync({
          id: selectedFeatureFlagToEdit.id,
          enabled: data.isEnabled
        });
        toast.info("Saved feature flag successfully.", {
          position: "bottom-right"
        });
        form.reset();
        refetchFeatureFlags();
        setIsCreateFlagDialogOpen(false);
        setSelectedFeatureFlagToEdit(null);
      }
    } catch (err: any) {
      const errMessage = err.response.data.message;
      toast.error(errMessage, {
        position: "bottom-right",
      })
    }
  }

  // this state is for showing loading indicator while deleting flag.
  const [deletingFlagId, setDeletingFlagId] = useState("");
  const handleDeleteFlagClick = (id: string) => async () => {
    try {
      setDeletingFlagId(id);
      await deleteFeatureFlagMutation.mutateAsync({
        id
      });
      toast.info("Delete feature flag successfully.", {
        position: "bottom-right"
      });
      setDeletingFlagId("");
      refetchFeatureFlags();
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
      <div className="flex justify-between items-center">
        <h1
          className="text-xl font-semibold"
        >
          Feature Flags Management
        </h1>
        <CreateFeatureFlagDialog
          form={form}
          handleCreateFlagBtnClick={Boolean(selectedFeatureFlagToEdit) ? handleSaveFlagBtnClick : handleCreateFlagBtnClick}
          isOpen={isCreateFlagDialogOpen}
          onOpenChange={handleDialogClose}
          isCreatingFeatureFlag={Boolean(selectedFeatureFlagToEdit) ? editFeatureFlagMutation.isPending : createFeatureFlagMutation.isPending}
          dialogTrigger={
            <Button
              className="text-base h-auto py-2 px-4 cursor-pointer"
            >
              Create Feature Flag
            </Button>
          }
          isEdit={Boolean(selectedFeatureFlagToEdit)}
        />
      </div>
      <div
        className=""
      >
        {
          featureFlags?.length ? (
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
                  featureFlags.map((obj) => {
                    const {
                      id, key, isEnabled,
                    } = obj;
                    return (
                      <TableRow key={id}>
                        <TableCell>
                          {key}
                        </TableCell>
                        <TableCell>
                          {isEnabled ? "True" : "False"}
                        </TableCell>
                        <TableCell className="flex gap-4">
                          <Button
                            variant={"outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedFeatureFlagToEdit(obj);
                              form.setValues({
                                key: obj.key,
                                isEnabled: obj.isEnabled
                              });
                              setIsCreateFlagDialogOpen(true);
                            }}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant={"outline"}
                            className="cursor-pointer"
                            onClick={handleDeleteFlagClick(obj.id)}
                          >
                            <Trash />
                            {
                              deleteFeatureFlagMutation.isPending && (deletingFlagId === obj.id) && (
                                <Spinner />
                              )
                            }
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-10">No Data Found.</p>
          )
        }
      </div>
    </div>
  )
}

export default FeatureFlagsManagement;
