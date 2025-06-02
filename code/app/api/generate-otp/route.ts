import { NextRequest, NextResponse } from "next/server";

const otpStore: Record<string, string> = {};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json({
      message: "email is required",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); //generate a 6-digit OTP
  console.log(`Generated OTP: ${otp}`);
  otpStore[email] = otp;

  console.log(`Generated OTP for ${email}: ${otp}`);

  return NextResponse.json({
    message: "OTP generated successfully and you are logged in ",
  });
}
