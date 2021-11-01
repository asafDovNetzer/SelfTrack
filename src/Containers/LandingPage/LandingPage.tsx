import React from "react";
import classes from "./LandingPage.module.css";
import Footer from "../../Components/Footer/Footer";
import Slider from "../../Components/Slider/Slider";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../Types";
import FirstView from "../../Components/FirstView/FirstView";
import Modal from "../../Components/UI/Modal/Modal";
import AuthModal from "../../Components/AuthModals/AuthModal";
import SecondView from "../../Components/SecondView/SecondView";
import ZeroView from "../../Components/ZeroView/ZeroView";

const LandingPage = (props: Props) => {
  const [displayUserModal, setDisplayUserModal] =
    React.useState<boolean>(false);
  const [slide, setSlide] = React.useState<number>(500);

  const handleButton = () => {
    if (props.user) {
      window.location.href = `/app`;
    } else {
      if (window.innerWidth > 500) {
        setSlide(500);
        setDisplayUserModal(true);
      } else {
        window.location.href = `/login`;
      }
    }
  };

  return (
    <div className={`${classes.LandingPage} landing`}>
      <ZeroView onClick={handleButton} />
      <FirstView />
      <SecondView />
      <Slider />
      {window.innerWidth > 500 ? <Footer /> : null}
      <Modal
        show={displayUserModal && !props.user}
        onHide={() => setDisplayUserModal(false)}
      >
        <AuthModal slide={slide} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

export default connector(LandingPage);
