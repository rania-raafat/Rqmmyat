import cloudinary from "../config/cloudinary.js";
cloudinary.config()

export const uploadImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded"
      });

    }

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
    );

    res.json({
      url: result.secure_url
    });

  } catch (error) {

    console.log("FULL CLOUDINARY ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      message: error.message
    });

  }

};