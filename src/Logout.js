import React, {useEffect} from 'react';
import axios from "axios";
import NavBar from "./NavBar";

export default function Logout(){

    useEffect(() => {
        localStorage.clear();
        // window.reload();
    } ,[]);
    return (
        <div>
            <NavBar />
            <h1 className='text-2xl font-semibold font-sans px-5 py-5'>You have successfully Logged Out</h1>
        </div>
    );
}