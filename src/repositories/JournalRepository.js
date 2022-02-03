import Settings from "../components/Settings";
import { fetchIt } from "../components/Settings";

export default {
  async postNewJournal(newJournal, transactions) {
    return fetchIt(
      `${Settings.API}/journals`,
      "POST",
      JSON.stringify(newJournal)
    ).then((newJournal) => {
      const journalTransactionPromises = transactions.map((transaction) => {
        return fetchIt(
          `${Settings.API}/journalTransactions`,
          "POST",
          JSON.stringify({
            transactionId: transaction.id,
            journalId: newJournal.id,
            typeId: transaction.typeId,
          })
        );
      });
      return Promise.all(journalTransactionPromises);
    });
  },

  async getUserJournals() {
    const userId = parseInt(localStorage.getItem("kakeibo-user"));
    return await fetchIt(`${Settings.API}/journals?userId=${userId}`);
  },
  async deleteJournal(id) {
    return await fetchIt(`${Settings.API}/journals/${id}`, "DELETE");
  },
  async getJournalById(id) {
    return await fetchIt(`${Settings.API}/journals/${id}`);
  },
  async getJournalTransactionsbyId(journalId) {
    return await fetchIt(
      `${Settings.API}/journalTransactions?journalId=${journalId}&_expand=transaction&_expand=type`
    );
  },
  async updateJournal(updatedJournal) {
    return await fetchIt(
      `${Settings.API}/journals/${updatedJournal.id}`,
      "PUT",
      JSON.stringify(updatedJournal)
    );
  },
};
