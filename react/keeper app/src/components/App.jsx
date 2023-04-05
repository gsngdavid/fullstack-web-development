import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  let [notes, setNotes] = useState([]);

  function onAdd(note) {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
  }

  function onDelete(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((note, index) => {
        return index !== id
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea
      clicked={onAdd}
      />
      {notes.map((note, index) => {
        return (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          delete={onDelete}
          />)
      })}
      <Footer />
    </div>
  );
}

export default App;
