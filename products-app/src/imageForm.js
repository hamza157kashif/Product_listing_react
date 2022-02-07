import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

async function postImage({ image, description, productname }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);
  formData.append("productname", productname);
  console.log(formData);

  const result = await axios.post(
    "http://localhost:8080/uploadProduct",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(result.data);

  return result.data;
}

const ImageFormAPI = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [productname, setProductName] = useState("");
  const [previewimage, setpreviewImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  //crop
  const [crop, setCrop] = useState({ aspect: 1 / 1 });

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description, productname });
    // setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setpreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  // const PreviewImage = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
  //   setImage(URL.createObjectURL(event.target.files[0]));

  //   var oFReader = new FileReader();
  //   console.log("in preview");
  //   oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

  //   oFReader.onload = function (oFREvent) {
  //     document.getElementById("uploadPreview").src = oFREvent.target.result;
  //   };
  // };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64Image);

    canvas.toBlob((blob) => {
      setFile(blob);
    });
  }

  return (
    <div className="App">
      <div className="addproductsdiv">
        <form onSubmit={submit}>
          <input
            value={productname}
            placeholder="Name of Product"
            onChange={(e) => setProductName(e.target.value)}
            type="text"
          ></input>

          <input
            className="gap"
            value={description}
            placeholder="Description about Product"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          ></input>

          <input
            id="uploadImage"
            className="gap"
            type="file"
            accept="image/*"
            onChange={fileSelected}
          ></input>

          <button type="submit">Submit</button>
        </form>
      </div>
      <ReactCrop
        className="previewImage"
        src={previewimage}
        onImageLoaded={setImage}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
      />
      <div className="btncontainer">
        <div className="btncenter">
          <button className="btn btn-danger" onClick={getCroppedImg}>
            Crop Image
          </button>
        </div>
      </div>

      {croppedImage && (
        <div className="container">
          <img className="previewImage" alt="croppedimage" src={croppedImage} />
        </div>
      )}
    </div>
  );
};

export default ImageFormAPI;
