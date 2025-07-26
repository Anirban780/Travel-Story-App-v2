const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

// Utility function to upload buffer to Cloudinary using stream
function uploadToCloudinary(fileBuffer, folderName = "travel_stories") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

module.exports = uploadToCloudinary;