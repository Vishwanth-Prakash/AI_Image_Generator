import React, { useRef, useState } from "react";
import "./imagegenerator.css";
import default_image from "../assets/default_image.svg";
import ai_man from "../assets/ai_man_2.jpg";
import Constants from "../Hooks/Constants";
const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(Constants.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Constants.API_KEY}`,
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });

    let data = await response.json();
    let data_array = data.data;
    setImageUrl(data_array[0].url);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        AI IMAGE <span>GENERATOR</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? ai_man : image_url} alt="image" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What you want to see"
        />
        <div className="generate-btn" onClick={ImageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};
export default ImageGenerator;
