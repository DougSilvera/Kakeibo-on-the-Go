import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TransactionRepository from "../../repositories/TransactionRepository";
import "./analysis.css";
import { humanDate, toTimestamp } from "../Settings";

export default () => {
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});
  const selectTypeFilter = (selectedId) => {
    let copy = [...typeFilters];
    if (typeFilters.includes(selectedId)) {
      copy = copy.filter((Id) => Id !== selectedId);
      setTypeFilters(copy);
    } else {
      copy.push(selectedId);
      setTypeFilters(copy);
    }
  };
  function simpleArraySum(ar) {
    var sum = 0;
    for (var i = 0; i < ar.length; i++) {
      sum += ar[i];
    }
    return sum.toFixed(2);
  }
  useEffect(() => {
    TransactionRepository.getAllTypes().then((data) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    TransactionRepository.getUserTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  const dateFilter = (startDateFilter, endDateFilter, event) => {
    event.preventDefault();
    let copy = transactions.filter((transaction) => {
      return transaction.timestamp >= startDateFilter;
    });
    let copy2 = copy.filter((transaction) => {
      return transaction.timestamp <= endDateFilter;
    });

    setTransactions(copy2);
  };
const categoryAmountArray = (typeId) => {}
  const runTypeFilter = (filterArray, event) => {
    event.preventDefault()

    let copy = filterArray.map((typeFilterId) => {
      return transactions.filter((transaction) => {
        return transaction.typeId === typeFilterId
      });
    })
    var merged = [].concat.apply([], copy)
    setTransactions(merged)
  };

  const targetStartDate = (date) => {
    setStartDate(toTimestamp(date));
  };
  const targetEndDate = (date) => {
    setEndDate(toTimestamp(date));
  };

  return (
    <>
      <div className="analyze_user_transactions">
        <form className="filter">
          <fieldset className="date_filter_field">
            <label>Start</label>
            <input
              type="date"
              id="start_date"
              placeholder="Select Date"
              onChange={(evt) => targetStartDate(evt.target.value)}
            />
            <label>End</label>
            <input
              type="date"
              id="end_date"
              placeholder="Select Date"
              onChange={(evt) => targetEndDate(evt.target.value)}
            />
            <button onClick={(event) => dateFilter(startDate, endDate, event)}>
              Filter Dates
            </button>
          </fieldset>
          <div>
            {types.map((type) => {
              return (
                <label key={type.id} id={type.id}>
                  <input
                    type="checkbox"
                    key={type.id}
                    value={type.id}
                    onChange={() => selectTypeFilter(type.id)}
                    checked={typeFilters.includes(type.id) ? true : false}
                  />
                  {type.name}
                </label>
              );
            })}
          </div>
          <button
            onClick={(event) => {
              runTypeFilter(typeFilters, event);
            }}
          >
            Filter Type
          </button>
        </form>
        <div className="analyze_transaction_list">
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
                  {transactionObject.amount.toFixed(2)}{" "}
                  {transactionObject.type.name}{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="category totals">Category totals go here</div>
      </div>
      <Link to="/analyze/newJournal">
        <button>new journal</button>
      </Link>
    </>
  );
};
