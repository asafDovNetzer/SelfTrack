import React, { useState, useContext } from "react";
import TrackersForm from "../../Components/TrackersForm/TrackersForm";
import SurveyFormModal from "../../Components/SurveyForm/SurveyForm";
import classes from "./Trackers.module.css";
import StopwatchElement from "../../Components/Tracker/Stopwatch/Stopwatch";
import RaterElement from "../../Components/Tracker/Rater/Rater";
import CheckerElement from "../../Components/Tracker/Checker/Checker";
import CounterElement from "../../Components/Tracker/Counter/Counter";
import * as types from "../../Types";
// import Aux from "../../hoc/Auxiliary";
import { deleteTracker } from "../../HalperFunctions/CreateTrackers";
import DatePicker from "react-date-picker";
import DateContext from "../../Context/DateContext";
import DbContext from "../../Context/DbContext";
import { Menu, MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import NewUserGuide from "../../Components/NewUserGuide/NewUserGuide";
// import Surveys from "../../Components/Surveys/Surveys";

const Trackers: React.FC<{
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
  higherIsEmpty: boolean;
}> = React.memo(
  ({ stopwatches, raters, checkers, counters, higherIsEmpty }) => {
    const [modalTrackerDisplay, setModalTrackerDisplay] =
      useState<boolean>(false);
    const [modalSurveyDisplay, setModalSurveyDisplay] =
      useState<boolean>(false);
    const todaysDate = useContext(DateContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const [type, setType] = useState<string>(``);
    const [selected, setSelected] = useState<types.Tracker | null>(null);
    const [date, setDate] = useState<Date>(todaysDate!);

    const userDb = useContext(DbContext);

    useEffect(() => {
      if (higherIsEmpty) {
        setIsEmpty(true);
        console.log(`is empty`);
      }
    }, [higherIsEmpty]);

    useEffect(() => {
      if (!todaysDate) return;
      setDate(todaysDate!);
    }, [todaysDate]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setDisplayMenu(true);
    };

    const handleChoose = (event: any) => {
      const type: string = event.target!.outerText.toLowerCase();

      if (type === `not sure?`) {
        console.log(`not sure`);
        setIsEmpty(true);
        setDisplayMenu(false);
        return;
      }
      console.log(`sure`);
      setDisplayMenu(false);
      setType(type);
      setSelected(null);
      setModalTrackerDisplay(true);
    };

    const handleClose = () => {
      setModalTrackerDisplay(false);
    };

    const handleDelete = () => {
      deleteTracker(userDb!, selected!);
      setSelected(null);
    };

    const selectHandler = (id: string) => {
      if (id === selected?.id) {
        setSelected(null);
        return;
      }
      const trackers: types.Tracker[] = [
        ...stopwatches,
        ...counters,
        ...raters,
        ...checkers,
      ];
      const tracker: types.Tracker = trackers.filter(
        (tracker) => tracker.id === id
      )[0];
      setSelected(tracker);
      setType(tracker.type);
    };

    const handleEdit = () => {
      setModalTrackerDisplay(true);
    };

    const finishGuide = (type: string) => {
      setType(type);
      setIsEmpty(false);
      setModalTrackerDisplay(true);
    };

    return (
      <div className={classes.Trackers}>
        <div className={classes.Top}>
          <div className={classes.DatePicker}>
            <DatePicker
              maxDate={todaysDate!}
              value={date}
              locale="en-EN"
              onChange={setDate}
              clearIcon={null}
            />
          </div>
        </div>
        <div className={classes.Container}>
          {stopwatches.map((stopwatch) => (
            <StopwatchElement
              key={stopwatch.id}
              stopwatch={stopwatch}
              date={date}
              selector={selectHandler}
              isSelected={selected?.id === stopwatch.id}
            />
          ))}
          {raters.map((rater) => (
            <RaterElement
              isSelected={selected?.id === rater.id}
              key={rater.id}
              rater={rater}
              selector={selectHandler}
              date={date}
            />
          ))}
          {checkers.map((checker) => (
            <CheckerElement
              selector={selectHandler}
              isSelected={selected?.id === checker.id}
              key={checker.id}
              checker={checker}
              date={date}
            />
          ))}
          {counters.map((counter) => (
            <CounterElement
              key={counter.id}
              selector={selectHandler}
              isSelected={selected?.id === counter.id}
              counter={counter}
              date={date}
            />
          ))}
        </div>
        <div className={classes.ControlPanel}>
          <button className={classes.Button} onClick={handleClick}>
            New
          </button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={displayMenu}
            onClose={() => setDisplayMenu(false)}
          >
            <MenuItem onClick={handleChoose}>Stopwatch</MenuItem>
            <MenuItem onClick={handleChoose}>Checker</MenuItem>
            <MenuItem onClick={handleChoose}>Rater</MenuItem>
            <MenuItem onClick={handleChoose}>Counter</MenuItem>
            <MenuItem
              style={{ backgroundColor: `rgb(236, 54, 141)` }}
              onClick={handleChoose}
            >
              Not sure?
            </MenuItem>
          </Menu>
          <div></div>
          <button
            className={classes.Button}
            onClick={handleEdit}
            disabled={!selected}
          >
            Edit
          </button>
          <div></div>
          <button
            className={classes.Button}
            onClick={handleDelete}
            disabled={!selected}
          >
            Delete
          </button>
        </div>
        {modalTrackerDisplay ? (
          <Modal show={true} onHide={handleClose}>
            <TrackersForm
              onFinish={handleClose}
              selected={selected}
              type={type}
            />
          </Modal>
        ) : null}
        <SurveyFormModal
          show={modalSurveyDisplay}
          closeHandler={() => setModalSurveyDisplay(false)}
          checkers={checkers}
          raters={raters}
        />
        {isEmpty ? (
          <Modal show={true} onHide={() => {}}>
            <NewUserGuide
              onFinish={finishGuide}
              onClose={() => setIsEmpty(false)}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
);

export default Trackers;
