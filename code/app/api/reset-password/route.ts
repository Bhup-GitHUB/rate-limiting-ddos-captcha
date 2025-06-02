import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "../generate-otp/route";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email;
  const otp = body.otp;
  const newPassword = body.newPassword;

  if (!email || !otp || !newPassword) {
    return NextResponse.json({
      message: "email otp and newPassword are required",
    });
  }
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after successful reset
    return NextResponse.json({
      message: "Password reset successfully",
    });
  } else {
    return NextResponse.json({
      message: "Invalid OTP",
    });
  }
}
