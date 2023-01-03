import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function SimplifiedBalance(){
    const [user, setUser] = React.useState(null);
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
            navigate('/');
        });
    } ,[]);
    const [simplifiedBalanceData, setSimplifiedBalanceData] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/overAllBalance/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log("Borrowed from: \n");
            for (let k in response.data.borrowed_from){
                console.log(k+": "+response.data.borrowed_from[k]);
            }
            setSimplifiedBalanceData(response.data);
        }).catch((error) => {
            console.log(error);
        }
        );
    }, []);
    console.log("simplifiedBalanceData: ", simplifiedBalanceData);

    return ((user!==null)
         ? (
            <div>
                <NavBar />
                <h1 className='text-2xl font-semibold font-sans px-5 py-5'>Simplified Balance</h1>
                <div className='flex flex-col items-start'>
                    {simplifiedBalanceData !== null ? (
                        <>
                            <div className='flex flex-col items-start'>
                                <p className='text-xl font-semibold font-sans px-5 py-0'>You Borrowed:</p>
                                {Object.keys(simplifiedBalanceData.borrowed_from).map((key, index) => (
                                    <div key={index}>
                                    <p className='text-xl font-semibold font-sans px-5 py-0'>{key}: {simplifiedBalanceData.borrowed_from[key]}</p>
                                    </div>
                                    ))}
                                <p className='text-xl font-semibold font-sans px-5 py-0 pt-5'>You Lent:</p>
                                {Object.keys(simplifiedBalanceData.lent_to).map((key, index) => (
                                    <div key={index}>
                                    <p className='text-xl font-semibold font-sans px-5 py-0'>{key}: {simplifiedBalanceData.lent_to[key]}</p>
                                    </div>))}
                            </div>
                        </>
                    ) : (
                        <p className='text-xl font-semibold font-sans px-5 py-0'>No Data Found</p>
                    )}
                </div>
            </div>
        ) : (
            navigate('/login')
        ))

}