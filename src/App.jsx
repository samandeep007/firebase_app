import React, { useState } from "react";
import firebaseApp from "./config/firebase";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    firebaseApp.addPost({title: title, description: description});
  };

  return (
    <>
      <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" value={title}/>
      <input onChange={(e) => setDescription(e.target.value)}  type="text" name="description" id="description" value={description} />
      <button onClick={handleSubmit} type="submit">Submit</button>
    </>
  );
}
