"use client";
import Input from "@/components/Input";
import axios from "axios";
import React, {useState, useCallback} from "react";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((curr) => (curr === "login" ? "Register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error: any) {
      console.log(error.message);
    }
  }, [email, name, login, password]);

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
                  label="Username"
                  id="username"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                id="email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
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
                onClick={variant === "login" ? login : register}
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
              <div className="flex flex-row items-center gap-4 mt-5 justify-center">
                <div
                  onClick={() => signIn("google", {callbackUrl: "/profiles"})}
                  className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                  "
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn("github", {callbackUrl: "/profiles"})}
                  className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                  "
                >
                  <FaGithub size={30} />
                </div>
              </div>
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
