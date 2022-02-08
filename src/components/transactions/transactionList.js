import React from "react";
import { useEffect, useState } from "react";
import TransactionRepository from "../../repositories/TransactionRepository";
import AddTransaction from "./AddTransaction";
import "./transactions.css";
import TransactionTable from "./TransactionTable";

export default () => {
  const [transactions, setTransactions] = useState([]);
  const [renderTransactions, syncTransactions] = useState([]);

  useEffect(() => {
    TransactionRepository.getUserTransactions().then((data) => {
      setTransactions(data);
    });
  }, [renderTransactions]);

  const killTransaction = (id) => {
    TransactionRepository.deleteTransaction(id);
  };

  return (
    <div className="transactions">
      <AddTransaction syncTransactions={syncTransactions} />
      <h2 className="transaction_header">Transactions</h2>

      <TransactionTable
        className="transaction-data-table"
        renderTransactions={renderTransactions}
        transactions={transactions}
        syncTransactions={syncTransactions}
        killTransaction={killTransaction}
      />
    </div>
  );
};
