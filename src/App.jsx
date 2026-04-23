import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddOrUpdate = () => {
    if (!title.trim() || !text.trim()) return;

    const newNote = { title, text };

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = newNote;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setText("");
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setText(notes[index].text);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>

            <div className="actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;