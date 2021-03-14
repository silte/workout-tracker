import fs from "fs";
import path from "path";
import express, { Application, Response, Request } from "express";
import { workoutRouter } from "./routes/workout";
import { buildWorkoutSummaryDataCache } from "./cacheBuilder";
import { REACT_APP_PATH } from "./constants/filesNames";
const app = express();

const HOSTNAME: string = "0.0.0.0";
const PORT: number = 4000;


if(process.env.NODE_ENV === "development") {
  buildWorkoutSummaryDataCache(true);
}

app.use("/api/workout", workoutRouter);

const reactFrontendExists = fs.existsSync(
  path.join(`${__dirname}/../${REACT_APP_PATH}index.html`)
);

if (reactFrontendExists) {
  app.use(express.static(path.join(`${__dirname}/../${REACT_APP_PATH}`)));
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.join(`${__dirname}/../${REACT_APP_PATH}index.html`))
  );
} else {
  console.log("React frontend not found, running debug frontpage.");
  app.get("*", (req: Request, res: Response) =>
    res.send("<h1>Custom suunto app backend</h1>")
  );
}

app.use((request: Request, response: Response) => {
  response.status(404);
  response.send({ error: "Page not found" });
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
