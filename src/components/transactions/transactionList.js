import React from "react";
import { useEffect, useState } from "react";
import TransactionRepository from "../../repositories/TransactionRepository";
import { humanDate } from "../Settings";
import AddTransaction from "./AddTransaction";
import "./transactions.css";


export default () => {
    const [transactions, setTransactions] = useState([])
    
useEffect(() => {
    TransactionRepository.getUserTransactions()
    .then((data) =>
    data.sort(function(x, y){
        return y.timestamp - x.timestamp;
    }))
    .then((data) => {
        setTransactions(data)
    })
}, [])
   
return (
        <div className="transactions">
        <AddTransaction setTransactions = {setTransactions} transactions={transactions}/>
        <h2 className="transaction_header">Transactions</h2>
        <div className="transaction_list">
        <ul >
            {
                transactions.map((transactionObject) => {
                    return <li className="transaction_entry" key={transactionObject.id} id={transactionObject.id}>Date: {humanDate(transactionObject)} Description:{transactionObject.description}
                    {" "}Amount: ${transactionObject.amount.toFixed(2)} Type: {transactionObject.type.name}</li>
                })
            }
        </ul>


        </div>

        </div>

    )
    
}