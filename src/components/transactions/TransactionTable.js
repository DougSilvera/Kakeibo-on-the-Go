import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { humanDate } from "../Settings";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
const columns = [
  { field: "date", headername: "Date", width: 100 },
  {
    field: "description",
    headername: "Description",
    sortable: false,
    width: 300,
  },
  { field: "amount", headername: "Amount", type: "currency", width: 100 },
  { field: "type", headername: "Transaction Type", width: 100 },
];

export default ({
  transactions,
  killTransaction,
  syncTransactions,
  renderTransactions,
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const history = useHistory();

  const deleteSelectedTransaction = (event) => {
    event.preventDefault();
    selectedTransactions.map((transaction) => {
      return killTransaction(transaction);
    });
    syncTransactions(renderTransactions + 1);
  };

  const toCurrency = (number) => {
    return `$${number.toFixed(2)}`;
  };
  const editTransactionId = (event) => {
    if (selectedTransactions.length > 1 || selectedTransactions.length === 0) {
      return window.alert("Please select ONE transaction to edit");
    } else {
      return history.push(`editTransaction/${selectedTransactions[0]}`);
    }
  };
  const rows = transactions.map((transaction) => {
    return {
      id: transaction.id,
      date: `${humanDate(transaction)}`,
      description: `${transaction.description}`,
      amount: `${toCurrency(transaction.amount)}`,
      type: `${transaction.type.name}`,
    };
  });

  return (
    <>
      {" "}
      <div className="transactionList-buttons">
        <Button
          obj
          sx={{ marginRight: 5 }}
          variant="contained"
          color="success"
          onClick={(event) => {
            deleteSelectedTransaction(event);
          }}
        >
          Delete Selected
        </Button>
        <Button
          obj
          sx={{ marginRight: 5 }}
          variant="contained"
          color="success"
          onClick={(event) => {
            editTransactionId(event);
          }}
        >
          Edit Selected
        </Button>
      </div>
      <div className="datagrid-table">
        <div className="datagrid_object" style={{ height: 450, width: 700 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25]}
            checkboxSelection
            onSelectionModelChange={(itm) => {
              setSelectedTransactions(itm);
            }}
          />
        </div>
      </div>
    </>
  );
};