import React, { useState, useContext } from "react";
import TrackersForm from "../../Components/TrackersForm/TrackersForm";
import SurveyFormModal from "../../Components/SurveyForm/SurveyForm";
import classes from "./Trackers.module.css";
import StopwatchElement from "../../Components/Tracker/Stopwatch/Stopwatch";
import RaterElement from "../../Components/Tracker/Rater/Rater";
import CheckerElement from "../../Components/Tracker/Checker/Checker";
import CounterElement from "../../Components/Tracker/Counter/Counter";
import * as types from "../../Types";
import DatePicker from "react-date-picker";
import DateContext from "../../Context/DateContext";
import { useEffect } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import NewTrackerGuide from "../../Components/NewTrackerGuide/NewTrackerGuide";
import NewTracker from "../../Components/NewTracker/NewTracker";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../Store/Actions/ActionsIndex";
import { State } from "../../Types";
import ExpandedTracker from "../../Components/Tracker/ExpandedTracker/ExpandedTracker";

const Trackers = React.memo((props: Props) => {
  const [modalTrackerDisplay, setModalTrackerDisplay] =
    useState<boolean>(false);
  const [modalSurveyDisplay, setModalSurveyDisplay] = useState<boolean>(false);
  const todaysDate = useContext(DateContext);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [displayNewTracker, setDisplayNewTracker] = useState<boolean>(false);

  const [type, setType] = useState<string>(``);
  const [selected, setSelected] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(todaysDate!);
  const [expandedModalDisplay, setExpandedModalDiaplay] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.higherIsEmpty) {
      setIsEmpty(true);
      console.log(`is empty`);
    }
  }, [props.higherIsEmpty]);

  useEffect(() => {
    if (!todaysDate) return;
    setDate(todaysDate!);
  }, [todaysDate]);

  const handleClose = () => {
    setModalTrackerDisplay(false);
  };

  const selectHandler = (id: string) => {
    setSelected(id);
    setExpandedModalDiaplay(true);
  };

  const finishGuide = (type: string) => {
    setType(type);
    setIsEmpty(false);
    setModalTrackerDisplay(true);
  };

  const openNewTracker = () => {
    setDisplayNewTracker(true);
  };

  const handleChooseType = (type: string) => {
    setDisplayNewTracker(false);
    setType(type);
    setSelected(null);
    setModalTrackerDisplay(true);
  };

  const handleNotSure = () => {
    setDisplayNewTracker(false);
    setIsEmpty(true);
  };

  const requestedHide = () => {
    props.setValidateModal(
      `You can always return to this guide through NEW TRACKER`,
      () => {
        setIsEmpty(false);
      }
    );
  };

  return (
    <div className={classes.Trackers}>
      <div className={classes.UpperContainer}>
        <div className={classes.DatePicker}>
          <DatePicker
            maxDate={todaysDate!}
            value={date}
            locale="en-EN"
            onChange={setDate}
            clearIcon={null}
          />
        </div>
        <div className={classes.Container}>
          <button onClick={openNewTracker} className={classes.NewTrackerButton}>
            NEW TRACKER
          </button>
          {props.stopwatches.map((stopwatch) => (
            <StopwatchElement
              key={stopwatch.id}
              stopwatch={stopwatch}
              date={date}
              selector={selectHandler}
            />
          ))}
          {props.raters.map((rater) => (
            <RaterElement
              key={rater.id}
              rater={rater}
              selector={selectHandler}
              date={date}
            />
          ))}
          {props.checkers.map((checker) => (
            <CheckerElement
              selector={selectHandler}
              key={checker.id}
              checker={checker}
              date={date}
            />
          ))}
          {props.counters.map((counter) => (
            <CounterElement
              key={counter.id}
              selector={selectHandler}
              counter={counter}
              date={date}
            />
          ))}
        </div>
      </div>
      {modalTrackerDisplay ? (
        <Modal show={true} onHide={handleClose}>
          <TrackersForm onFinish={handleClose} type={type} />
        </Modal>
      ) : null}
      <SurveyFormModal
        show={modalSurveyDisplay}
        closeHandler={() => setModalSurveyDisplay(false)}
        checkers={props.checkers}
        raters={props.raters}
      />
      <Modal show={isEmpty} onHide={requestedHide}>
        <NewTrackerGuide
          onFinish={finishGuide}
          onClose={() => setIsEmpty(false)}
        />
      </Modal>
      <Modal
        show={displayNewTracker}
        onHide={() => setDisplayNewTracker(false)}
      >
        <NewTracker onNext={handleChooseType} onNotSure={handleNotSure} />
      </Modal>
      {expandedModalDisplay ? (
        <Modal
          show={expandedModalDisplay}
          onHide={() => setExpandedModalDiaplay(false)}
        >
          <ExpandedTracker
            id={selected!}
            onClose={() => setExpandedModalDiaplay(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
});

const mapStateToProps = (state: State) => ({
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = {
  setValidateModal: (message: string, func: () => void) =>
    actions.setError(message, func),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
  higherIsEmpty: boolean;
};

export default connector(Trackers);
