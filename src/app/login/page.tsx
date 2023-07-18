"use client";
import styles from './loginPage.module.css'
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/interfaces/IUser";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
 
export default function loginPage() {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user);
            console.log(response.data);
            toast.success("Login successful");
            
        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.con}>
            <h1>Login</h1>

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

            <button onClick={onLogin}>
                Login
            </button>
            <Toaster />

            <Link href="/signup">Signup instead</Link>
        </div>
    )
}
