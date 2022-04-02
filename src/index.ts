import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (_, res) => res.send("ok!!"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
