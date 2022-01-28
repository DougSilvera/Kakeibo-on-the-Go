import React from "react";
import { Link } from "react-router-dom";

export default () => {
    const journalId = 1
    return (
    <>
    <div>this is where the journal list will go</div>
    <Link to={`/journalList/editJournal`}><button>edit journal</button></Link>
    <Link to={`/journalList/journalDetail`}><button>journal detail</button></Link>
    </>


    )
}