const csv = require("csv-parser");
//const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

fs.createReadStream("database.csv")
  .pipe(csv({}))
  .on("data", (data) => {
    console.log(data);
  });

// const csvWriter = createCsvWriter({
//   path: "database.csv",
//   header: [
//     { id: "userid", title: "UserID" },
//     { id: "datetime", title: "DateTime" },
//     { id: "password", title: "Password" },
//   ],
// });

// const data = [{ userid: "hello", datetime: "hello", password: "hello" }];

// csvWriter
//   .writeRecords(data)
//   .then(() => console.log("data has been written successfully"));

fs.appendFile("database.csv", "\n33,33,33", (err) => {
  if (err) {
    throw err;
  }
  console.log("File is updated.");
});
