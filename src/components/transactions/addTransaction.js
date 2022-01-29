import React, { useEffect, useState } from "react";
import "./transactions.css";
import CurrencyInput from 'react-currency-input-field';
import TransactionRepository from "../../repositories/TransactionRepository";
import { toTimestamp } from "../Settings";




export default ({setTransactions}) => {
    const [transactionTypes, setTransactionTypes] = useState([])
    const [form, updateForm] = useState({})
    const amountNumber = (currencyString) => {
       const integer = Number(currencyString.replace(/[^0-9.-]+/g,""))
       return integer
    }
    
        useEffect(() => {
            TransactionRepository.getAllTypes()
            .then((data) => {
                setTransactionTypes(data)
            })
        }, [])
        const submitNewTransaction = (evt) => {
            evt.preventDefault()
            const newTransaction = {
                userId: parseInt(localStorage.getItem("kakeibo-user")),
                timestamp: form.timestamp,
                description: form.description,
                amount: form.amount,
                typeId: form.typeId,
                isFixed: false
            }
            TransactionRepository.postNewTransaction(newTransaction)
            .then(() => {
                TransactionRepository.getUserTransactions()
                .then((data) => {
                    setTransactions(data)
                })
            })
        }

        
        
        
       
        
    return (
        <>
        <div className="add_transaction">
        <form className="add_transaction_form" >
                <fieldset className="add_transaction_fields">
                    <label id="label--login" htmlFor="date"> Date </label>
                    <input 
                           type="date" id="date" className="form-control"
                           placeholder="Select Date" onChange={(event) => {
                            const copy = {...form}
                            copy.timestamp = toTimestamp(event.target.value)
                            updateForm(copy)
                        }} />
                    <label htmlFor="description"> Description </label>
                    <input 
                           type="text" id="description" className="form-control"
                           placeholder="Description" onChange={(event) => {
                            const copy = {...form}
                            copy.description = event.target.value
                            updateForm(copy)
                        }} />
                    <label htmlFor="amount"> Amount </label>
                    <CurrencyInput 
                            prefix="$"  decimalScale={2} id="amount" className="form-control"
                           placeholder="Amount" onChange={(event) => {
                            const copy = {...form}
                            copy.amount = amountNumber(event.target.value)
                            updateForm(copy)}} />
                    <label htmlFor="category"> Category </label>
                    <select className="form-control" id="typeId" onChange={(event) => {
            const copy = {...form}
            copy.typeId = parseInt(event.target.value)
            updateForm(copy)
        }}>
                        <option value="" className="form-control">Choose category</option>
                        {
                            transactionTypes.map((typeObject) => {
                                return <option key={typeObject.id} id="categoryId" value={typeObject.id}>{typeObject.name}</option>
                            })
                        }
                    </select>
                    <button id="submit_transaction" className="button" onClick={submitNewTransaction}>Submit Transaction</button>
                </fieldset>
        </form>        

    </div>
        


        </>
        
    )
    
}