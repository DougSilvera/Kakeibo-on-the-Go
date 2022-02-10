import React, { useState, useEffect } from "react";
import TransactionRepository from "../../repositories/TransactionRepository";
import "./analysis.css";
import {
  humanDate,
  toTimestamp,
  simpleArraySum,
  toCurrency,
} from "../Settings";
import NewJournalForm from "./NewJournalForm";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
const columns = [
  { field: "date", headerName: "Date", width: 100 },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 380,
  },
  { field: "amount", headerName: "Amount", type: "number", width: 100 },
  { field: "type", headerName: "Category", width: 100 },
];
export default () => {
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});
  const [filterReset, resetFilters] = useState({});
  const rows = transactions.map((transaction) => {
    return {
      id: transaction.id,
      date: `${humanDate(transaction)}`,
      description: `${transaction.description}`,
      amount: `${toCurrency(transaction.amount)}`,
      type: `${transaction.type.name}`,
    };
  });
  useEffect(() => {
    TransactionRepository.getAllTypes().then((data) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    TransactionRepository.getUserTransactions().then((data) => {
      setTransactions(data);
    });
  }, [filterReset]);

  const runFilters = (beginDate, endingDate, typefilterArray, event) => {
    event.preventDefault();
    TransactionRepository.getUserTransactions()
      .then((data) => {
        if (startDate.length > 0 || endDate.length > 0) {
          return dateFilter(beginDate, endingDate, data);
        } else {
          return data;
        }
      })
      .then((data) => {
        if (typefilterArray.length > 0) {
          return runTypeFilter(data, typefilterArray);
        } else {
          return data;
        }
      })
      .then((data) => {
        setTransactions(data);
      });
  };

  const selectTypeFilter = (selectedId) => {
    let copy = [...typeFilters];
    if (typeFilters.includes(selectedId)) {
      copy = copy.filter((Id) => Id !== selectedId);
      setTypeFilters(copy);
    } else {
      copy.push(selectedId);
      setTypeFilters(copy);
    }
  };
  const dateFilter = (startDateFilter, endDateFilter, data) => {
    let copy = data.filter((transaction) => {
      return transaction.timestamp >= startDateFilter;
    });
    let copy2 = copy.filter((transaction) => {
      return transaction.timestamp <= endDateFilter;
    });

    return copy2;
  };
  const runTypeFilter = (data, filterArray) => {
    let copy = filterArray.map((typeFilterId) => {
      return data.filter((transaction) => {
        return transaction.typeId === typeFilterId;
      });
    });
    var merged = [].concat.apply([], copy);
    return merged;
  };

  const targetStartDate = (date) => {
    setStartDate(toTimestamp(date));
  };
  const targetEndDate = (date) => {
    setEndDate(toTimestamp(date));
  };

  const resetAllFilters = (event) => {
  event.preventDefault()
  resetFilters(filterReset + 1)
  setTypeFilters("")
  document.getElementById("start_date").value=""
  document.getElementById("end_date").value=""
  
}

  return (
    <>
      <div className="analyze-boxes">
        <Box
          sx={{
            width: 775,
            height: 600,
            marginRight: 5,
            padding: 5,
            background: "#fff4d2",
          }}
        >
          <div className="transactionList-buttons">
            <Button
              sx={{ marginRight: 5 }}
              variant="contained"
              color="success"
              onClick={(event) => {
                runFilters(startDate, endDate, typeFilters, event);
              }}
            >
              Filter Transactions
            </Button>
            <Button
              sx={{ marginLeft: 5 }}
              variant="contained"
              color="success"
              onClick={(event) => {
                resetAllFilters(event)
              }}
            >
              Clear Filters
            </Button>
          </div>
          <form className="filter">
            <fieldset className="date_filter_field">
              <label>Start</label>
              <input
                type="date"
                id="start_date"
                placeholder="Select Date"
                onChange={(evt) => targetStartDate(evt.target.value)}
              />
              <label>End</label>
              <input
                type="date"
                id="end_date"
                placeholder="Select Date"
                onChange={(evt) => targetEndDate(evt.target.value)}
              />
            </fieldset>
            <div className="category-choices">
              {types.map((type) => {
                return (
                  <label className="category-choice" key={type.id} id={type.id}>
                    <input
                      type="checkbox"
                      key={type.id}
                      value={type.id}
                      onChange={() => selectTypeFilter(type.id)}
                      checked={typeFilters.includes(type.id) ? true : false}
                    />
                    {type.name}
                  </label>
                );
              })}
            </div>
          </form>
          <div className="datagrid-object-container">
            <div
              className="datagrid_object"
              style={{ height: 500, width: 700 }}
            >
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </Box>
        <Box
          sx={{
            width: 775,
            height: 600,
            marginRight: 5,
            padding: 5,
            background: "#fff4d2",
          }}
        >
          <div className="transaction-detail-category-header">
            <div style={{ fontWeight: "bold" }} className="category-totals">
              Category totals
            </div>
          </div>
          <div className="transaction-detail-category-totals">
            {types.map((type) => {
              const typeTransactions = transactions.filter(
                (transaction) => transaction.typeId === type.id
              );
              const typeTotal = typeTransactions.map(
                (typeTransaction) => typeTransaction.amount
              );

              return (
                <div key={`userobject-${type.id}`}>
                  <div style={{ fontWeight: "bold" }} key={type.id}>
                    {type.name}:
                  </div>
                  <div key={`userdata-${type.id}`}>
                    {" "}
                    ${parseFloat(simpleArraySum(typeTotal)).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <NewJournalForm
              transactions={transactions}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </Box>
      </div>
    </>
  );
};
