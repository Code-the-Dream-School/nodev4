import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";

global.user_id = null;
global.users = [];
global.tasks = [];

const app = express();

app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Query:", req.query);
  next();
});
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

let server;
if (!process.env.VITEST) {
  server = app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`),
  );

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error("Server error:", err);
    }
    process.exit(1);
  });

  let isShuttingDown = false;
  async function shutdown(code = 0) {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log("Shutting down gracefully...");
    try {
      await new Promise((resolve) => server.close(resolve));
      console.log("HTTP server closed.");
    } catch (err) {
      console.error("Error during shutdown:", err);
      code = 1;
    } finally {
      console.log("Exiting process...");
      process.exit(code);
    }
  }

  process.on("SIGINT", () => shutdown(0));
  process.on("SIGTERM", () => shutdown(0));
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    shutdown(1);
  });
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
    shutdown(1);
  });
}

export default app;
