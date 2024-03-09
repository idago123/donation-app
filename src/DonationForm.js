import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DonationList from "./DonationList";

let storeDonationData = [{
    "name": "Ida G",
    "type": "money",
    "amount": 40,
    "date": new Date()
    },
    {
    "name": "Lee",
    "type": "food",
    "amount": 40,
    "date": new Date()
    },
]

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


    useEffect(() => {
        console.log("Data:", data)
      }, [data])

    const deleteDonation = (donation, i) => {
        let temp = data
        const removeItemFromList = temp.filter((item, index) => index !== i)
        setData(removeItemFromList)
    };

    const calculateDonations = () => {
        let sumOfAmount = 0;
        let sumOfNumberOfDonations = data.length;
        let sumOfNumberOfTypeDonations = dataFilter.length;
        let sumOfNumberOfTypeAmount = 0;

        console.log("list clicked?", listClicked)

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
            console.log("type all?:", type)
            setListClicked(false)
        } else {
            setListClicked(true)
        }
        setNewType(type)
        console.log("filter type ?:", type)

    }

    useEffect(() => {
        console.log("filter:", dataFilter)
        console.log("clicked all? should be false:", listClicked)

      }, [dataFilter, listClicked, listClicked])

    return (
        <>
            <div>
                <h1>Thank you for your support!</h1>
                <p>Your donation is greatly appreciated.</p>
            </div>
            <form id="my-form" onSubmit={(e) => dataHandler(e)}>
                <label>Name:{" "}
                    <input name="query" onChange={(e) => setName(e.target.value)}/>  
                </label>{" "}
                <label>
                    Type of Donation:{" "}
                    <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
                        <option value="select">Select</option>
                        <option value="money">Money</option>
                        <option value="food">Food</option>
                        <option value="clothing">Clothing</option>
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
                            <option value="money">Money</option>
                            <option value="food">Food</option>
                            <option value="clothing">Clothing</option>
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