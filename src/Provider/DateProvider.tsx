import { useEffect, useState } from "react";
import DateContext from "../Context/DateContext";
import { calcEndOfDay } from "../HalperFunctions/General";
// import { auth, db } from "../Firebase";
// import * as types from "../Types";

const DateProvider: React.FC = ({ children }) => {
  const [date, setDate] = useState<Date | null>(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate()
    )
  );

  useEffect(() => {
    const endOfDay: number = calcEndOfDay();

    const milliSecs: number = endOfDay - Date.now();

    setTimeout(() => {
      setDate(
        new Date(
          new Date(Date.now()).getFullYear(),
          new Date(Date.now()).getMonth(),
          new Date(Date.now()).getDate()
        )
      );
    }, milliSecs);
  }, [date]);

  return <DateContext.Provider value={date}>{children}</DateContext.Provider>;
};

export default DateProvider;
