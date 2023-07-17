"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/interfaces/IUser";

export default function signupPage() {
    const [user, setUser] = useState<IUser>({} as IUser);
    
    const onSignup = async () => {
    }

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
