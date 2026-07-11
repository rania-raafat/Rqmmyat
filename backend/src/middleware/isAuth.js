import jwt from "jsonwebtoken";
import { promisify } from "util";

export const isAuth = async (req, res, next) => {

  try {

    let token = req.headers.token;

    if (!token) {

      return res.status(401).json({
        message: "Not authorized, token missing"
      });

    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};