import { LockClosedIcon } from '@heroicons/react/20/solid'
import React, {useState} from "react";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function Login() {
    let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    });
  return (
    <>
      <NavBar />
      <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={
            (e) => {
                e.preventDefault();
                axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/api/user/login/",
                  {
                    email: userData.email,
                    password: userData.password,
                  },
                  { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
                )
                .then(function (response) {
                  console.log(response);
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
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="username"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userData.email}
                    onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                    }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                    value={userData.password}
                    onChange={(e) => {
                      setUserData({...userData, password: e.target.value});
                    }}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">

              <div className="text-sm">
                <a href = {'/resetPassword'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >

                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}