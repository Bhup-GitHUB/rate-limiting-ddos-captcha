import { NextRequest, NextResponse } from "next/server";

export const otpStore: Record<string, string> = {};
const rateLimitStore: Record<string, number> = {};

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const now = Date.now();
  const lastRequestTime = rateLimitStore[email];

  if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    const secondsLeft = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - lastRequestTime)) / 1000
    );
    return NextResponse.json(
      { message: `Too many requests. Please wait ${secondsLeft} seconds.` },
      { status: 429 }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for ${email}: ${otp}`);

  otpStore[email] = otp;
  rateLimitStore[email] = now;

  return NextResponse.json({
    message: "OTP generated successfully and you are logged in",
  });
}
