import React from "react";
import classes from "./RangeSelector.module.css";
// import { Tabs, Tab } from "react-bootstrap";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
// import { StopwatchType } from "../../../../Types";

const RangeSelector: React.FC<{
  dateRange: Date[];
  setDateRange: (Dates: Date[]) => void;
  todaysDate: Date;
}> = React.memo(({ dateRange, setDateRange, todaysDate }) => {
  return (
    <div className={classes.Selector} style={{ zIndex: 10000 }}>
      <DateRangePicker
        value={dateRange}
        maxDate={todaysDate}
        locale="en-EN"
        onChange={setDateRange}
        clearIcon={null}
        className={classes.Calender}
      />
    </div>
  );
});

export default RangeSelector;
