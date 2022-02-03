import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JournalRepository from "../../repositories/JournalRepository";
import { formattedDate } from "../Settings";

export default () => {
  const [journals, setJournals] = useState([]);
  const [reset, syncList] = useState([]);

  useEffect(() => {
    JournalRepository.getUserJournals().then((data) => {
      setJournals(data);
    });
  }, [reset]);
  const killJournal = (id) => {
    JournalRepository.deleteJournal(id).then(() => {
      syncList(reset + 1);
    });
  };

  return (
    <>
      <div className="journals">
        <ul className="journals-list">
          {journals.map((journal) => {
            return (
              <li key={journal.id}>
                Date Range: {formattedDate(journal.startDate)} through{" "}
                {formattedDate(journal.endDate)} reflection:{" "}
                {journal.reflection}{" "}
                <Link to={`/journalList/editJournal/${journal.id}`}>
                  <button>edit journal</button>
                </Link>
                <Link to={`/journalList/journalDetail/${journal.id}`}>
                  <button>journal detail</button>
                </Link>
                <button
                  id={journal.id}
                  onClick={(evt) => {
                    killJournal(evt.target.id);
                  }}
                >
                  Delete Journal
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
