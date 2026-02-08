import express from "express";
import logsRoutes from "./routes/logs.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import errorGroupsRoutes from "./routes/errorGroups.routes.js";

const app = express();

app.use(express.json());

app.use("/logs", logsRoutes);
app.use("/error-groups", errorGroupsRoutes);

app.use(errorMiddleware);

export default app;