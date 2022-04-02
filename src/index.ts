import express, { Request, Response } from "express";
import { Client } from "twitter-api-sdk";
import UserRepository from "./repositories/twitter/userRepository";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (_, res: Response) => res.send("ok!!"));

// Twitter APIのClientを作成する
const twitterClient = new Client(
  process.env.TWITTER_BEARER_TOKEN || "test_token"
);

// ユーザー一覧を取得する;
app.get("/twitter/users", (req: Request, res: Response) => {
  const { tweet } = req.query;
  if (typeof tweet !== "string") {
    res.status(400).send({ message: "Tweetの指定が間違っています。" });
    return;
  }

  const userRepository = new UserRepository(twitterClient);
  const users = userRepository.searchByTweet(tweet);
  res.json(users);
});

// idに指定したユーザーのフォロワー一覧を取得する;
app.get("/twitter/users/:id/follwers", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "不正なリクエストです。" });
    return;
  }
  const userRepository = new UserRepository(twitterClient);
  const users = userRepository.findFollowers(id);
  res.send({ users });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
