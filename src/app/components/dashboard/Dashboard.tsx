"use client";
import { useState } from "react";
import "./dashboard.css";
import Ques from "../Ques/Ques";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<{ title: string; content: string; pinned:boolean }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      setNotes([...notes, { title, content, pinned:false }]);
      setTitle("");
      setContent("");
    }
  };
  const togglePin = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
  };

  return (
    <div className="main-content">
      <form className="note-form" onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Add Questions"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Analyse</button>
      </form>
      <span>Previous questions</span>
      <div className="notes-grid">
        {notes.map((ques, index) => (
          <Ques key={index} title={ques.title} content={ques.content} pinned={ques.pinned} togglePin={() => togglePin(index)} ></Ques>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
