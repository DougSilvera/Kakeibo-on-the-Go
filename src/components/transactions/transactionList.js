import React from "react";
import { useEffect, useState } from "react";
import TransactionRepository from "../../repositories/TransactionRepository";
import { humanDate } from "../Settings";
import AddTransaction from "./AddTransaction"
import "./transactions.css";


export default () => {
    const [transactions, setTransactions] = useState([])
    
useEffect(() => {
    TransactionRepository.getUserTransactions()
    .then((data) => {
        setTransactions(data)
    })
}, [])
    return (
        <>
        <AddTransaction />
        <h2 className="transaction_header">Transactions</h2>
        <ul className="transaction_list">
            {
                transactions.map((transactionObject) => {
                    return <li className="transaction_entry" key={transactionObject.id} id={transactionObject.id}>Date: {humanDate(transactionObject)} Description:{transactionObject.description}
                    {" "}Amount: ${transactionObject.amount.toFixed(2)} Type: {transactionObject.type.name}</li>
                })
            }
        </ul>

        </>

    )
    
}