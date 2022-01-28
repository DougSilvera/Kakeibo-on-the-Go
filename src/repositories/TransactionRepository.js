import Settings from "../components/Settings";
import { fetchIt } from "../components/Settings";


export default {

    async getUserTransactions() {
        const userId = parseInt(localStorage.getItem("kakeibo-user"))
        return await fetchIt(`${Settings.API}/transactions?userId=${userId}&_expand=type`)
    }
}