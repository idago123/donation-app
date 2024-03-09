import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DonationList from "./DonationList";

let storeDonationData = [{
    "name": "Ida G",
    "type": "Money",
    "amount": 40,
    "date": new Date()
    },
    {
    "name": "Lee",
    "type": "Food",
    "amount": 40,
    "date": new Date()
    },
]
// Displays donation form, calculations and list. Contains functions to delete, add, or filter donations.
const DonationForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const [data, setData] = useState(storeDonationData);
    const [dataFilter, setdataFilter] = useState(data);
    const [listClicked, setListClicked] = useState(false);
    const [newType, setNewType] = useState("");

    const dataHandler = (e) => {
        e.preventDefault();
            setData([...data, {
            "name": e.target[0].value,
            "type": e.target[1].value,
            "amount": e.target[2].value,
            "date": startDate
            }])
    };

    const deleteDonation = (donation, i) => {
        let temp = data
        let tempFilter = dataFilter

        const removeItemFromList = temp.filter((item, index) => index !== i)

        if (listClicked) {
            const removeItemFromFilterList = tempFilter.filter((item, index) => index !== i)
            setdataFilter(removeItemFromFilterList)
        }
        setData(removeItemFromList)
    };

    // const deleteDonation = (donation, i) => {
    //     let temp = data
    //     let tempFilter = dataFilter
    //     let filterAll = []
    //     let match = []

    //     if (listClicked) {
    //         const removeItemFromFilterList = tempFilter.filter((item, index) => index !== i)
    //         const matchedDonation = tempFilter.filter((item, index) => index === i)
    //         setdataFilter(removeItemFromFilterList)
    //     } 

    //     const removeItemFromList = temp.filter((item, index) => index !== i)
    //     setData(removeItemFromList)
    // };

    const calculateDonations = () => {
        let sumOfAmount = 0;
        let sumOfNumberOfDonations = data.length;
        let sumOfNumberOfTypeDonations = dataFilter.length;
        let sumOfNumberOfTypeAmount = 0;

        for (const donation of data) {
            sumOfAmount =  sumOfAmount + Number(donation.amount);
        }

        if (listClicked) {
            for (const donation of dataFilter) {
                sumOfNumberOfTypeAmount = sumOfNumberOfTypeAmount + Number(donation.amount);
            }

        }
        return { sumOfAmount, sumOfNumberOfDonations, sumOfNumberOfTypeDonations, sumOfNumberOfTypeAmount }
    }

    const { sumOfAmount, sumOfNumberOfDonations, sumOfNumberOfTypeDonations, sumOfNumberOfTypeAmount } = calculateDonations()

    const filterType = (type) => {
        let temp = data
        const filterList = temp.filter((item, index) => item.type === type)
        setdataFilter(filterList)

        if (type === "all") {
            setListClicked(false)
        } else {
            setListClicked(true)
        }
        setNewType(type)
    }

    return (
        <>
            <div>
                <h1>Welcome to Anna's Animal Shelter Portal!</h1>
                <p>Here you can view all donations, add a donation or remove a donation.</p>
            </div>
            <form id="my-form" onSubmit={(e) => dataHandler(e)}>
                <label>Name:{" "}
                    <input name="query" onChange={(e) => setName(e.target.value)}/>  
                </label>{" "}
                <label>
                    Type of Donation:{" "}
                    <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Select">Select</option>
                        <option value="Money">Money</option>
                        <option value="Food">Food</option>
                        <option value="Clothing">Clothing</option>
                    </select>
                </label>{" "}
                <label>Amount:{" "} 
                    <input name="query" onChange={(e) => setAmount(e.target.value)} />
                </label>{" "}
                <label>Date: 
                    <DatePicker selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
                </label>{" "}
                {name && type && amount && startDate ? <input type="submit" value="Submit"/> : <input type="submit" value="Submit" disabled/> }
            </form>
                <div>
                <label>
                        Filter By Type:
                        <select onChange={(e) => filterType(e.target.value)}>
                            <option value="all">View All</option>
                            <option value="Money">Money</option>
                            <option value="Food">Food</option>
                            <option value="Clothing">Clothing</option>
                        </select>
                    </label>
            </div>
            <div>
                <h2>Summary of Donations</h2>
                    <p>Number of Total Donations:{" "} {sumOfNumberOfDonations}{" "}
                    Total Amount:{" "} {sumOfAmount} </p>
                    <p>{listClicked && `Number of ${newType} Donations: ${sumOfNumberOfTypeDonations}
                    Total ${newType} amount: ${sumOfNumberOfTypeAmount}`}</p>
            </div>

                {listClicked ? <DonationList list={dataFilter} deleteDonation={deleteDonation}/> : <DonationList list={data} deleteDonation={deleteDonation}/>}
        </>
    )
  }

  export default DonationForm;