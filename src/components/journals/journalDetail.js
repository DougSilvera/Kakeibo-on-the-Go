import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalRepository from "../../repositories/JournalRepository";
import TransactionRepository from "../../repositories/TransactionRepository";
import { humanDate, humanDate2, simpleArraySum } from "../Settings";
import { Box } from "@mui/material";
import "./journals.css";
import { DataGrid } from "@mui/x-data-grid";
import backgroundImage from "./backgroundPaper.jpg"
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
  const { journalId } = useParams();
  const [journal, setJournal] = useState({});
  const [journalTransactions, setJournalTransactions] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    JournalRepository.getJournalById(journalId).then((data) => {
      setJournal(data);
    });
  }, []);

  useEffect(() => {
    JournalRepository.getJournalTransactionsbyId(journalId).then((data) => {
      setJournalTransactions(data);
    });
  }, []);

  useEffect(() => {
    TransactionRepository.getAllTypes().then((data) => {
      setTypes(data);
    });
  }, []);
  const toCurrency = (number) => {
    return `$${parseFloat(number).toFixed(2)}`;
  };
  const rows = journalTransactions.map((journalTransaction) => {
    return {
      id: journalTransaction.transaction.id,
      date: `${humanDate(journalTransaction.transaction)}`,
      description: `${journalTransaction.transaction.description}`,
      amount: `${toCurrency(journalTransaction.transaction.amount)}`,
      type: `${journalTransaction.type.name}`,
    };
  });
  return (
    <>
      <div className="journal-detail">
        <h2>
          Journal page for {humanDate2(journal.startDate)} through{" "}
          {humanDate2(journal.endDate)}{" "}
        </h2>
      </div>
      <div className="journal-detail-boxes">
        <Box
          sx={{
            width: 775,
            height: 500,
            marginRight: 5,
            padding: 5,
            background: "#fff4d2",
          }}
        >
          <div className="journal-detail-category-header">
            <div style={{ fontWeight: "bold" }} className="category-totals">
              Journal Transactions
            </div>
          </div>
          <div className="journal-detail-category-totals"></div>
          <div className="datagrid-object-container">
            <div
              className="datagrid_object"
              style={{ height: 475, width: 700 }}
            >
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </Box>
        <Box
          sx={{
            width: 775,
            height: 500,
            marginLeft: 5,
            padding: 5,
            background: "#fff4d2",
          }}
        >
          <div className="journal-detail-category-header">
            <div style={{ fontWeight: "bold" }} className="category-totals">
              Category totals
            </div>
          </div>
          <div className="journal-detail-category-totals">
            {types.map((type) => {
              const typeTransactions = journalTransactions.filter(
                (transaction) => transaction.typeId === type.id
              );
              const typeTotal = typeTransactions.map(
                (typeTransaction) => typeTransaction.transaction.amount
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
          <div className="journal-detail-entry">
            <h3>Journal entry</h3>
            <div
              style={{ fontWeight: "bold" }}
              className="journal-detail-entry-line"
            >
              How much money do you have?
            </div>{" "}
            <div className="journal-detail-entry-line">
              ${parseFloat(journal.have).toFixed(2)}
            </div>
            <div
              style={{ fontWeight: "bold" }}
              className="journal-detail-entry-line"
            >
              How much would you have liked to save?
            </div>{" "}
            <div className="journal-detail-entry-line">
              ${parseFloat(journal.save).toFixed(2)}{" "}
            </div>
            <div
              style={{ fontWeight: "bold" }}
              className="journal-detail-entry-line"
            >
              Did you spend more or less than planned?
            </div>{" "}
            <div className="journal-detail-entry-line"> {journal.spend} </div>
            <div
              style={{ fontWeight: "bold" }}
              className="journal-detail-entry-line"
            >
              What are you happy with? What can you improve?
            </div>{" "}
            <div className="journal-detail-entry-line">
              {journal.reflection}{" "}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};
