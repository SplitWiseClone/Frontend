import { LockClosedIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react';
import axios from "axios";
import NavBar from "./NavBar";
export default function SignUp() {
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  function PromptUser() {
    alert(
      "Your account has been created succesfully!"
    );
  }
  function OnSubmitIndividual() {
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            "/api/user/register/",
          {
            password: regData.password,
            password2: regData.password2,
            email: regData.email,
            first_name: regData.first_name,
            last_name: regData.last_name,
          },
          { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
        )
        .then(function (response) {
          if (response.status === 201) {
            PromptUser();
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    console.log(regData);
  }

  return (
      <>
        <NavBar />
        <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => {
              e.preventDefault();
              OnSubmitIndividual();
            }}>
              {/*<input type="hidden" name="remember" defaultValue="true" />*/}
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={regData.first_name}
                      onChange={(e) => {
                        e.preventDefault();
                        setRegData({...regData, first_name: e.target.value});
                      }}
                      autoComplete="first_name"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={regData.last_name}
                      onChange={(e) => {
                        e.preventDefault();
                        setRegData({...regData, last_name: e.target.value});
                      }}
                      autoComplete="last_name"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Last Name"
                  />
                </div>

                <div>
                  <input
                      id="username"
                      name="email"
                      type="email"
                      value={regData.email}
                      onChange={(e) => {
                        e.preventDefault();
                        setRegData({...regData, email: e.target.value});
                      }}
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email"
                  />
                </div>
                <div>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={regData.password}
                      onChange={(e) => {
                        e.preventDefault();
                        setRegData({...regData, password: e.target.value});
                      }}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                  />
                </div>
                <div>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={regData.password2}
                      onChange={(e) => {
                        e.preventDefault();
                        setRegData({...regData, password2: e.target.value});
                      }}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Re-Enter Password"
                  />
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}