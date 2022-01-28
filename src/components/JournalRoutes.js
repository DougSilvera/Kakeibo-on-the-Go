import React from "react";
import { Route } from "react-router-dom";
import EditJournal from "./journals/EditJournal";
import JournalDetail from "./journals/JournalDetail";
import JournalList from "./journals/JournalList";


export default () => {
    return (
        <>
            <Route exact path="/journalList">
                <JournalList />
            </Route>
            <Route path="/journalList/editJournal/">
                <EditJournal />
            </Route>
            <Route path="/journalList/journalDetail/">
                <JournalDetail />
            </Route>
        </>
    )
}


// /journalList/editJournal/:journalId(\d+)

// /journalList/journalDetail/:journalId(\d+)