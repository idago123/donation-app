import React, { useState } from "react";
// Displays each donation
const DonationList = ({list, deleteDonation}) => {

    let displayDonations = list.map((donation, i) => {
        if (donation) {
            return (
                <tr key={i}>
                    <td>{donation.name}</td>
                    <td>{donation.type}</td>
                    <td>{donation.type === "Money" ? `$${donation.amount}` : donation.amount}</td>
                    <td>{new Date(donation.date).toDateString()}</td>
                    <td><button onClick={() => deleteDonation(donation, i)}>delete</button></td>
                </tr>
            )
        }
    })

    return(  
    <div >
        <table style={{ width:"100%", border:"1px solid black"}}>
        <tr style={{ border:"1px solid black"}}>
            <th>Name</th>
            <th>Type</th> 
            <th>Amount</th>
            <th>Date</th>
            <th>Delete?</th>
        </tr>
        {displayDonations}
        </table>
    </div>
    )
  }

export default DonationList;