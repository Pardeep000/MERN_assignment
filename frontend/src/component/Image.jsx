import React, { useState } from "react";
//
export default function Image() {
  const [image, setImage] = useState("");
  let handleImage = (e) => {
    e.preventDefault();
    console.log("uploading image...");
    //
    const formdata = new FormData(e.target);
    setImage(formdata.get("img"));
    //
    console.log("formdata", formdata);
    let url = "https://lywmqv.sse.codesandbox.io/img";
    // //
    fetch(url, {
      method: "POST",
      body: formdata,
      headers: {
        authtoken: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    //
  };
  return (
    <>
      <img
        width={300}
        src={image === "" ? "" : URL.createObjectURL(image)}
        alt=""
      />
      <form onSubmit={handleImage}>
        <input type="file" name="img" id="" />
        <br />
        <button
          type="submit"
          className="btn btn-outline-primary border rounded-pill"
        >
          Upload
        </button>
      </form>
    </>
  );
}

// import React, { useState } from "react";
// //
// export default function Image() {
//   const [image, setImage] = useState("");

//   let uploadImage = async (e) => {
//     console.log(e.target.files[0]);
//     const file = e.target.files[0];
//     //
// const base64 = await convertBase64(file);
// console.log(base64);
// setImage(base64);
//   };

// let convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     //
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (e) => {
//       reject(e);
//     };
//   });
//     //
//   };
//   return (
//     <>
//       <input type="file" onChange={(e) => uploadImage(e)} />
//       <img src={image} alt="" height={200} />
//     </>
//   );
// }
