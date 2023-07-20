import { connectToDB } from "@/src/lib/dbConnect";
import User from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


interface RequestBody {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {

    try {
        await connectToDB();
        const {email, password}: RequestBody = await request.json();

        const user = await User.findOne({email: email}).catch((err: any) => {console.log(err.message)});
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validatePassword: boolean = await bcryptjs.compare(password, user.hashedPassword);
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const jwtToken = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: "2h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        console.log(response)
        response.cookies.set("token", jwtToken, {
            httpOnly: true, 
        })
        return response;

    } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
}