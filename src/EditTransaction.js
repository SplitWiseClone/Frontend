import NavBar from "./NavBar";
import axios from "axios";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function EditTransaction(){

    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/user/profile/',
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`, "Accept": 'application/json'}}).
        then((response) => {
            setUser(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            navigate("/");
        });
    } ,[]);


    const currencyOptions = [
        { value: "Rs", label: "₹" },
        { value: "$", label: "$" },
        { value: "o/w", label: "Other" },
    ];
    const categoryOptions = [
        {value: "Food", label: "Food"},
        {value: "Travel", label: "Travel"},
        {value: "Shopping", label: "Shopping"},
        {value: "Entertainment", label: "Entertainment"},
        {value: "Others", label: "Others"},
    ];

    const [userList, setUserList] = React.useState([]);
    const [userDetails, setUserDetails] = React.useState([]);
    const [selectedCurrency, setSelectedCurrency] = React.useState(null);
    const [takers, setTakers] = React.useState([]);
    const [giver, setGivers] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [expenseData, setExpenseData] = useState({
        id:"",
        currency:"",
        amount:"",
        taker:[],
        giver:"",
        category:"",
        description:"",
      });
    useEffect(() => {
            async function getUserList() {
                try {
                    const users = await axios.get(process.env.REACT_APP_BACKEND_URL + "/users/list/");
                    console.log(users.data);
                    setUserList(users.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getUserList();
        }
    , []);

    useEffect(() => {
        if(userList.length !== 0) {
            let userDetailList = [];
            userList.map((user) => {
                userDetailList.push({value: user.username.toString(), label: user.username.toString()});
            });
            console.log(userDetailList);
            setUserDetails(userDetailList);
        }
    }
    , [userList]);
    function handleCurrencyChange(selectedCurrency) {
        setSelectedCurrency(selectedCurrency);
        setExpenseData({...expenseData, currency: selectedCurrency.value});
    }
    function handleTakersChange(selectedTakers) {
        setTakers(selectedTakers);
        setExpenseData({...expenseData, taker: selectedTakers.map((taker) => taker.value)});
    }
    function handleGiverChange(selectedGivers) {
        setGivers(selectedGivers);
        setExpenseData({...expenseData, giver: selectedGivers.value});
    }
    function handleCategoryChange(selectedCategory) {
        setSelectedCategory(selectedCategory);
        setExpenseData({...expenseData, category: selectedCategory.value});
    }
    const {id} = useParams();
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/getTransaction/' + id,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`, "Accept": 'application/json'}}).
        then((response) => {
            setExpenseData(response.data);
            if(response.data.currency === "Rs"){
                setSelectedCurrency(currencyOptions[0]);
            }else if(response.data.currency === "$"){
                setSelectedCurrency(currencyOptions[1]);
            }else{
                setSelectedCurrency(currencyOptions[2]);
            }
            if(response.data.category === "Food"){
                setSelectedCategory(categoryOptions[0]);
            }else if(response.data.category === "Travel"){
                setSelectedCategory(categoryOptions[1]);
            }else if(response.data.category === "Shopping"){
                setSelectedCategory(categoryOptions[2]);
            }else if(response.data.category === "Entertainment"){
                setSelectedCategory(categoryOptions[3]);
            }else if(response.data.category === "Others"){
                setSelectedCategory(categoryOptions[4]);
            }
            // append takers to takers array
            setTakers(response.data.taker.map((taker) => {
                console.log("taker:: ", taker);
                return {value: taker, label: taker};
            }));
            setGivers({value: response.data.giver, label: response.data.giver});

            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            navigate("/");
        });
    }
    ,[]);
    console.log("taker data:: ", takers);
    console.log("expense data: ", expenseData);
    return (user!==null) ? (
        <>
        <NavBar />
        <div className='flex justify-center w-full'>
            <div className="flex flex-col items-start justify-center w-11/12">
                <h1 className='text-2xl font-semibold font-sans px-5 py-5'>Update Transaction {id}</h1>
                <div className='flex flex-row items-center justify-center w-full'>
                    <form className='flex flex-col items-start justify-center w-1/2'
                            onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/editTransaction/" + id, expenseData,
                                        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`, "Accept": 'application/json'}});
                                    console.log(response);
                                } catch (error) {
                                    console.log(error);
                                }

                            }
                    }>
                        <label className='text-xl font-semibold font-sans py-5'>Currency</label>
                        <Select
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                          options={currencyOptions}
                          className='w-11/12'
                        />
                        <label className='text-xl font-semibold font-sans py-5'>Takers</label>
                        <Select
                          value={takers}
                          onChange={handleTakersChange}
                          options={userDetails}
                            isMulti={true}
                          className='w-11/12'
                        />
                        <label className='text-xl font-semibold font-sans py-5'>Giver</label>
                        <Select
                          value={giver}
                          onChange={handleGiverChange}
                          options={userDetails}
                          className='w-11/12'
                        />

                        <label className='text-xl font-semibold font-sans py-5'>Amount</label>
                        <input className='border-2 border-gray-300 rounded-md py-2 w-11/12' type='number' placeholder='Amount'
                        onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                        value={expenseData.amount}
                        />

                      <label className='text-xl font-semibold font-sans py-5'>Category</label>
                        <Select
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                          options={categoryOptions}
                          className='w-11/12'
                        />
                        <label className='text-xl font-semibold font-sans py-5'>Description</label>
                        <input className='border-2 border-gray-300 rounded-md py-2 w-11/12 mb-5' type='text' placeholder='Enter Expense Description'
                        onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                        value={expenseData.description} />

                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded'>Update Expense</button>
                    </form>
                </div>
            </div>
        </div>
            </>
    ) : (
        navigate("/")
    )
}