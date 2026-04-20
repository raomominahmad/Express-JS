import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config({
  path: "./.env",
});

let myusername = process.env.PORT;

// console.log(myusername);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDb Connection error", err);
    process.exit(1);
  });

// app.listen(port, () => {
//   console.log(`App listening on port http://localhost:${port}`);
// });
