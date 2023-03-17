import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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
      .post("http://localhost:5000/screenshot", {
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
    <div>
      <div>
        <form>
          <input type="text" id="url" name="url" onChange={dataChange} />
          <input type="submit" value="Take a Screenshot" onClick={submitLink} />
        </form>
        <a href="https://code-crack.pages.dev/">
          {imageurl === "" ? (
            <p>No Image Enter url </p>
          ) : (
            <img src={imageurl} alt="Imag"></img>
          )}
        </a>
      </div>
    </div>
  );
};

export default App;
