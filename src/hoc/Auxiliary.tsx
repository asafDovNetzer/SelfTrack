import { ReactNode } from "react";

const Auxiliary = ({ children }: { children: ReactNode }) =>
  children as unknown as JSX.Element;
// const Auxiliary: React.FC = (props) => props.children;

export default Auxiliary;
