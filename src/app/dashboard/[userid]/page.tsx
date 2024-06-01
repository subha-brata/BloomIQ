"use client";
import React, { useState,useEffect } from "react";
import "../dashboard.css";
import Ques from "../../components/Ques/Ques";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Navbar from "../../components/Navbar/Navbar";
import AddCircleIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/state/AuthContext";
import { NextRequest } from "next/server";


const Dashboard= () => {
  
  //for question Input to the database
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{
    text:""
  }]);
  const {isAuthenticated,userName,login,logout}=useAuth();//from AuthContext

  const date=new Date();
  
  const questionInput={
    email:userName,
    time:`on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
    title:title,
    questions: questions
  }

  //for the fetched data of the dashboard
  
  interface Question {
    text: String;
    label: String;
    Confidence: number;
    bloom_level: number;
  }
  
  interface NoteProps {
    date:String,
    title: String;
    questions: Question[];
    pinned?: Boolean;
    togglePin?: () => void; 
  }
  const [Notes, setNotes] = useState<NoteProps[]>([])

  

  //to fetch data on reload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('/api/dashboard',{userName:userName});
        setNotes(res.data.data);
        console.log(res)
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch data!');
      }
    };

    fetchData();
  }, []);
  //handling from changes
  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = [...questions];
    values[index].text = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, {"text":""}]);
  };

  const handleRemoveQuestion = (index: number) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };
  //to submit the questionSet
  const handleAddNote = async (e: React.FormEvent) => {
    console.log(questions);
    try {
      e.preventDefault();
      const res=await axios.post('/api/analyse',questionInput);
      if(res.data.status===200) toast('Done');
      const response = await axios.post('/api/dashboard',{userName:userName});
      const fetchedNotes = response.data.data;
      setNotes(fetchedNotes);
      } catch (error) {
      console.log(error);
      toast.error('Something Wrong!!');
    }
    

  };

  const togglePin = (index: number) => {
    const updatedNotes = [...Notes];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
  };

  return (
    <>
    <Navbar login={isAuthenticated}></Navbar>
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
              value={question.text}
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
        {Notes.map((note, index) => (
          <Ques
            key={index}
            date={note.date}
            title={note.title}
            questions={note.questions}
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
