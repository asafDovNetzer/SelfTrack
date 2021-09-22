import React, { useState, useContext } from "react";
import TrackersFormModal from "../../Components/TrackersForm/TrackersFormModal";
import SurveyFormModal from "../../Components/SurveyForm/SurveyForm";
import classes from "./Trackers.module.css";
import StopwatchElement from "../../Components/Tracker/Stopwatch/Stopwatch";
import RaterElement from "../../Components/Tracker/Rater/Rater";
import CheckerElement from "../../Components/Tracker/Checker/Checker";
import CounterElement from "../../Components/Tracker/Counter/Counter";
import * as types from "../../Types";
import Aux from "../../hoc/Auxiliary";
import { deleteTracker } from "../../HalperFunctions/CreateTrackers";
import DatePicker from "react-date-picker";
import DateContext from "../../Context/DateContext";
import DbContext from "../../Context/DbContext";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { useEffect } from "react";

// import Surveys from "../../Components/Surveys/Surveys";

const Trackers: React.FC<{
  stopwatches: types.StopwatchType[];
  raters: types.RaterType[];
  checkers: types.CheckerType[];
  counters: types.CounterType[];
}> = React.memo(({ stopwatches, raters, checkers, counters }) => {
  const [modalTrackerDisplay, setModalTrackerDisplay] =
    useState<boolean>(false);
  const [modalSurveyDisplay, setModalSurveyDisplay] = useState<boolean>(false);
  const todaysDate = useContext(DateContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const [type, setType] = useState<string>(``);
  const [selected, setSelected] = useState<types.Tracker | null>(null);
  const [date, setDate] = useState<Date>(todaysDate!);

  const userDb = useContext(DbContext);

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

  return (
    <Aux>
      <div className={classes.ControlPanel}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          New
        </Button>
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
        </Menu>
        <Button onClick={handleEdit} disabled={!selected}>
          Edit
        </Button>
        <Button onClick={handleDelete} disabled={!selected}>
          Delete
        </Button>
        <DatePicker
          maxDate={todaysDate!}
          value={date}
          locale="en-EN"
          onChange={setDate}
          clearIcon={null}
        />
      </div>
      <div className={classes.Trackers}>
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
        <TrackersFormModal
          selected={selected}
          show={modalTrackerDisplay}
          closeHandler={handleClose}
          type={type}
        />
        <SurveyFormModal
          show={modalSurveyDisplay}
          closeHandler={() => setModalSurveyDisplay(false)}
          checkers={checkers}
          raters={raters}
        />
      </div>
    </Aux>
  );
});

export default Trackers;
