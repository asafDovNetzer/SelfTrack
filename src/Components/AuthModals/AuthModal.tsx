import React, { useEffect, useState } from "react";
import classes from "./AuthModal.module.css";
import SignUpModal from "../../Components/AuthModals/SignUpModal/SignUpModal";
import LoginModal from "../../Components/AuthModals/LoginModal/LoginModal";
import RecoverModal from "../../Components/AuthModals/LoginModal/RecoverModal";

const AuthModal = (props: Props) => {
  const [slide, setSlide] = useState<number>(0);

  useEffect(() => {
    setSlide(props.slide);
  }, [props]);

  return (
    <div className={classes.UserWide}>
      <div className={classes.UserNarrow}>
        <div
          className={classes.SlideBoard}
          style={{ transform: `translateX(-${slide}px)` }}
        >
          <SignUpModal onSwitch={() => setSlide(500)} />
          <LoginModal onSwitch={() => setSlide(0)} onRecover={() => setSlide(1000)} />
          <RecoverModal onSwitch={() => setSlide(500)} />
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state: State) => ({
//   user: state.user,
// });

// const connector = connect(mapStateToProps);

type Props = {
  slide: number;
};

export default AuthModal;
