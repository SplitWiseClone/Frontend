import {useEffect} from "react";
import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import {json, useNavigate} from "react-router-dom";
import Select from "react-select";

export default function ListAllTransactions() {
    const [transactions, setTransactions] = React.useState(null);
    let navigate = useNavigate();
    const categoryOptions = [
        {value: "Food", label: "Food"},
        {value: "Travel", label: "Travel"},
        {value: "Shopping", label: "Shopping"},
        {value: "Entertainment", label: "Entertainment"},
        {value: "Others", label: "Others"},
        {value: "All", label: "All"},
    ];
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    function handleCategoryChange(selectedCategory) {
        setSelectedCategory(selectedCategory);
    }
    useEffect(() => {
        if(selectedCategory === null || selectedCategory.value === "All") {
            axios.get(process.env.REACT_APP_BACKEND_URL + '/listAllTransactions/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                    console.log(JSON.parse(response.data));
                    console.log("type of data: ", typeof JSON.parse(response.data));
                    setTransactions(JSON.parse(response.data));
                }
            ).catch((error) => {
                    console.log(error);
                }
            );
        } else {
            axios.get(process.env.REACT_APP_BACKEND_URL + '/filterTransactions/' + selectedCategory.value, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                    console.log(JSON.parse(response.data));
                    console.log("type of data: ", typeof JSON.parse(response.data));
                    setTransactions(JSON.parse(response.data));
            }
            ).catch((error) => {
                    console.log(error);
                }
            );
        }
    }, [selectedCategory]);

    const [user, setUser] = React.useState(null);
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/user/profile/',
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`, "Accept": 'application/json'}}).
        then((response) => {
            setUser(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            navigate('/');
        });
    } ,[]);
    return (user!==null) ? (
        <div>
            <NavBar />
            <div className='flex w-full py-5'>
            <h1 className='text-2xl font-semibold font-sans px-5 py-5 w-1/2'>List of all transactions</h1>
            <div className='w-1/2'>
                <label className='text-xl font-semibold font-sans pb-5 pt-3 w-full mx-32'>Category</label>
                <Select className='w-6/12 py-2 mx-32'
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={categoryOptions}
                />
            </div>
            </div>
            <div className='flex flex-col items-start '>
                {transactions !== null ? (
                    console.log("transactions: ",),
                    transactions.map((transaction) => (
                        <div className='border-blue-800 border-2 ml-2 py-3'>
                        <div className='flex flex-col items-start '>
                            <div className='flex items-start'>
                                <div className='flex flex-col items-start'>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>Transaction ID: {transaction.id}</p>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>Description: {transaction.description}</p>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>Amount: {transaction.amount.toFixed(2)}</p>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>Category: {transaction.category}</p>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>Date: {transaction.date}</p>
                                </div>
                                <div className='flex flex-col items-start'>
                                    {(transaction.giver === user.email) ? (
                                    <>
                                        <p className='text-xl font-semibold font-sans px-5 py-0'>You <b>spent</b> ₹{transaction.amount.toFixed(2)}</p>
                                        <p className='text-xl font-semibold font-sans px-5 py-0'>You <b>lent</b> ₹{transaction.lent.toFixed(2)}</p>
                                    </>
                                ) : (
                                    <p className='text-xl font-semibold font-sans px-5 py-0'>{transaction.giver} <b>spent</b> ₹{transaction.amount.toFixed(2)}</p>
                                )}
                                {
                                    transaction.takers !== null ? (
                                        transaction.takers.map((taker) => (
                                            (taker === user.email) ? (
                                                <p className='text-xl font-semibold font-sans px-5 py-0'>You <b>owe</b> ₹{transaction.borrowed.toFixed(2)}</p>
                                            ) : (
                                                <p className='text-xl font-semibold font-sans px-5 py-0'>{taker} <b>owes</b> ₹{(transaction.amount/transaction.num_people).toFixed(2)}</p>
                                            )
                                        ))
                                    ) : (
                                        <p className='text-xl font-semibold font-sans px-5 py-0'>No takers</p>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className='flex items-start mx-5 my-2'>
                            <button className='bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => {
                                axios.delete(process.env.REACT_APP_BACKEND_URL + '/deleteTransaction/' + transaction.id, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    }
                                }).then((response) => {
                                    console.log(response);
                                    window.location.reload();
                                }
                                ).catch((error) => {
                                    console.log(error);
                                }
                                );
                            }}>Delete</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold ml-5 py-2 px-4 rounded' onClick={() => {
                                navigate('/editTransaction/' + transaction.id);
                            }}>Edit</button>
                        </div>

                        </div>
                    ))
                ) : (
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl font-semibold font-sans px-5 py-5'>No transactions found</h1>
                    </div>
                )}
            </div>
        </div>
    ) : (
        navigate('/')
    )
}