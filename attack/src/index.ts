import axios from "axios";

// Function to send a single request
async function sendRequest(otp: string) {
  const data = JSON.stringify({
    email: "dasdas@gmail.com",
    otp: otp,
    newPassword: "123123123",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(`OTP ${otp} → Success`, response.data);
  } catch (error: any) {
    console.error(`OTP ${otp} → Failed`, error.response?.data || error.message);
  }
}

// Generate and fire 100 OTPs
/*
async function spamOTPs() {
  for (let i = 0; i < 100; i++) {
    const otp = (100000 + i).toString();
    await sendRequest(otp);
  }
}

spamOTPs();
*/

// Send request with the specific OTP: 489366
sendRequest("755240");
