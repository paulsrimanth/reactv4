import { useState } from "react";

function UploadBook() {
  const [name, Setname] = useState("");
  const [author, Setauthor] = useState("");
  const [publishyear, Setpublishyear] = useState("");
  const [category, Setcategory] = useState("");
  const [imageofbook, Setimageofbook] = useState("");
  const [errors, setErrors] = useState({});
  const formdata = {
    name,
    author,
    publishyear,
    category,
    imageofbook,
  };
  const formDataToSend = new FormData();
  formDataToSend.append("name", formdata.name);
  formDataToSend.append("author", formdata.author);
  formDataToSend.append("publishyear", formdata.publishyear);
  formDataToSend.append("category", formdata.category);
  formDataToSend.append("imageofbook", formdata.imageofbook);

  const handleSubmit = (e) => {
    console.log(localStorage.getItem("token"));
    e.preventDefault();
    const errors = {};
    async function AddBook() {
      const addbook = await fetch("http://localhost:8080/book/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(formDataToSend),
      });

      const adminres = await addbook.json();
      console.log(adminres);
      if (adminres.ok) {
        console.log("added");
      }
    }
    AddBook();

    // createuser();
  };
  return (
    <div>
      <div className="">
        <div>
          <h2>create Admin</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">TITLE:</label>
            <input
              type="text"
              id="email"
              value={name}
              onChange={(e) => Setname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => Setauthor(e.target.value)}
            />
          </div>
          <div>
            {/* //make this drop down */}
            <label htmlFor="publishyear">published year:</label>
            <input
              type="text"
              id="publishyear"
              value={publishyear}
              onChange={(e) => Setpublishyear(e.target.value)}
            />
          </div>
          <div>
            {/* //make this drop down */}
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => Setcategory(e.target.value)}
            />
          </div>
          <div>
            {/* //make this drop down */}
            <label htmlFor="imageofbook">Image Of Book</label>
            <input
              type="file"
              id="imageofbook"
              value={imageofbook}
              onChange={(e) => Setimageofbook(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default UploadBook;
// let formDataToSend = new FormData();
// console.log(formData);
// formDataToSend.append("titleofbook", formData.titleofbook);
// formDataToSend.append("author", formData.author);
// formDataToSend.append("publishyear", formData.publishyear);
// formDataToSend.append("imageofbook", formData.imageofbook);
// console.log(formDataToSend.getAll);
// try {
//   let response = await fetch(
//     `http://localhost:8090/auth/book/upload/${cname}`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },

//       body: formDataToSend,
//     }
//   );
