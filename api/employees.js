import express from "express";
const router = express.Router();
export default router;

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";


function hasRequiredFields(body) {
  return (
    body !== undefined &&
    body !== null &&
    body.name != null &&
    body.birthday != null &&
    body.salary != null
  );
}

router.param("id", (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }
  req.id = Number(id);
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    if (!hasRequiredFields(req.body)) {
      return res
        .status(400)
        .send("Request body requires: name, birthday, salary.");
    }

    const { name, birthday, salary } = req.body;
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const employee = await getEmployee(req.id);
    if (!employee) return res.status(404).send("Employee does not exist.");
    res.send(employee);
  })
  .delete(async (req, res) => {
    const employee = await deleteEmployee(req.id);
    if (!employee) return res.status(404).send("Employee does not exist.");
    res.sendStatus(204);
  })
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    if (!hasRequiredFields(req.body)) {
      return res
        .status(400)
        .send("Request body requires: name, birthday, salary.");
    }

    const { name, birthday, salary } = req.body;
    const employee = await updateEmployee({
      id: req.id,
      name,
      birthday,
      salary,
    });
    if (!employee) return res.status(404).send("Employee does not exist.");
    res.send(employee);
  });