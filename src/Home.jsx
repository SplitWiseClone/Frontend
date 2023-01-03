import React, {useEffect} from 'react';
import axios from "axios";
import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom";

export default function Home(){
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
            navigate("/");
        });
    } ,[]);
    return (
        (user!==null) ? (
            <div>
                <NavBar />
                <h1 className='text-2xl font-semibold font-sans px-5 py-5'>Welcome to WiseSplit 😂😂</h1>
                <p className='px-5 text-xl pb-5'>Hi {user.first_name} {user.last_name}!</p>
                {/* Login button*/}
            </div>
        )
            : (
                <div>
                    <NavBar />
                    <h1 className='text-2xl font-semibold font-sans px-5 py-5'>Welcome to WiseSplit 😂😂</h1>
                    <p className='px-5 text-xl pb-5'>A simple app to split your bills with your friends</p>
                    {/* Login button*/}
                    <a href="/login" className=' text-xl text-blue-700 pl-5 font-semibold active:text-red-600'> Login </a> or <a className='text-xl text-blue-700 font-semibold active:text-red-600' href="/signup"> Signup</a>
                </div>
            )
    );
}