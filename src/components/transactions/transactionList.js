import React from "react";
import { useEffect, useState } from "react";
import TransactionRepository from "../../repositories/TransactionRepository";
import { humanDate } from "../Settings";
import AddTransaction from "./AddTransaction";
import { Link } from "react-router-dom";
import "./transactions.css";

export default () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    TransactionRepository.getUserTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  const killTransaction = (id) => {
    TransactionRepository.deleteTransaction(id).then(() => {
      TransactionRepository.getUserTransactions().then((data) => {
        setTransactions(data);
      });
    });
  };

  return (
    <div className="transactions">
      <AddTransaction setTransactions={setTransactions} />
      <h2 className="transaction_header">Transactions</h2>
      <div className="user_transactions">
        <div className="transaction_list">
          <ul>
            {transactions.map((transactionObject) => {
              return (
                <li
                  className="transaction_entry"
                  key={transactionObject.id}
                  id={transactionObject.id}
                >
                  Date: {humanDate(transactionObject)}{" "}
                  {transactionObject.description} Amount: $
                  {transactionObject.amount.toFixed(2)} Type:{" "}
                  {transactionObject.type.name}{" "}
                  <Link to={`editTransaction/${transactionObject.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      killTransaction(transactionObject.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
