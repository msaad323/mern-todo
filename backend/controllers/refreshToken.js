import jwt from "jsonwebtoken";

export const refreshAccessToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Refresh token missing" });
  
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  
      const newAccessToken = jwt.sign(
        { id: payload.id, email: payload.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
  
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      return res.status(403).json({ message: "Invalid refresh token", err });
    }
  };
  