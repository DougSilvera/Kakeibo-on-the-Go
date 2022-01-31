import React from"react";
import { useParams } from "react-router-dom";


export default () => {
   const {transactionId} =  useParams()
    
    return (
 
        <>edit the mother f'n transaction number {transactionId} here </>
    )
}