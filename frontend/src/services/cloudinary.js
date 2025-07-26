export const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/dmslnxo1w/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UNSIGNED_PRESET");

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
};