import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

function Todolist() {
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const todo = await fetch(`/api/todo/${user.uid}`);
        const data = await todo.json();
        setNotes(data.data);
      };
      fetchData();
    }
  }, [user]);

  async function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    await fetch(`/api/todo/${user.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
  }

  async function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    await fetch(`/api/todo/${user.uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: notes[id]._id }),
    });
  }

  return (
    <div>
     <div className="bye"> <Header /></div>
      <div className="ok">
      <CreateArea onAdd={addNote} />
     
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={index}
            uid={user.uid}
            title={noteItem.title}
            note={noteItem.note}
            onDelete={deleteNote}
          />
        );
      })}
     
     </div>
    </div>
  );
}

export default Todolist;
