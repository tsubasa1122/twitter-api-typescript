import express, { Request, Response } from "express";
import { Client } from "twitter-api-sdk";
import UserRepository from "./repositories/twitter/userRepository";

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
  const tweet = req.query.tweet;
  const userRepository = new UserRepository(twitterClient);
  res.send("ok");
});

// idに指定したユーザーのフォロワー一覧を取得する;
app.get("/twitter/users/:id/follwers", (req: Request, res: Response) => {
  res.send("ok");
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
