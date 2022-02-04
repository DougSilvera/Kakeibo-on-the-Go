import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react/cjs/react.development";
import JournalRepository from "../../repositories/JournalRepository";
import TransactionRepository from "../../repositories/TransactionRepository";
import { simpleArraySum, humanDate, formattedDate } from "../Settings";

export default () => {
  const { journalId } = useParams();
  const [form, setForm] = useState({});
  const [journalTransactions, setJournalTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const history = useHistory();
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
    <h2>Journal for {formattedDate(form.startDate)} through {formattedDate(form.endDate)} </h2>
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
            value={form.have}
            onChange={(event) => {
              let copy = { ...form };
              copy.have = parseFloat(event.target.value);
              setForm(copy);
            }}
          />
          <label>How much would you have liked to save?</label>
          <input
            id="save_field"
            type="number"
            value={form.save}
            onChange={(event) => {
              let copy = { ...form };
              copy.save = parseFloat(event.target.value);
              setForm(copy);
            }}
          />
          <label>
            Did you spend more or less than what you planned on, why?
          </label>
          <input
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
          <input
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
        <button
          onClick={(event) => {
            sendUpdatedJournal(event);
          }}
        >
          Update Journal
        </button>
      </form>
    </>
  );
};
