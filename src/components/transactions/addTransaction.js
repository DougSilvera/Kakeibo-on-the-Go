import React, { useEffect, useState } from "react";
import "./transactions.css";
import TransactionRepository from "../../repositories/TransactionRepository";
import { toTimestamp } from "../Settings";

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
    <>
      <div className="add_transaction">
        <form name="add_transaction_form" className="add_transaction_form">
          <fieldset className="add_transaction_fields">
            <label id="label--login" htmlFor="date">
              {" "}
              Date{" "}
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              placeholder="Select Date"
              onChange={(event) => {
                const copy = { ...form };
                copy.timestamp = toTimestamp(event.target.value);
                updateForm(copy);
              }}
            />
            <label htmlFor="description"> Description </label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={(event) => {
                const copy = { ...form };
                copy.description = event.target.value;
                updateForm(copy);
              }}
            />
            <label htmlFor="amount"> Amount </label>
            <input
              type="number"
              id="amount"
              prefix="$"
              name="amount"
              className="form-control"
              placeholder="Amount"
              onChange={(event) => {
                const copy = { ...form };
                copy.amount = parseFloat(event.target.value);
                updateForm(copy);
              }}
            />
            <label htmlFor="category"> Category </label>
            <select
              className="form-control"
              id="typeId"
              onChange={(event) => {
                const copy = { ...form };
                copy.typeId = parseInt(event.target.value);
                updateForm(copy);
              }}
            >
              <option value="" className="form-control">
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
            <button
              id="submit_transaction"
              className="button"
              onClick={submitNewTransaction}
            >
              Submit Transaction
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
