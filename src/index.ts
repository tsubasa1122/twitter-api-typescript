import express, { Request, RequestHandler, Response } from "express";
import Router from "express-promise-router";
import { Client } from "twitter-api-sdk";
import UserRepository from "./repositories/twitter/userRepository";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = Router();
const PORT = 8000;

app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.get("/", (_, res: Response) => res.send("ok!!"));

// Twitter APIのClientを作成する
const twitterClient = new Client(
  process.env.TWITTER_BEARER_TOKEN || "test_token"
);

// ユーザー一覧を取得する;
// async を使用するとESlintで怒られる https://stackoverflow.com/questions/67114152/typescript-eslint-throwing-a-promise-returned-error-on-a-express-router-async
router.get("/twitter/users", (async (req: Request, res: Response) => {
  const { tweet } = req.query;
  if (typeof tweet !== "string") {
    res.status(400).send({ message: "Tweetの指定が間違っています。" });
    return;
  }

  const userRepository = new UserRepository(twitterClient);
  const users = await userRepository.searchByTweet(tweet);
  res.json({ users });
}) as RequestHandler);

// idに指定したユーザーのフォロワー一覧を取得する;
router.get("/twitter/users/:id/follwers", (async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "不正なリクエストです。" });
    return;
  }
  const userRepository = new UserRepository(twitterClient);
  const users = await userRepository.findFollowers(id);
  console.log(users);
  res.json({ users });
}) as RequestHandler);

app.use(router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
