export const uploadImage = async (file) => {
  const url = "https://api.cloudinary.com/v1_1/dmslnxo1w/upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "travel_story_unsigned"); 

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await res.json();
    return data.secure_url; // or return full `data` if you want more metadata
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return null;
  }
};
