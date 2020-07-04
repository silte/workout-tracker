import http from "http";
import express, { Application, Response, Request } from "express";
import { exerciseRouter } from "./routes/exercise";
const app = express();

const HOSTNAME: string = "127.0.0.1";
const PORT: number = 4000;

app.get("/", (req: Request, res: Response) =>
  res.send("<h1>Custom suunto app backend</h1>")
);

app.use("/api/exercise", exerciseRouter);
app.use((request: Request, response: Response) => {
  response.status(404);
  response.send({ error: "Page not found" });
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
