import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react/cjs/react.development";
import JournalRepository from "../../repositories/JournalRepository";
import TransactionRepository from "../../repositories/TransactionRepository";
import { simpleArraySum, humanDate, toCurrency, humanDate2 } from "../Settings";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
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
  const { journalId } = useParams();
  const [form, setForm] = useState({});
  const [journalTransactions, setJournalTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const history = useHistory();
  const rows = journalTransactions.map((journalTransaction) => {
    return {
      id: journalTransaction.transaction.id,
      date: `${humanDate(journalTransaction.transaction)}`,
      description: `${journalTransaction.transaction.description}`,
      amount: `${toCurrency(journalTransaction.transaction.amount)}`,
      type: `${journalTransaction.type.name}`,
    };
  });
  
  useEffect(() => {
    TransactionRepository.getAllTypes().then((data) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    JournalRepository.getJournalTransactionsbyId(journalId).then((data) => {
      setJournalTransactions(data);
    });
  }, [journalId]);

  useEffect(() => {
    JournalRepository.getJournalById(journalId).then((data) => {
      setForm(data);
    });
  }, [journalId]);

  const sendUpdatedJournal = (event) => {
    event.preventDefault();
    const updatedJournal = {
      userId: parseInt(localStorage.getItem("kakeibo-user")),
      startDate: form.startDate,
      endDate: form.endDate,
      have: form.have,
      save: form.save,
      spend: form.spend,
      reflection: form.reflection,
      id: journalId,
    };
    JournalRepository.updateJournal(updatedJournal).then(() => {
      history.push(`/journalList/journalDetail/${journalId}`);
    });
  };

  return (
    <>
      <div className="journal-detail">
        <h2>
          Edit journal for {humanDate2(form.startDate)} through{" "}
          {humanDate2(form.endDate)}{" "}
        </h2>
      </div>
      <div className="journal-detail-boxes">
        <Box
          sx={{
            width: 775,
            height: 525,
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
            height: 525,
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
          <form className="journal_form">
        <fieldset className="journal_form_fields">
          <label>How much money do you have?{" "}
          <input className="journal_number_input_box"
            id="have_field"
            type="number"
            value={parseFloat(form.have).toFixed(2)}
            onChange={(event) => {
              let copy = { ...form };
              copy.have = parseFloat(event.target.value);
              setForm(copy);
            }}
          /></label>
          <label>How much would you have liked to save?{" "}
          <input className="journal_number_input_box"
            id="save_field"
            type="number"
            value={parseFloat(form.save).toFixed(2)}
            onChange={(event) => {
              let copy = { ...form };
              copy.save = parseFloat(event.target.value);
              setForm(copy);
            }}
          /></label>
          <label className="journal-input-page-break">
            Did you spend more or less than what you planned on, why?
          </label>
          <textarea className="editJournal_text_input_box"
            id="spend_field"
            type="text"
            value={form.spend}
            onChange={(event) => {
              let copy = { ...form };
              copy.spend = event.target.value;
              setForm(copy);
            }}
          />
          <label>
            What are you happy about in this snapshot? What can you improve?
          </label>
          <textarea  className="editJournal_text_input_box"
            id="reflection_field"
            type="text"
            value={form.reflection}
            onChange={(event) => {
              let copy = { ...form };
              copy.reflection = event.target.value;
              setForm(copy);
            }}
          />
        </fieldset>
        
      </form>
      <div className="buttonContainer">
        <Button variant="contained" color="success"
          onClick={(event) => {
            sendUpdatedJournal(event);
          }}
        >
          Update Journal
        </Button>
      </div>
          </Box>
      </div>
    </>
  );
};

{/* <h2>Journal for {formattedDate(form.startDate)} through {formattedDate(form.endDate)} </h2>
      <ul className="journal_transaction-table">
        {journalTransactions.map((journalTransaction) => {
          return (
            <li key={journalTransaction.transaction.id}>
              Date: {humanDate(journalTransaction.transaction)} Description:{" "}
              {journalTransaction.transaction.description} Amount:{" "}
              {journalTransaction.transaction.amount.toFixed(2)}{" "}
              {journalTransaction.type.name}
            </li>
          );
        })}
      </ul>
      <div className="category totals">Category totals</div>
      {types.map((type) => {
        const typeTransactions = journalTransactions.filter(
          (transaction) => transaction.typeId === type.id
        );
        const typeTotal = typeTransactions.map(
          (typeTransaction) => typeTransaction.transaction.amount
        );

        return (
          <div key={type.id}>
            {type.name} total: ${simpleArraySum(typeTotal)}
          </div>
        );
      })}
      <form className="journal_form">
        <fieldset className="journal_form_fields">
          <label>How much money do you have?</label>
          <input
            id="have_field"
            type="number"
            
          />
          <label>How much would you have liked to save?</label>
          <input
            id="save_field"
            type="number"
           
          />
          <label>
            Did you spend more or less than what you planned on, why?
          </label>
          <input
            id="spend_field"
            type="text"
            
          />
          <label>
            What are you happy about in this snapshot? What can you improve?
          </label>
          <input
            id="reflection_field"
            type="text"
            
          />
        </fieldset>
        <button
          onClick={(event) => {
           ;
          }}
        >
          Update Journal
        </button>
      </form> */}