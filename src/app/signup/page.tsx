"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/interfaces/IUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import styles from "./signupPage.module.css"

export default function signupPage() {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/signup", user);
            router.push("/login");
            toast.success("Signup successful");

        } catch (error: any) {
            console.log("Signup failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.column}>
            <h1>Sign up</h1>
            
            <label htmlFor="username" className={styles.label}>Name</label>
                <input 
                id="username" 
                type="text"
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
                className={styles.input}
            />

            <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                id="email" 
                type="email"
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
                className={styles.input}
            />

            <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                id="password" 
                type="password"
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                className={styles.input}
            />

            <button onClick={onSignup} className={styles.signup}>
                Sign up
            </button>

            <button className={styles.login}>
                <Link href="/login" className={styles.link}>Login</Link>
            </button>
        </div>
    )
}
