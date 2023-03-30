import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import downloadIcon from "./tabler_download.svg";

const App = () => {
  const [data, setData] = useState("");
  const [imageurl, setImageurl] = useState("");

  //*What TO take Picture perfect snap shot of you Website try this then

  // useEffect(() => {
  //   console.log("running");
  //   takeScreenshot();
  // });

  // useEffect(() => {
  //   console.log("count2 changed!");
  // }, [data]);

  const takeScreenshot = async (link) => {
    console.log("IN side ");
    await axios
      .post("https://web-page-snap-backend-api.onrender.com/screenshot", {
        url: link,
      })
      .then((res) => {
        console.log(res.data.result.secure_url);
        setImageurl(res.data.result.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataChange = (e) => {
    var expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (e.target.value.match(expression)) {
      setData(e.target.value);
    }
    console.log(e.target.value);
  };

  const submitLink = (e) => {
    e.preventDefault();
    if (data === "") {
      console.log("Empty");
    } else {
      takeScreenshot(data);
    }
  };

  return (
    <div className="App p-16 bg-black w-full min-h-screen max-h-fit text-white flex justify-center items-center">
      <div className="lg:flex ">
        <div className="bg-[#1f1f1f] w-full border-4 border-[#1f1f1f] p-8 rounded-t-md">
          <p className="text-4xl py-4">
            Take Beautiful Screenshot of your website in just one click
          </p>
          <div className="flex flex-col gap-8 py-4">
            <div className="w-full">
              <label>Enter URL</label>
              <br></br>
              <input
                type="text"
                id="url"
                name="url"
                onChange={dataChange}
                className="mt-2 w-full p-2 rounded-md text-black font-bold"
              />
            </div>

            <div className="flex gap-8">
              <input
                type="submit"
                value="Take a Screenshot"
                onClick={submitLink}
                className="bg-white text-black w-fit py-2 px-4 rounded-md cursor-pointer"
              />
              <a
                href={imageurl}
                className=" text-black"
                download="screenshot.png"
                target="_blank"
                rel="noreferrer"
              >
                <button className="flex bg-white py-2 px-4 rounded-md cursor-pointer">
                  <img src={downloadIcon} alt="screenshot" />
                  Download
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r w-full from-pink-500 via-red-500 to-yellow-500 p-8 rounded-b-md">
          <a href="https://code-crack.pages.dev/">
            {imageurl === "" ? (
              <p>No Image Enter url </p>
            ) : (
              <img
                src={imageurl}
                alt="Imag"
                className="w-full rounded shadow-2xl"
              ></img>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
