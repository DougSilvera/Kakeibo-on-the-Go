import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toTimestamp, formattedDate } from "../Settings";
import TransactionRepository from "../../repositories/TransactionRepository";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    <>
      <div className="edit_transaction">
        <form name="edit_transaction_form" className="edit_transaction_form">
          <fieldset className="edit_transaction_fields">
            <label id="label--login" htmlFor="date">
              {" "}
              Date{" "}
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={formattedDate(form.timestamp)}
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
              value={form.description}
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
              value={form.amount}
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
            <button
              id="submit_transaction"
              className="button"
              onClick={updateTransaction}
            >
              Update Transaction
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
