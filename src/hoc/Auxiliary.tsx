import { ReactNode } from "react";

const Auxiliary = ({ children }: { children: ReactNode }) =>
  children as unknown as JSX.Element;

export default Auxiliary;
