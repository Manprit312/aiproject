// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const { Configuration, OpenAIApi } = require("openai");
// const app = express();

// // Set up the server

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// const secretchatgpt = "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";

// const configuration = new Configuration({
//   apiKey: secretchatgpt,
// });
// const openai = new OpenAIApi(configuration);

// app.post("/chatapiquestion", async (req, res) => {
//   try {
//     const data = req.body.body;
//     console.log(data);
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Give 1 technical  Question  related to ${data} skill`,
//       max_tokens: 1024,
//       n: 1,
//       stop: null,
//       temperature: 0.7,
//     });
//     console.log(completion.data.choices[0].text);
//     return res.send({
//       messege: completion.data.choices[0].text,
//       id: 1,
//     });
//   } catch (error) {
//     console.log(error,">>>>>>>>>>>>>>>.");
//   }

// });
// app.listen(5000, () => console.log(`Server listening on port `));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");
const app = express();

// Set up the server

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const secretchatgpt = "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";

const configuration = new Configuration({
  apiKey: secretchatgpt,
});
const openai = new OpenAIApi(configuration);

app.post("/chatapiquestion", async (req, res) => {
  try {
    const data = req.body.body;
    console.log(data);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give 1 technical  Question  related to ${data} skill`,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    console.log(completion.data.choices[0].text);
    return res.send({
      messege: completion.data.choices[0].text,
      id: 1,
    });
  } catch (error) {
    console.log(error, ">>>>>>>>>>>>>>>.");
  }
});
app.post("/checkAnswer", async (req, res) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Is   this answer ${req.body.answer} right  for question ${req.body.question}`,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    console.log(completion.data.choices[0].text);
    return res.send(completion.data.choices[0].text);
  } catch (error) {
    console.log(error, ">>>>>>>>>>>>>>>.");
  }
});
app.listen(5000, () => console.log(`Server listening on port `));
