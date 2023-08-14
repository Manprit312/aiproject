const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.post("/userInfo", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const secretchatgpt='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';

    const configuration = new Configuration({
      apiKey: secretchatgpt,
    });
    const openai = new OpenAIApi(configuration);


app.post('/chatapi',async(req,res)=>{
  const data=req.body.data;
    const completion=openai.createCompletion({
      model: "text-davinci-003",
    prompt: `Give a content only student or teacher realted other gives the response not eligibile ${data} `,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7
    })
    console.log((await completion).data.choices[0].text);
    res.send({
      messege:(await completion).data.choices[0].text
    })

})
