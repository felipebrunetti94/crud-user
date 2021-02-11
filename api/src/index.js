const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/crud";

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", uri);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

app.listen(port, host, function () {
  console.log(`Server is listening on ${host}:${port}`);
});
