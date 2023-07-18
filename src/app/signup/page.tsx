"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/interfaces/IUser";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function signupPage() {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/user/signup", user);

            // const response:any = await fetch("/api/user/signup", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         username: user.username,
            //         email: user.email,
            //         password: user.password,
            //     }),
            // },);

            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     if (user.username.length < 0 || user.password.length < 0) {
    //         setButtonDisabled(false);
    //     } else {
    //         setButtonDisabled(true);
    //     }
    // }, [user]);
    

    return (
        <div>
            <h1>Signup</h1>
            
            <label htmlFor="username"></label>
            <input 
            id="username" 
            type="text"
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="Username"
            />

            <label htmlFor="email"></label>
            <input 
            id="email" 
            type="email"
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />

            <label htmlFor="password"></label>
            <input 
            id="password" 
            type="password"
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="********"
            />

            <button onClick={onSignup}>
                Signup
            </button>

            <Link href="/login">Login instead</Link>
        </div>
    )
}
