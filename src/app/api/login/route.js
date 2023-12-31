import userModel from "@/app/models/userModel";
import { connectToDatabase } from "@/app/middleware/connectDB";
import { NextResponse } from "next/server";
//for pass and jwt
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

export async function POST(NextRequest, res){
    try {
        await connectToDatabase();
        const body = await NextRequest.json();
        const {email, password} = body;
        const foundUser = await userModel.findOne({email:email})
        if(!foundUser){
            return NextResponse.json({error:"No user found! Please sign up!"}, {status:404})
        } else { 
            //compare pass
            const comparePass = await bcryptjs.compare(password, foundUser.password)
            if(!comparePass){
                return NextResponse.json({error:"Incorrect Password!"}, {status:401 })
                //pass is right, need to generate a jwt and send
            } else {
                const userIDPayload = {user : foundUser.email};
                const secretKey = process.env.JWT_SECRET;
                const token = await jwt.sign(userIDPayload , secretKey, {expiresIn:"10h"}) //will expire after 1h
                return NextResponse.json({token:token, user:{name:foundUser.name, email: foundUser.email, phone:foundUser.phone, address: foundUser.address}},{status:201})
            }
        }
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}