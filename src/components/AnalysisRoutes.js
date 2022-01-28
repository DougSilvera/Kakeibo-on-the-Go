import React from "react";
import { Route } from "react-router-dom";
import Analysis from "./analysis/Analysis";
import NewJournalForm from "./analysis/NewJournalForm";


export default () => {
    return (
        <>
            <Route exact path="/analyze">
                <Analysis />
            </Route>
            <Route path="/analyze/newJournal">
                <NewJournalForm />
            </Route>
        </>
    )
}