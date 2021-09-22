import React from "react";
import { useEffect, useState, useContext } from "react";
import * as types from "../../../Types";
import DbContext from "../../../Context/DbContext";
import DateContext from "../../../Context/DateContext";
import { db } from "../../../Firebase";
import classes from "./StopwatchEntries.module.css";
// import Entry from "./StopwatchEntry/StopwatchEntry";
import { Modal } from "react-bootstrap";
import BarChartPreamp from "../../Charts/BarChart/BarChartPreAmp";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { ButtonGroup, Button } from "@material-ui/core";
import { rawEntriesToPairs } from "../../../HalperFunctions/ArrangeEntries";
import {
  absoluteTimestampToString,
  reletiveTimestampToString,
} from "../../../HalperFunctions/HandleStopwatches";
import EntryEditModal from "../EntryEditModal/EntryEditModal";

const Entries: React.FC<{
  show: boolean;
  entries: types.StopwatchEntry[];
  stopwatch: types.StopwatchType;
  date: Date;
  closeHandler: () => void;
}> = React.memo(({ entries, stopwatch, date, show, closeHandler }) => {
  const [arrangedEntries, setArrangedEntries] = useState<types.ArrangedEntries>(
    []
  );
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const [modalDisplay, setModalDisplay] = useState<boolean>(false);

  const [EntryToEdit, setEntryToEdit] = useState<types.CompleteEntry | null>(
    null
  );
  const todaysDate = useContext(DateContext);

  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Index",
      width: 30,
      sortable: false,
      filterable: false,
    },
    {
      field: "from",
      headerName: "From",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "to",
      headerName: "To",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "subTotal",
      headerName: "Sub-Total",
      width: 120,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];

  // console.log(`rendering stopwatch entries`);

  const userDb = useContext(DbContext);

  useEffect(() => {
    if (!entries.length) {
      setArrangedEntries([]);
      setRows([]);
      return;
    }
    const pairs = rawEntriesToPairs(entries, stopwatch.id, todaysDate!, date);
    setArrangedEntries(pairs);
    setRows(
      pairs.map((pair, index) => {
        if (!!pair.to.timestamp) {
          return {
            id: pairs.length - index,
            from: absoluteTimestampToString(pair.from.timestamp),
            to: absoluteTimestampToString(pair.to.timestamp),
            subTotal: reletiveTimestampToString(pair.subTotal),
            total: reletiveTimestampToString(pair.total),
          };
        } else {
          return {
            id: pairs.length - index,
            from: absoluteTimestampToString(pair.from.timestamp),
            to: `now`,
            subTotal: `--:--:--`,
            total: `--:--:--`,
          };
        }
      })
    );
  }, [entries, stopwatch, todaysDate, date]);

  const deleteHandler = () => {
    const realIndex: number =
      arrangedEntries.length - (selectionModel[0] as number);

    const entriesIds: string[] = [];
    entriesIds.push(arrangedEntries[realIndex].from.id);

    if (!!arrangedEntries[realIndex].to.id) {
      entriesIds.push(arrangedEntries[realIndex].to!.id);
    }

    const batch: types.Batch = db.batch();

    entriesIds.forEach((id) => {
      const ref = userDb!.collection(`entries`).doc(id);

      batch.delete(ref);
    });

    batch
      .commit()
      .then(() => {
        console.log(`deleted`);
        setSelectionModel([]);
      })
      .catch((err: any) => console.log(err));
  };

  const editHandler = (batch: types.Batch) => {
    console.log(batch);

    batch
      .commit()
      .then(() => {
        console.log(`we did it!`);
        setModalDisplay(false);
      })
      .catch((err: any) => {
        if (err) console.log(`try again`, err);
      });
  };

  const newEntryHandler = (timestamp: number) => {
    userDb!
      .collection(`entries`)
      .add({
        timestamp: timestamp,
        trackerId: stopwatch.id,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        type: `stopwatchEntry`,
      })
      .then(() => {})
      .catch((err: any) => console.log(err));
  };

  const newEntryHandler1 = (from: number, to: number) => {
    let fromSuccess: boolean = false;
    let toSuccess: boolean = false;

    userDb!
      .collection(`entries`)
      .add({
        timestamp: from,
        trackerId: stopwatch.id,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        type: `stopwatchEntry`,
      })
      .then(() => {
        fromSuccess = true;
        if (toSuccess) {
          setModalDisplay(false);
        }
      })
      .catch((err: any) => console.log(err));

    userDb!
      .collection(`entries`)
      .add({
        timestamp: to,
        trackerId: stopwatch.id,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        type: `stopwatchEntry`,
      })
      .then(() => {
        toSuccess = true;
        if (fromSuccess) {
          setModalDisplay(false);
        }
      })
      .catch((err: any) => console.log(err));
  };

  const handleOpen = () => {
    const realIndex: number =
      arrangedEntries.length - (selectionModel[0] as number);
    setEntryToEdit(arrangedEntries[realIndex] as types.CompleteEntry);
    setModalDisplay(true);
  };

  const handleClose = () => {
    setModalDisplay(false);
  };

  const addNewEntry = () => {
    if (!!arrangedEntries[0] && arrangedEntries[0].to.timestamp === 0) return;

    // console.log(`new`);
    const startOfDay: number = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const endOfDay: number =
      date.getTime() !== todaysDate!.getTime()
        ? new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
          ).getTime()
        : Date.now();

    const from: number = !!arrangedEntries[0]
      ? arrangedEntries[0].to.timestamp
      : startOfDay;

    const entryToEdit: types.CompleteEntry = {
      stopwatchId: stopwatch.id,
      from: {
        timestamp: from,
        id: ``,
        limit: from,
      },
      to: {
        timestamp: from,
        id: ``,
        limit: endOfDay,
      },
      subTotal: 0,
      total: 0,
      index: 0,
    };

    setEntryToEdit(entryToEdit);
    setModalDisplay(true);
  };

  return (
    <Modal size="xl" show={show} onHide={closeHandler}>
      <Modal.Header>
        <BarChartPreamp entries={entries} stopwatch={stopwatch} date={date} />
      </Modal.Header>
      <Modal.Body>
        <div className={classes.Entries}>
          <ButtonGroup variant="text" color="primary">
            <Button
              disabled={selectionModel.length !== 1}
              onClick={deleteHandler}
            >
              Delete
            </Button>
            <Button disabled={selectionModel.length !== 1} onClick={handleOpen}>
              Edit
            </Button>
            <Button
              onClick={addNewEntry}
              disabled={
                !!arrangedEntries[0] && arrangedEntries[0].to.timestamp === 0
              }
            >
              New Entry
            </Button>
          </ButtonGroup>
          <DataGrid
            rows={rows}
            rowHeight={30}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            // disableColumnFilter
            // disableColumnMenu
            headerHeight={40}
          />
          <EntryEditModal
            show={modalDisplay}
            entry={EntryToEdit}
            closeHandler={handleClose}
            newEntryHandler={newEntryHandler}
            editHandler={editHandler}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default Entries;
