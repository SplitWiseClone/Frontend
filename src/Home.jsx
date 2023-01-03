import React from 'react';

export default function Home(){
    return(
        <div>
            <h1 className='text-xl text-center '>Welcome To WiseSplit</h1>
            <p className='text-center'>A simple app to split your bills with your friends</p>
            {/* Login button*/}
            <a href="/login" className=' text-xl text-blue-700 active:text-red-600'> Login </a> or <a href="/signup"> Signup</a>
        </div>
    );
}