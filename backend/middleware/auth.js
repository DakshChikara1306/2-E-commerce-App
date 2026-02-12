import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // ✅ Attach to request, NOT body
        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default authUser;
