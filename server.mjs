import jsonServer from "json-server";
import fs from "fs";
import path from "path";

const router = jsonServer.router(path.join(process.cwd(), "src/data/db.json"));
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/logs", (req, res) => {
  const logPath = path.join(process.cwd(), "src/data/logs.json");
  const newLog = req.body;

  let logs = [];
  if (fs.existsSync(logPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(logPath, "utf8") || "[]");
    } catch {
      logs = [];
    }
  }

  logs.push(newLog);
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  res.status(200).json({ status: "ok" });
});

server.use(router);

server.listen(3004);
