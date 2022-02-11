import { React, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import JournalRepository from "../../repositories/JournalRepository";
import { Button } from "@mui/material";

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
      have: formNumber(journal.have),
      save: formNumber(journal.save),
      spend: journal.spend,
      reflection: journal.reflection,
    };
    JournalRepository.postNewJournal(newJournal, transactions).then(() => {
      history.push("/journalList");
    });
  };
  const formNumber = (number) => {
    return parseFloat(number).toFixed(2)
   
   }
  return (
    <div className="add_journal">
      
      <form className="journal_form">
        <fieldset className="journal_form_fields">
          <label>How much money do you have?{" "}
          <input className="journal_number_input_box"
            id="have_field"
            type="number"
            onChange={(event) => {
              let copy = { ...journal };
              copy.have = parseFloat(event.target.value);
              setJournal(copy);
            }}
          /></label>
          <label>How much would you have liked to save?{" "}
          <input className="journal_number_input_box"
            id="save_field"
            type="number"
            onChange={(event) => {
              let copy = { ...journal };
              copy.save = parseFloat(event.target.value);
              setJournal(copy);
            }}
          /></label>
          <label className="journal-input-page-break">
            Did you spend more or less than what you planned on, why?
          </label>
          <textarea className="journal_text_input_box"
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
          <textarea  className="journal_text_input_box"
            id="reflection_field"
            type="text"
            onChange={(event) => {
              let copy = { ...journal };
              copy.reflection = event.target.value;
              setJournal(copy);
            }}
          />
        </fieldset>
        
      </form>
      <div className="buttonContainer">
        <Button variant="contained" color="success"
          onClick={(event) => {
            submitJournal(transactions, startDate, endDate, event);
          }}
        >
          Post Journal
        </Button>
      </div>
    </div>
    
  );
};
