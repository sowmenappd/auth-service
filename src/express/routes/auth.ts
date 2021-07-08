import express from "express";
const router = express.Router();

import AuthenticationService from "../../services/AuthenticationService";
import AuthenticationController from "../../controllers/AuthenticationController";
import FakeUsersRepository from "../../interfaces/FakeUsersRepository";

const users = [
  {
    username: "abcdef",
    // password: "test123",
    salt: "$2b$14$SiMvz5CxSmK.JRSHbsCdZe",
    hash: "$2b$14$SiMvz5CxSmK.JRSHbsCdZems3ET9apBH9OXmcx38Ky0Nl/WsMl88a",
  },
  {
    username: "xyzabc",
    // password: "test234",
    salt: "$2b$14$5VbVka1YgWciB87HSlmNp.",
    hash: "$2b$14$5VbVka1YgWciB87HSlmNp.JjkerPge.RBJly9.FqANUCUsjzCxzEK",
  },
];

const fakeUsersRepo = new FakeUsersRepository(users);
const usersService = new AuthenticationService(fakeUsersRepo);
const controller = new AuthenticationController(usersService);

router.post("/signin", async (req, res) => {
  controller.signIn(req, res);
});
router.post("/signup", async (req, res) => {
  controller.signUp(req, res);
});

export default router;
