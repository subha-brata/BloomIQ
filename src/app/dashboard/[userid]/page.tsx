"use client";
import React, { useState } from "react";
import "../dashboard.css";
import Ques from "../../components/Ques/Ques";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Navbar from "../../components/Navbar/Navbar";
import AddCircleIcon from '@mui/icons-material/Add';


const Dashboard:React.FC<{login:boolean}>= ({login}) => {
  const [notes, setNotes] = useState<{ title: string; questions: string[]; pinned: boolean }[]>([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = [...questions];
    values[index] = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };

  const handleAddNote = (e: React.FormEvent) => {
    console.log(`title:${title}, question:${questions}`);
    e.preventDefault();
    if (title && questions.some((question) => question)) {
      setNotes([...notes, { title, questions, pinned: false }]);
      setTitle("");
      setQuestions([""]);
    }

  };

  const togglePin = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
  };

  return (
    <>
    <Navbar login={login}></Navbar>
    <div className="main-content">
      <form className="note-form" onSubmit={handleAddNote}>
        <input type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {questions.map((question, index) => (
          <div key={index} className="question-input">
            <textarea
              placeholder={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleInputChange(index, e)}
            />
            <div className="delete" onClick={() => handleRemoveQuestion(index)}><DeleteOutlineIcon></DeleteOutlineIcon></div>
          </div>
        ))}
        <div style={{cursor:"pointer", color:"white", textAlign:"right"}}  onClick={handleAddQuestion}><AddCircleIcon fontSize="large"></AddCircleIcon></div>
        <button type="submit" onClick={handleAddNote}>Analyse</button>
      </form>
      <span>Previous questions</span>
      <div className="notes-grid">
        {notes.map((note, index) => (
          <Ques
            key={index}
            title={note.title}
            content={note.questions}
            pinned={note.pinned}
            togglePin={() => togglePin(index)}
          />
        ))}
      </div>
    </div>
    </>
  );
};
export default Dashboard;
