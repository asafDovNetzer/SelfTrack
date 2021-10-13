import { ReactNode } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Footer from "../../Footer/Footer";
// import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props: Props) => {
  const handleHide = (event: any) => {
    if (!!event.target.closest(`.sideDrawerclass`)) return;
    props.onHide();
  };

  return (
    <Auxiliary>
      <div
        className={classes.Backdrop}
        style={{ display: props.show ? `unset` : `none` }}
        onClick={handleHide}
      ></div>
      <div
        className={`${classes.SideDrawer}     sideDrawerclass`}
        style={{ transform: props.show ? `unset` : "translateX(-100%)" }}
      >
        <div className={classes.Content}>
          {props.children as unknown as JSX.Element}
        </div>
        <Footer />
      </div>
    </Auxiliary>
  );
};

type Props = { children: ReactNode } & {
  show: boolean;
  onHide: () => void;
};

export default SideDrawer;
