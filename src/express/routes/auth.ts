import express from "express";
const router = express.Router();

import AuthenticationService from "../../services/AuthenticationService";
import AuthenticationController from "../../controllers/AuthenticationController";
import FakeUsersRepository from "../../interfaces/FakeUsersRepository";

const fakeUsersRepo = new FakeUsersRepository();
const usersService = new AuthenticationService(fakeUsersRepo);
const controller = new AuthenticationController(usersService);

router.post("/signin", async (req, res) => {
  controller.signIn(req, res);
});
router.post("/signup", controller.signUp);

export default router;
