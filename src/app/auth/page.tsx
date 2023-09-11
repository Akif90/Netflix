"use client";
import Input from "@/components/Input";
import React, {useState, useCallback} from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((curr) => (curr === "login" ? "Register" : "login"));
  }, []);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-5 py-6 ">
          <img src="/images/logo.png" alt="Logo" className="h-10" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-10 py-10 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-4 font-semibold ">
              {variant === "login" ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col">
              {variant !== "login" && (
                <Input
                  label="Email"
                  id="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  value={email}
                />
              )}

              <Input
                label="Username"
                id="name"
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
                type="text"
                value={username}
              />
              <Input
                label="Password"
                id="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
              />
              <button
                className="
                  bg-red-600
                  py-3
                  rounded-md
                  w-full
                  mt-10
                  hover:bg-red-700
                  transition
                  text-white
                  "
              >
                {variant === "login" ? "Login" : "Register"}
              </button>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already a user?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Let's sign in"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
