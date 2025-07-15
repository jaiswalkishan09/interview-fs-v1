import express from "express";
import { getEventCounter, updateEventCount } from "./controller/eventCount.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.get("/api/get", getEventCounter);
app.put("/api/update", updateEventCount);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
