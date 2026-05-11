import { ReactNode } from "react";

type WrapperCompProps = {
  children: ReactNode;
}

const WrapperComp = ({
  children
}: WrapperCompProps) => {
  return children;
}

export {
  WrapperComp
};

