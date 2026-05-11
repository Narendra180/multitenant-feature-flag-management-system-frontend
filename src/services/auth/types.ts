type LoginMutationReqBody = {
  email: string;
  password: string;
}

type SignupMutationReqBody = {
  email: string;
  password: string;
}

type MeQueryResBody = {
  email: string;
  userId: string;
  roles: string[];
  organizationSubdomain: string;
  organizationId: string;
}


export type {
  LoginMutationReqBody,
  SignupMutationReqBody,
  MeQueryResBody
}
