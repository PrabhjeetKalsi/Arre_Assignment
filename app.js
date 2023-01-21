const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const messages = []; // array to store all the group messages

// API to load all the group messages in a paginated manner
app.get("/messages", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  res.json({
    messages: messages.slice(startIndex, endIndex),
    total: messages.length,
  });
});

// API to create a message in the group
app.post("/messages", (req, res) => {
  const message = req.body.message;
  const group = req.body.group;
  const sender = req.body.sender;
  const timeStamp = new Date();
  messages.push({ group, sender, message, timeStamp });
  res.json({ message: "Message created successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
