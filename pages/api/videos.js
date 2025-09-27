// pages/api/videos.js
export default async function handler(req, res) {
  try {
    const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgjHk8hNLjb9BOxgwt0wNKgQ1WsGPHnMX21_n7E-dOKPqBaqDYXZIyHtT2ZZHHyCpha111ZalMErfxya51qIRd-FYp4R5FoPWlCyEkg8Ni5atml5M385412I_nIvmT-_asMlC8dQdvTmwbpWp9dsDPyg9hi43260JZ-CDUKwJf8j9SPeHn-tSnc6sKXuFrDQ701GCl5ikVh6a9lSK74yjRHNCH_xJaEk8iJ12UCluo3KGC39ebl_S__8olR_Doewqnk0I7qN5BYzmcIUSeAM1lVF4xysQ&lib=M9aFFsdBIN4I2pGbj-YJOeFZgXXfbkfm2";
    const response = await fetch(API_URL);
    const json = await response.json();

    // API Apps Script trả về { records: [...] }
    if (json.records) {
      return res.status(200).json(json.records);
    }

    // Nếu API trả về mảng trực tiếp
    if (Array.isArray(json)) {
      return res.status(200).json(json);
    }

    throw new Error("Sai định dạng JSON từ Google Apps Script");

  } catch (err) {
    console.error("API /videos error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
