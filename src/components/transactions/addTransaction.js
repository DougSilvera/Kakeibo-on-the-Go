import React, { useEffect, useState } from "react";
import "./transactions.css";
import TransactionRepository from "../../repositories/TransactionRepository";
import { toTimestamp } from "../Settings";
import { Button } from "@mui/material";

export default ({ syncTransactions }) => {
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [form, updateForm] = useState({});

  useEffect(() => {
    TransactionRepository.getAllTypes().then((data) => {
      setTransactionTypes(data);
    });
  }, []);

  const submitNewTransaction = (evt) => {
    if (
      (document.getElementById("date").value === "",
      document.getElementById("description").value === "",
      document.getElementById("amount").value === "",
      document.getElementById("typeId").value === "")
    ) {
      return window.alert("please complete all fields");
    } else {
      evt.preventDefault();
      const newTransaction = {
        userId: parseInt(localStorage.getItem("kakeibo-user")),
        timestamp: form.timestamp,
        description: form.description,
        amount: form.amount,
        typeId: form.typeId,
        isFixed: false,
      };
      TransactionRepository.postNewTransaction(newTransaction)
        .then((data) => {
          syncTransactions(data)
        })
        .then(() => {
          document.getElementById("date").value = "";
          document.getElementById("description").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("typeId").selectedIndex = "";
        });
    }
  };

  return (
    <div className="add-transaction-container">
        <h2 className="add-transaction-header">Add a New Transaction</h2>
      <div className="add_transaction">
        <form name="add_transaction_form" className="add_transaction_form">
          <fieldset className="add_transaction_fields">
            
            <input
              type="date"
              id="date"
              className="transaction-form-control"
              placeholder="Select Date"
              onChange={(event) => {
                const copy = { ...form };
                copy.timestamp = toTimestamp(event.target.value);
                updateForm(copy);
              }}
            />
           
            <input
              type="text"
              id="description"
              name="description"
              className="transaction-form-control"
              placeholder="Description"
              onChange={(event) => {
                const copy = { ...form };
                copy.description = event.target.value;
                updateForm(copy);
              }}
            />
           
            <input
              type="number"
              id="amount"
              prefix="$"
              name="amount"
              className="transaction-form-control"
              placeholder="Amount"
              onChange={(event) => {
                const copy = { ...form };
                copy.amount = parseFloat(event.target.value);
                updateForm(copy);
              }}
            />
           
            <select
              className="transaction-form-control"
              id="typeId"
              onChange={(event) => {
                const copy = { ...form };
                copy.typeId = parseInt(event.target.value);
                updateForm(copy);
              }}
            >
              <option value="" className="transaction-form-control">
                Choose category
              </option>
              {transactionTypes.map((typeObject) => {
                return (
                  <option
                    key={typeObject.id}
                    id="categoryId"
                    value={typeObject.id}
                  >
                    {typeObject.name}
                  </option>
                );
              })}
            </select>
            <Button variant="contained" color="success"
              id="submit_transaction"
              className="button"
              onClick={submitNewTransaction}
            >
              Submit Transaction
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
