const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.post("/sendsms", async (req, res) => {
  let otp = Math.floor(Math.random() * 999999 + 100000);
  client.messages
    .create({
      body: `Here is your OTP ${otp}\n@webotp16.netlify.app #${otp}`,
      from: `${process.env.PHONE}`,
      to: req.body.num,
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).send(message);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

// app.get("/", async (req, res) => {
//   const VoiceResponse = require("twilio").twiml.VoiceResponse;

//   const response = new VoiceResponse();
//   response.say(
//     {
//       voice: "alice",
//       language: "en-IN",
//     },
//     "Hello I am Ritik Jain"
//   );

//   console.log(response.toString());
//   res.writeHead(200, { "Content-Type": "text/xml" });
//   res.end(response.toString());
//   //   res.status(200).send(response.toString());
// });

// app.get("/makecall", async (req, res) => {
//   client.calls
//     .create({
//       url: "http://demo.twilio.com/docs/voice.xml",
//       to: "+918979478808",
//       from: `${process.env.PHONE}`,
//     })
//     .then((call) => console.log(call.sid))
//     .catch((e) => {
//       console.log(e);
//     });
// });

// const VoiceResponse = require("twilio").twiml.VoiceResponse;

// const response = new VoiceResponse();
// response.say(
//   {
//     voice: "alice",
//     language: "en-IN",
//   },
//   "Hello I am Ritik Jain"
// );

// console.log(response.toString());

app.listen(port, (req, res) => {
  console.log(`Listening on ${port}`);
});
