import express from "express";
const app = express();
export default app;

import employeesRouter from "#api/employees";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).send(err.message);
  }
  console.error(err);
  res.status(500).send("Something went wrong.");
});