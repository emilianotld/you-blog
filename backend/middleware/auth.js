import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization"); // Get the token from the Authorization header
    if (!token) {
      return res.status(403).send("Access denied."); // If no token is provided, deny access
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); // Remove "Bearer " prefix if present
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = verified; // Attach the verified user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any errors that occur during verification
  }
};
