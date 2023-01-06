import React, { useState } from "react";
//
export default function Image() {
  const [image, setImage] = useState("");
  let url = "https://lywmqv.sse.codesandbox.io/readimg";
  let read = () => {
    console.log("reading...");
    fetch(url, {
      method: "GET",
      headers: {
        authtoken: localStorage.getItem("token")
      }
    })
      .then((a) => a.json())
      .then(async (resp) => {
        console.log("resp=>", resp);
        console.log("resp2=>", resp[0].img.data.data);
        let convertedbase64 = _arrayBufferToBase64(resp[0].img.data.data);
        console.log("buffer=>", convertedbase64);
        setImage(convertedbase64);
        //
      })
      .catch((e) => console.log("error in reading image", e));
    //
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  //

  return (
    <>
      <button onClick={() => read()}>fetch</button>
      <img src={`data:image/png;base64,${image}`} alt="" />
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// //
// export default function Image() {
//   const [image, setImage] = useState([]);
//   //// let url = "https://lywmqv.sse.codesandbox.io/img";
//   let url = "https://lywmqv.sse.codesandbox.io/readimg";
//   let read = () => {
//     console.log("reading...");
//     fetch(url, {
//       method: "GET",
//       headers: {
//         authtoken: localStorage.getItem("token")
//       }
//     })
//       .then((a) => a.json())
//       .then((resp) => setImage(resp))
//       .catch((e) => console.log("error in reading image", e));
//     //
//     // axios;
//     // .get(url)
//     // .then((resp) => setImage(resp.data))
//     // .catch((e) => console.log("error in fetching"));
//     //
//   };

//   return (
//     <>
//       <div>
//         {image.map((e) => {
//           const base64String = btoa(
//             String.fromCharCode(...new Uint8Array(e.img.data.data))
//           );
//           <img src={`data:image/png;base64,${base64String}`} alt="" />;
//         })}
//       </div>
//       <button onClick={() => read()}>fetch</button>
//     </>
//   );
// }
