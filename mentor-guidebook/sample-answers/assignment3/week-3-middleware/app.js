import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import dogsRouter from "./routes/dogs.js";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} from "./errors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader("X-Request-Id", req.requestId);
  next();
});

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}]: ${req.method} ${req.path} (${req.requestId})`,
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(
  "/images",
  express.static(path.join(__dirname, "public/images")),
);

app.use((req, res, next) => {
  if (req.method !== "POST") {
    return next();
  }
  const contentType = req.get("Content-Type") || "";
  const isJson = contentType.toLowerCase().includes("application/json");
  if (!isJson) {
    return res.status(400).json({
      error: "Content-Type must be application/json",
      requestId: req.requestId,
    });
  }
  next();
});

app.use("/", dogsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 400 && statusCode < 500) {
    if (err instanceof ValidationError) {
      console.warn("WARN: ValidationError", err.message);
    } else if (err instanceof UnauthorizedError) {
      console.warn("WARN: UnauthorizedError", err.message);
    } else if (err instanceof NotFoundError) {
      console.warn("WARN: NotFoundError", err.message);
    } else {
      console.warn(`WARN: ${err.name}`, err.message);
    }
  } else {
    console.error("ERROR: Error", err.message);
  }

  const bodyError =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    error: bodyError,
    requestId: req.requestId,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    requestId: req.requestId,
  });
});

if (!process.env.VITEST) {
  app.listen(3000, () => console.log("Server listening on port 3000"));
}

export default app;
