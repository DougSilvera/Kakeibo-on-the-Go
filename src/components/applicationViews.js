import React from "react";
import { Route } from "react-router-dom";
import AnalysisRoutes from "./AnalysisRoutes";
import JournalRoutes from "./JournalRoutes";
import EditTransaction from "./transactions/EditTransaction";
import TransactionList from "./transactions/TransactionList";

export default () => {
  return (
    <>
      <AnalysisRoutes />
      <JournalRoutes />
      <Route exact path={"/"}>
        <TransactionList />
      </Route>
      <Route path="/editTransaction/:transactionId(\d+)">
        <EditTransaction />
      </Route>
    </>
  );
};
