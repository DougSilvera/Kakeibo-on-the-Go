import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TransactionRepository from "../../repositories/TransactionRepository";
import "./analysis.css";
import { humanDate } from "../Settings";


export default () => {
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([])
  const [typeFilters, setTypeFilters] = useState([])
  const [dateFilter, setDateFilter]= useState([])
  
  useEffect(() => {
      TransactionRepository.getAllTypes()
      .then((data) => {
          setTypes(data)
      })
  }, [])

  useEffect(() => {
    TransactionRepository.getUserTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);
// const queryBuilder = (filters) => {
//     filters.map((filter) => {
//         return ``
//     })
// }
   

  const selectTypeFilter = (selectedId) => {
    let copy = [...typeFilters]
    if (typeFilters.includes(selectedId)) {
        copy = copy.filter((Id) => Id !== selectedId)
        setTypeFilters(copy)
    } else {
        copy.push(selectedId)
        setTypeFilters(copy)
    }
}



  return (
    <>
      <div className="analyze_user_transactions">
        <div className="analyze_transaction_list">
        <form className="filter">
            <fieldset className="date_filter_field">
                <label>Start</label>
                <input type="date"id="start_date"placeholder="Select Date"/>
                <label>End</label>
                <input type="date"id="end_date"placeholder="Select Date"/>
            </fieldset>
            <div>
            {types.map((type) => {
                return <label key={type.id} id={type.id}>
                    <input type="checkbox" key={type.id} value={type.id} onChange={() => selectTypeFilter(type.id)}  checked={typeFilters.includes(type.id) ? true : false} />
                    {type.name}
                    </label>
                    
            })}

            </div>
            <button >Filter</button>
        </form>

          <ul>
            {transactions.map((transactionObject) => {
              return (
                <li
                  className="analyze_transaction_entry"
                  key={transactionObject.id}
                  id={transactionObject.id}
                >
                  Date: {humanDate(transactionObject)}:{" "}
                  {transactionObject.description} Amount: $
                  {transactionObject.amount.toFixed(2)} {" "}
                  {transactionObject.type.name}{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Link to="/analyze/newJournal">
        <button>new journal</button>
      </Link>
    </>
  );
};
