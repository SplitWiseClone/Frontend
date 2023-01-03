import React, {useEffect, useState} from 'react';
import axios from "axios";
import NavBar from "./NavBar";
import {useNavigate, useParams} from "react-router-dom";

export default function ResetPassword(){
    const [user, setUser] = React.useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/user/profile/',
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`, "Accept": 'application/json'}}).
        then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        });
    } ,[]);
    const [resetPasswordData, setResetPasswordData] = useState({
        password: "",
        password2: "",
    });
    const {uid, token} = useParams();
    console.log("uid: ", uid, " token: ", token);
    return (
            <div>
                <NavBar />
                <form className="h-[80vh] space-y-6 flex flex-col items-center justify-center" onSubmit={
            (e) => {
                e.preventDefault();
                axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/api/user/resetPassword/"+uid+"/"+token+"/",
                  {
                    password: resetPasswordData.password,
                    password2: resetPasswordData.password2,
                  },
                  { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
                )
                .then(function (response) {
                  console.log(response);
                  if(response.status === 200){
                    navigate('/login');
                  }
                  localStorage.setItem("token", response.data.token.access);
                  console.log(localStorage.getItem("token"));
                  navigate("/");
                  window.reload();
                })
                .catch(function (error) {
                  console.log(error.message);
                });
            }
          }>
            <div className="-space-y-px rounded-md shadow-sm w-1/4 mx-10 flex flex-col items-center">
              <div className='w-full'>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  value={resetPasswordData.password}
                    onChange={(e) => {
                        setResetPasswordData({ ...resetPasswordData, password: e.target.value });
                    }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className='w-full'>
                <input
                  id="password2"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                    value={resetPasswordData.password2}
                    onChange={(e) => {
                      setResetPasswordData({...resetPasswordData, password2: e.target.value});
                    }}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Re Enter Password"
                />
              </div>
            </div>
            <div className='w-1/4 mx-10'>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
            </div>
    );
}