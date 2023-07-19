import { connectToDB } from "@/src/lib/dbConnect";
import User from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


interface RequestBody {
    username: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {

    try {
        await connectToDB();
        const {username, email, password}: RequestBody = await request.json();

        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        });

        await newUser.save().catch((err: any) => {return NextResponse.json({ error: err.message }, { status: 400 })});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}