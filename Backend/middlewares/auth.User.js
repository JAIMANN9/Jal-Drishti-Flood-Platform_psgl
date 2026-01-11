import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No auth token, access denied", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Error in auth middleware:", error);
    return res
      .status(401)
      .json({ message: "Token is not valid", success: false });
  }
};

//check auth user : /api/user/is-auth

