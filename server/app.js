const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const port = 3000;
const route = require("./routes/admin");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", route);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
