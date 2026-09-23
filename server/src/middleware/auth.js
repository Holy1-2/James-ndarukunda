import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "jaems-dev-secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES ?? "7d";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}