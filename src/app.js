const express = require("express");
const routes = require("./routes/routes.js");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(morgan("dev"));
app.use(routes);

const port = 3000;

mongoose
  .connect(
    "mongodb+srv://test:1231234@cluster0-3xsrj.gcp.mongodb.net/scheduler?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connection successful"));
app.listen(port, () => console.log(`App listening on port ${port}`));
