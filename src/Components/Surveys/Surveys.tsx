import React, { useEffect, useContext, useState } from "react";
import classes from "./Surveys.module.css";
import DbContext from "../../Context/DbContext";
import DateContext from "../../Context/DateContext";
import { Survey } from "../../Types";

const Surveys: React.FC<{}> = React.memo((props) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const todaysDate = useContext(DateContext);
  const userDb = useContext(DbContext);

  useEffect(() => {
    if (!userDb) return;

    userDb.collection(`surveys`).onSnapshot((snapshot: any) => {
      const newSurveys: Survey[] = [];

      snapshot.forEach((doc: any) => {
        newSurveys.push(doc.data());
      });

      setSurveys(newSurveys);
    });
  }, [userDb]);

  return (
    <div className={classes.Surveys}>
      {surveys.map((survey) => {
        return (
          <div onClick={() => {}} key={survey.name} className={classes.Survey}>
            <p>{survey.name} -</p>
            <p>
              {todaysDate!.getDate()}/{todaysDate!.getMonth()}/
              {todaysDate!.getFullYear().toString().slice(2, 4)}
            </p>
          </div>
        );
      })}
    </div>
  );
});

export default Surveys;
