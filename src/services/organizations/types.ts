type Organization = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  subdomainName: string;
}

type CreateOrgReqBody = {
  name: string;
  address: string;
  subdomainName: string;
}

export type {
  Organization,
  CreateOrgReqBody
}
