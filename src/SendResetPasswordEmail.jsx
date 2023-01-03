import { LockClosedIcon } from '@heroicons/react/20/solid'
import React, {useState} from "react";
import axios from "axios";
import NavBar from "./NavBar";

export default function SendResetPasswordEmail() {
  const [userData, setUserData] = useState({
        email: "",
    });
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <>
      <NavBar />

      <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot your password?
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={
            (e) => {
                e.preventDefault();
                axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/api/user/sendResetPasswordEmail/",
                  {
                    email: userData.email,
                  },
                  { headers: { "Content-Type": "application/json", "Accept": "application/json"} }
                )
                .then(function (response) {
                  console.log(response);
                  // localStorage.setItem("token", response.data.token);
                  // console.log(localStorage.getItem("token"));
                })
                .catch(function (error) {
                  console.log(error.message);
                });
            }
          }>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userData.email}
                    onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                    }}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                />

              </div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}