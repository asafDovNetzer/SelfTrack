import { ReactNode } from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./Modal.module.css";

const Modal = (props: Props) => {
  const handleHide = (event: any) => {
    if (!!event.target.closest(`.modalclass`)) return;
    props.onHide();
  };

  return (
    <div
      style={{ display: props.show ? `unset` : `none` }}
      onClick={handleHide}
      className={classes.Backdrop}
    >
      <div className={`${classes.Modal}     modalclass`}>
        <button className={classes.Button} onClick={() => props.onHide()}>
          <svg width="24" height="24" fill="currentColor">
            <use href={`${icons}#x`} />
          </svg>
        </button>
        {props.children as unknown as JSX.Element}
      </div>
    </div>
  );
};

type Props = { children: ReactNode } & {
  show: boolean;
  onHide: () => void;
};

export default Modal;
