import cloudinary from "../config/cloudinary.js";

export const cloudinaryImageUploader = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
  
      // ✅ Upload each image to Cloudinary
      const uploadedImages = await Promise.all(
        req.files.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "poultry" }, (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }).end(file.buffer);
          });
        })
      );
  
      return res.json({ imageUrls: uploadedImages });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // ✅ Start REST Server on Port 4000