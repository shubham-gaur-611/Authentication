
import jwt from "jsonwebtoken";
const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};
export default ensureAuthenticated