import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token;
  token = req.headers.token;
  if (!token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", response: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ status: "error", response: "Unauthorized: Invalid token" });
  }
};
