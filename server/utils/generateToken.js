import jwt from "jsonwebtoken";

const generateToken = (res, userId, rememberMe = false) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // return cookie if rememberMe is true
    if (rememberMe) {
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ message: "Token stored in cookies" });
    }
    // return token if rememberMe is false 
    else {
        res.json({ token });
    }
};

export default generateToken;