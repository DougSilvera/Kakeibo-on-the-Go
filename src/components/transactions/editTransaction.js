import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toTimestamp, formattedDate } from "../Settings";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";

export default () => {
  const { transactionId } = useParams();
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [form, updateForm] = useState({});
  const selectIndex = form.typeId;
  const history = useHistory();

  useEffect(() => {
    TransactionRepository.getAllTypes()
      .then((data) => {
        setTransactionTypes(data);
      })
      .then(() => {
        TransactionRepository.getTransactionById(transactionId).then((data) => {
          updateForm(data);
        });
      });
  }, [transactionId]);

  const updateTransaction = (evt) => {
    evt.preventDefault();
    const updatedTransaction = {
      userId: parseInt(localStorage.getItem("kakeibo-user")),
      timestamp: form.timestamp,
      description: form.description,
      amount: form.amount,
      typeId: form.typeId,
      id: form.id,
      isFixed: form.isFixed,
    };
    TransactionRepository.updateTransaction(updatedTransaction).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="add-transaction-container">
        <h2 className="add-transaction-header">Edit Transaction</h2>
      <div className="add_transaction">
        <form name="add_transaction_form" className="add_transaction_form">
          <fieldset className="add_transaction_fields">
            
            <input
              type="date"
              id="date"
              className="transaction-form-control"
              value={formattedDate(form.timestamp)}
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
              value={form.description}
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
              value={form.amount}
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
                  if (selectIndex === typeObject.id) {
                    return (
                      <option
                        key={typeObject.id}
                        id="categoryId"
                        value={typeObject.id}
                        selected="transaction type"
                      >
                        {typeObject.name}
                      </option>
                    );
                  } else {
                    return (
                      <option
                        key={typeObject.id}
                        id="categoryId"
                        value={typeObject.id}
                      >
                        {typeObject.name}
                      </option>
                    );
                  }
                })}
              </select>
            <Button variant="contained" color="success"
              id="submit_transaction"
              className="button"
              onClick={updateTransaction}
            >
              Update Transaction
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );

};



