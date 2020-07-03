const http = require("http");
const express = require("express");
const app = express();

const exerciseRouter = require("./src/routes/exercise");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

app.get("/", (req, res) => res.send("<h1>Custom suunto app backend</h1>"));

app.use("/api/exercise", exerciseRouter);
app.use((request, response) => {
  response.status(404);
  response.json({ error: "Page not found" });
});

const server = http.createServer(app);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
