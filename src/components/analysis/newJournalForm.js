import { React, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import JournalRepository from "../../repositories/JournalRepository";

export default ({ transactions, startDate, endDate }) => {
  const [journal, setJournal] = useState({});
  const loggedInUser = parseInt(localStorage.getItem("kakeibo-user"));
  const history = useHistory();
  const submitJournal = (transactions, startDate, endDate, event) => {
    event.preventDefault();
    const newJournal = {
      userId: loggedInUser,
      startDate: startDate,
      endDate: endDate,
      have: journal.have,
      save: journal.save,
      spend: journal.spend,
      reflection: journal.reflection,
    };
    JournalRepository.postNewJournal(newJournal, transactions).then(() => {
      history.push("/journalList");
    });
  };
  return (
    <>
      <form className="journal_form">
        <fieldset className="journal_form_fields">
          <label>How much money do you have?</label>
          <input
            id="have_field"
            type="number"
            onChange={(event) => {
              let copy = { ...journal };
              copy.have = parseFloat(event.target.value);
              setJournal(copy);
            }}
          />
          <label>How much would you have liked to save?</label>
          <input
            id="save_field"
            type="number"
            onChange={(event) => {
              let copy = { ...journal };
              copy.save = parseFloat(event.target.value);
              setJournal(copy);
            }}
          />
          <label>
            Did you spend more or less than what you planned on, why?
          </label>
          <input
            id="spend_field"
            type="text"
            onChange={(event) => {
              let copy = { ...journal };
              copy.spend = event.target.value;
              setJournal(copy);
            }}
          />
          <label>
            What are you happy about in this snapshot? What can you improve?
          </label>
          <input
            id="reflection_field"
            type="text"
            onChange={(event) => {
              let copy = { ...journal };
              copy.reflection = event.target.value;
              setJournal(copy);
            }}
          />
        </fieldset>
        <button
          onClick={(event) => {
            submitJournal(transactions, startDate, endDate, event);
          }}
        >
          Post Journal
        </button>
      </form>
    </>
  );
};
