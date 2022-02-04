import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalRepository from "../../repositories/JournalRepository";
import TransactionRepository from "../../repositories/TransactionRepository";
import { formattedDate, humanDate, simpleArraySum } from "../Settings";

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

  return (
    <>
    <h2>Journal for {formattedDate(journal.startDate)} through {formattedDate(journal.endDate)} </h2>
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
      <h3>Journal entry</h3>
      <div>how much money do you have: {journal.have}</div>
      <div>how much would you have liked to save: {journal.save}</div>
      <div>did you spend more or less than planned: {journal.spend}</div>
      <div>
        What are you happy with? What can you improve?: {journal.reflection}
      </div>
    </>
  );
};
