const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


let otpStore = {};


// Gmail setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


// Send OTP API
app.post("/send-otp", async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.json({
      success:false,
      message:"Email required"
    });
  }


  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();


  otpStore[email] = {
    otp: otp,
    expires: Date.now() + 5 * 60 * 1000
  };


  try {

    await transporter.sendMail({

      from: process.env.EMAIL,

      to: email,

      subject:"Parivartan Yatra Email OTP",

      html:`
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });


    res.json({
      success:true,
      message:"OTP sent"
    });


  } catch(error){

    console.log(error);

    res.json({
      success:false,
      message:"Mail failed"
    });

  }

});



// Verify OTP API
app.post("/verify-otp",(req,res)=>{

 const {email,otp}=req.body;


 const data = otpStore[email];


 if(!data){

   return res.json({
    success:false,
    message:"OTP not found"
   });

 }


 if(Date.now() > data.expires){

   delete otpStore[email];

   return res.json({
    success:false,
    message:"OTP expired"
   });

 }


 if(data.otp === otp){

    delete otpStore[email];

    return res.json({
      success:true,
      message:"OTP verified"
    });

 }


 res.json({
  success:false,
  message:"Wrong OTP"
 });


});



app.listen(
 process.env.PORT,
 ()=>{
  console.log(
   `Server running on ${process.env.PORT}`
  );
 }
);