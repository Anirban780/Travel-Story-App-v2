// helper.js
export async function getBackendUrl() {
  const localUrl = import.meta.env.VITE_BACKEND_URL; // Emulator URL
  const prodUrl = import.meta.env.VITE_BACKEND_PROD_URL; // Production URL

  try {
    // Call a lightweight health check or one of your smallest endpoints
    const res = await fetch(`${localUrl}/health`, { method: "GET" });

    if (res.ok) {
      console.log("✅ Using local Firebase Functions:", localUrl);
      return localUrl;
    } else {
      throw new Error("Local server responded but not healthy");
    }
  } catch (err) {
    console.log("⚠️ Falling back to production Firebase Functions:", err, prodUrl);
    return prodUrl;
  }
}
