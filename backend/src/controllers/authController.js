import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();

    res.json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const registerSuperAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("super123", 10);

    const admin = await Admin.create({
      name: "Super_Admin",

      email: "super-admin@rqmmyat.com",

      password: hashedPassword,

      role: "super_admin",
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin456", 10);

    const admin = await Admin.create({
      name: "Admin",

      email: "admin@rqmmyat.com",

      password: hashedPassword,

      role: "admin",
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

