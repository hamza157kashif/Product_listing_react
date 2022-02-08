import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { useNavigate } from "react-router-dom";

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

  const [originalimage, setorginalImage] = useState(null);

  //crop
  const [crop, setCrop] = useState({ aspect: 1 / 1 });

  let navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description, productname });
    navigate("/");
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setorginalImage(URL.createObjectURL(event.target.files[0]));
    setpreviewImage(URL.createObjectURL(event.target.files[0]));
    setFile(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);

    // dataURLtoFile(reader.result, "basic.jpg");
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const finalImage = new File([u8arr], filename, { type: mime });
    setFile(finalImage);
  };

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
    //setCroppedImage(base64Image);
    setpreviewImage(base64Image);

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }

  const restoreImg = () => {
    setpreviewImage(originalimage);
  };

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
          <button className="btn btn-danger btn-sm" onClick={getCroppedImg}>
            Crop Image
          </button>
        </div>
      </div>
      <div className="btncontainer">
        <div className="btncenter">
          <button className="btn btn-danger btn-sm" onClick={restoreImg}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageFormAPI;
