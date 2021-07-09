import express from "express";
const router = express.Router();

import AuthenticationService from "../../services/AuthenticationService";
import AuthenticationController from "../../controllers/AuthenticationController";
import PostgresUsersRepository from "../../interfaces/PostgresUsersRepository";
// import FakeUsersRepository from "../../interfaces/FakeUsersRepository";

// const fakeUsersRepo = new FakeUsersRepository();

const pgUsersRepo = new PostgresUsersRepository();
const usersService = new AuthenticationService(pgUsersRepo);
const controller = new AuthenticationController(usersService);

router.post("/signin", async (req, res) => {
  controller.signIn(req, res);
});
router.post("/signup", async (req, res) => {
  controller.signUp(req, res);
});

export default router;
