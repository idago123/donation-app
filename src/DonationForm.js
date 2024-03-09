import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DonationList from "./DonationList";

let storeDonationData = [{
    "name": "Ida G",
    "type": "Money",
    "amount": 40,
    "date": new Date()
}]

const DonationForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState();
    const [type, setType] = useState("money");
    const [amount, setAmount] = useState();
    const [data, setData] = useState(storeDonationData);
    const [dataFilter, setdataFilter] = useState(data);
    const [listClicked, setListClicked] = useState(false);

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

        for (const donation of data) {
            sumOfAmount =  sumOfAmount + Number(donation.amount);
        }

        return { sumOfAmount, sumOfNumberOfDonations }
    }

    const { sumOfAmount, sumOfNumberOfDonations } = calculateDonations()

    // const filterType = (type) => {
    //     let temp = data
    //     if (type === "all") {
    //         setListClicked(true)
    //         return data
    //     }
    //     const filterList = temp.filter((item, index) => item.type !== type)
    //     console.log(filterList)
    //     // setData(filterList)
    //     setdataFilter([filterList])
    //     setListClicked(true)
    // }

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
                {/* <label>
                        Filter By Type:
                        <select onChange={(e) => filterType(e.target.value)}>
                            <option value="money">Money</option>
                            <option value="food">Food</option>
                            <option value="clothing">Clothing</option>
                            <option value="all">View All</option>

                        </select>
                    </label> */}
            </div>
            <div>
                <p>Summary of Donations</p>
                    Number of Donations:{" "} {sumOfNumberOfDonations}{" "}
                    Total Amount:{" "} {sumOfAmount} 
                </div>


                {data.length >= 1 ? <DonationList list={data} deleteDonation={deleteDonation}/> : ""}
        </>
    )
  }

  export default DonationForm;