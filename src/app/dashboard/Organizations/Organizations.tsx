
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCreateOrganizationMutation, useGetAllOrganizationsQuery } from "@/services/organizations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import CreateOrgDialog from "./CreateOrgDialog";
import { toast } from "sonner";
import { useState } from "react";

export const formSchema = z.object({
  name: z.string().min(1, { error: "Please enter name" }),
  address: z.string().min(1, { error: "Please enter address" }),
  subdomainName: z
    .string()
    .min(1, "Please enter subdomain")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Subdomain can only contain lowercase letters, numbers, and hyphens (e.g., 'test-152'). It cannot start or end with a hyphen.",
    })
})

const Organizations = () => {
  const {
    data: organizations, refetch
  } = useGetAllOrganizationsQuery();

  const createOrgMutation = useCreateOrganizationMutation();

  const [isCreateOrgDialogOpen, setIsCreateOrgDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      subdomainName: ""
    },
  });

  const handleDialogClose = (value: boolean) => {
    if(!value) {
      form.reset();
    }
    setIsCreateOrgDialogOpen(value);
  }

  const handleCreateOrgBtnClick = async (data: z.infer<typeof formSchema>) => {
    try {
      await createOrgMutation.mutateAsync(data);
      toast.info("Created organization successfully.", {
        position: "bottom-right"
      });
      form.reset();      
      refetch();
      setIsCreateOrgDialogOpen(false);
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
          Organizations
        </h1>

        <CreateOrgDialog
          form={form}
          handleCreateOrgBtnClick={handleCreateOrgBtnClick}
          isOpen={isCreateOrgDialogOpen}
          onOpenChange={handleDialogClose}
          isCreatingOrg={createOrgMutation.isPending}
        />
      </div>

      <div
        className=""
      >
        {
          organizations?.length ? (
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead>
                    Name
                  </TableHead>
                  <TableHead>
                    Address
                  </TableHead>
                  <TableHead>
                    Subdomain
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  organizations.map((obj) => {
                    const {
                      id, name, address, subdomainName
                    } = obj;
                    return (
                      <TableRow
                        key={id}
                      >
                        <TableCell>
                          {name}
                        </TableCell>
                        <TableCell>
                          {address}
                        </TableCell>
                        <TableCell>
                          {subdomainName}
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table >
          ): (
            <p className="text-center py-10">No Data Found.</p>
          )
        }
      </div>
    </div >
  )
}

export default Organizations;
