const express = require("express");
const app = express();
const port = 5000;
const csv = require("csv-parser");
const fs = require("fs");
const { assert } = require("console");
const received = [];
const RandExp = require("randexp");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

console.log("hello");
fs.createReadStream("database.csv")
  .pipe(csv({}))
  .on("data", (data) => {
    received.push(data);
  })
  .on("end", () => {
    console.log("Done.");
  });

function readWriteData(user) {
  let temp = received.filter((x) => x.UserID == user);
  console.log(temp);
  if (temp.length === 1) {
    if (Date.now() - parseInt(temp[0].DateTime) >= 30000) {
      return replaceline(user, received);
    } else {
      return temp[0];
    }
  } else {
    return addinline(user, received);
  }
}
function addinline(user, received) {
  let randompassword = new RandExp(/^[0-9,A-Z,a-z]{10}$/).gen();
  let currentseconds = Date.now().toString();
  const csvWriter = createCsvWriter({
    path: "database.csv",
    header: [
      { id: "UserID", title: "UserID" },
      { id: "DateTime", title: "DateTime" },
      { id: "Password", title: "Password" },
    ],
  });
  received.push({
    UserID: user,
    DateTime: currentseconds,
    Password: randompassword,
  });

  csvWriter
    .writeRecords(received)
    .then(() => console.log("data has been written successfully"));
  console.log(received.filter((x) => x === user));
  return { UserID: user, DateTime: currentseconds, Password: randompassword };
}

function replaceline(user, received) {
  let randompassword = new RandExp(/^[0-9,A-Z,a-z]{10}$/).gen();
  let currentseconds = Date.now().toString();
  const csvWriter = createCsvWriter({
    path: "database.csv",
    header: [
      { id: "UserID", title: "UserID" },
      { id: "DateTime", title: "DateTime" },
      { id: "Password", title: "Password" },
    ],
  });
  received.map((x) => {
    if (x.UserID === user) {
      x.DateTime = currentseconds;
      x.Password = randompassword;
    }
  });
  csvWriter
    .writeRecords(received)
    .then(() => console.log("data has been written successfully"));
  console.log(received.filter((x) => x === user));
  return { UserID: user, DateTime: currentseconds, Password: randompassword };
}

app.get("/user/:id", async (req, res) =>
  res.send(readWriteData(req.params.id))
);
app.listen(port, () => console.log(`listening on ${port}`));
