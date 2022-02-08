import { React, useState, useEffect } from "react";
import JournalRepository from "../../repositories/JournalRepository";
import {  humanDate2 } from "../Settings";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const columns = [
  {
    field: "dateRange",
    headerName: "Date Range",
    width: 200,
  },
  {
    field: "have",
    headerName: "How much you have",
    type: "number",
    width: 200,
  },
  { field: "save", headerName: "Want to save", type: "number", width: 200 },
  { field: "reflection", headerName: "Reflections", type: "text", width: 835 },
];
export default () => {
  const [journals, setJournals] = useState([]);
  const [reset, syncList] = useState([]);
  const [selectedJournals, setSelectedJournals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    JournalRepository.getUserJournals().then((data) => {
      setJournals(data);
    });
  }, [reset]);
  const killJournal = (id) => {
    JournalRepository.deleteJournal(id);
  };
  const toCurrency = (number) => {
    return `$${number.toFixed(2)}`;
  };
  const rows = journals.map((journal) => {
    return {
      id: journal.id,
      dateRange: `${humanDate2(journal.startDate)} - ${humanDate2(
        journal.endDate
      )}`,
      have: `${toCurrency(journal.have)}`,
      save: `${toCurrency(journal.save)}`,
      reflection: `${journal.reflection}`,
    };
  });
  const editJournalId = (event) => {
    if (selectedJournals.length > 1 || selectedJournals.length === 0) {
      return window.alert("Please select ONE transaction to edit");
    } else {
      return history.push(`/journalList/editJournal/${selectedJournals[0]}`);
    }
  };
  const detailJournalId = (event) => {
    if (selectedJournals.length > 1 || selectedJournals.length === 0) {
      return window.alert("Please select ONE transaction to edit");
    } else {
      return history.push(`/journalList/journalDetail/${selectedJournals[0]}`);
    }
  };

  const deleteSelectedJournals = (event) => {
    event.preventDefault();
    selectedJournals.map((journal) => {
      return killJournal(journal);
    });
    syncList(reset + 1);
  };

  return (
    <>
      <div className="datagrid-table">
        <div className="datagrid_object" style={{ height: 600, width: 1500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
            checkboxSelection
            onSelectionModelChange={(itm) => {
              setSelectedJournals(itm);
            }}
          />
        </div>
      </div>
      <div className="transactionList-buttons">
        <Button
          sx={{ marginRight: 5, marginTop: 1 }}
          variant="contained"
          color="success"
          onClick={(event) => {
            editJournalId(event);
          }}
        >
          Edit Journal
        </Button>
        <Button
          sx={{ marginLeft: 5, marginRight: 5, marginTop: 1 }}
          variant="contained"
          color="success"
          onClick={(event) => {
            detailJournalId(event);
          }}
        >
          Journal Detail
        </Button>
        <Button
          sx={{ marginLeft: 5, marginTop: 1 }}
          variant="contained"
          color="success"
          onClick={(event) => {
            deleteSelectedJournals(event);
          }}
        >
          Delete Selected
        </Button>
      </div>
    </>
  );
};
