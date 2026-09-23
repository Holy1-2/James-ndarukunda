export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

export function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error("[error]", err.message ?? err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id format." });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate value." });
  }

  const status = err.statusCode ?? 500;
  return res
    .status(status)
    .json({ message: status === 500 ? "Internal server error." : err.message });
}