import Settings from "../components/Settings";
import { fetchIt } from "../components/Settings";

export default {
  async getUserTransactions() {
    const userId = parseInt(localStorage.getItem("kakeibo-user"));
    return await fetchIt(
      `${Settings.API}/transactions?userId=${userId}&_expand=type`
    ).then((data) =>
      data.sort(function (x, y) {
        return y.timestamp - x.timestamp;
      })
    );
  },
  async getTransactionById(id) {
    return await fetchIt(`${Settings.API}/transactions/${id}`);
  },
  async getAllTypes() {
    return await fetchIt(`${Settings.API}/types`);
  },
  async postNewTransaction(newTransaction) {
    return await fetchIt(
      `${Settings.API}/transactions`,
      "POST",
      JSON.stringify(newTransaction)
    );
  },
  async deleteTransaction(id) {
    return await fetchIt(`${Settings.API}/transactions/${id}`, "DELETE");
  },
  async updateTransaction(updatedTransaction) {
    return await fetchIt(
      `${Settings.API}/transactions/${updatedTransaction.id}`,
      "PUT",
      JSON.stringify(updatedTransaction)
    );
  },
  async getFilteredTransactions(query, startDate, endDate) {
    return await fetchIt(`${Settings.API}/transactions?${query}`)
      .then((data) => {
        data.filter((data) => data.timestamp >= startDate);
      })
      .then((data) => {
        data.filter((data) => data.timestamp <= endDate);
      });
  },
  async getDateFilteredTransactions(startDate, endDate) {
    return await fetchIt(`${Settings.API}/transactions`)
      .then((data) => {
        data.filter((data) => data.timestamp >= startDate);
      })
      .then((data) => {
        data.filter((data) => data.timestamp <= endDate);
      });
  },
};
