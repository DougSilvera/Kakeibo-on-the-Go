import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { humanDate, toCurrency } from "../Settings";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "date", headerName: "Date", width: 100 },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 700,
  },
  { field: "amount", headerName: "Amount", type: "currency", width: 100 },
  { field: "type", headerName: "Category", width: 100 },
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
          sx={{ marginLeft: 5 }}
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
        <div className="datagrid_object" style={{ height: 425, width: 1100 }}>
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
