import React, { useCallback, useState, useEffect, useContext } from "react";
import DateContext from "../../Context/DateContext";

const Watch: React.FC = React.memo(() => {
  const [time, setTime] = useState<string>(``);
  const [dateString, setDateString] = useState<string>(``);

  const date: Date | null = useContext(DateContext);

  const tick = useCallback(() => {
    const now: number = Date.now();

    const timeUTC: Date = new Date(now);

    const seconds: string = timeUTC.getSeconds().toString().padStart(2, `0`);
    const minutes: string = timeUTC.getMinutes().toString().padStart(2, `0`);
    const hours: string = timeUTC.getHours().toString().padStart(2, `0`);

    const outputString = `${hours}:${minutes}:${seconds}`;

    setTime(outputString);
  }, []);

  useEffect(() => {
    if (!date) return;
    const dateString: string = date.toDateString();
    setDateString(dateString);
  }, [date]);

  useEffect(() => {
    const interval = setInterval(function () {
      tick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [tick]);

  return (
    <div style={{ display: `flex`, flexDirection: `row`, margin: `0px 10px` }}>
      <h5
        style={{
          marginRight: `30px`,
          fontFamily: "arial",
          fontWeight: "lighter",
        }}
      >
        {time}
      </h5>
      <h5>{dateString}</h5>
    </div>
  );
});

export default Watch;
