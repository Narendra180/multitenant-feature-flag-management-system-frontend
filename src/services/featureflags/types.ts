type FeatureFlag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  organizationId: string;
  isEnabled: boolean;
}

type CreateFeatureFlagReqBody = {
  key: string;
  isEnabled: boolean;
}

type EditFeatureFlagReqBody = {
  id: string;
  enabled: boolean;
}

type DeleteFeatureFlagReqBody = {
  id: string;
}

type GetFeatureFlagByKeyReqBody = {
  name: string;
}

export type {
  FeatureFlag,
  CreateFeatureFlagReqBody,
  EditFeatureFlagReqBody,
  DeleteFeatureFlagReqBody,
  GetFeatureFlagByKeyReqBody
}
