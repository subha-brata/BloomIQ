"use client";
import React, { useState, useEffect } from "react";
import "../dashboard.css";
import Ques from "../../components/Ques/Ques";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbar from "../../components/Navbar/Navbar";
import AddCircleIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/state/AuthContext";
import Page_loader from "@/app/components/loaders/Page_Loader";
import Content_loader from "@/app/components/loaders/Content_loader";

const Dashboard = () => {
  //for question Input to the database
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { isAuthenticated, userName, login, logout } = useAuth(); //from AuthContext
  const date = new Date();

  const questionInput = {
    email: userName,
    time: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
    title: title,
    questions: questions,
  };

  //for the fetched data of the dashboard

  interface Question {
    text: String;
    label: String;
    Confidence: number;
    bloom_level: number;
  }

  interface NoteProps {
    time: String;
    title: String;
    questions: Question[];
    pinned?: Boolean;
    togglePin?: () => void;
  }
  const [Notes, setNotes] = useState<NoteProps[]>([]);

  //to fetch data on reload
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/dashboard", { userName: userName });
        if (res.data.status === 200) {
          setNotes(res.data.data);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  //handling form changes
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const values = [...questions];
    values[index].text = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };

  //to submit the questionSet
  const handleAddNote = async (e: React.FormEvent) => {
    console.log(questionInput);
    try {
      e.preventDefault();
      const res = await axios.post("/api/analyse", questionInput);
      if (res.data.status === 200) toast("Done");
      const response = await axios.post("/api/dashboard", {
        userName: userName,
      });
      const fetchedNotes = response.data.data;
      setNotes(fetchedNotes);
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong!!");
    }
  };

  const togglePin = (index: number) => {
    const updatedNotes = [...Notes];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const allFieldsFilled = title.trim() !== "" && questions.every(q => q.text.trim() !== "");
    setDisableButton(!allFieldsFilled);
  }, [title, questions]);

  return (
    pageLoading ? (<Page_loader></Page_loader>) : (
      <>
        <Navbar login={isAuthenticated}></Navbar>
        <div className="main-content">
          <form className="note-form" onSubmit={handleAddNote}>
            <input
              type="text"
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
                <div
                  className="delete"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  <DeleteOutlineIcon></DeleteOutlineIcon>
                </div>
              </div>
            ))}
            <div
              style={{ cursor: "pointer", color: "white", textAlign: "right" }}
              onClick={handleAddQuestion}
            >
              <AddCircleIcon fontSize="large"></AddCircleIcon>
            </div>
            <button type="submit" disabled={disableButton}>
              {disableButton ? "Disabled" : "Analyse"}
            </button>
          </form>
          <span>Previous questions</span>
          <br></br>
          {loading ? (<Content_loader></Content_loader>) : (
            (Notes.length === 0) ? (
              <h2 style={{
                textAlign: "center"
              }}>No data Found</h2>
            ) : (
              <div className="notes-grid">
                {Notes.map((note, index) => (
                  <Ques
                    key={index}
                    email={userName}
                    time={note.time}
                    title={note.title}
                    questions={note.questions}
                    pinned={note.pinned}
                    togglePin={() => togglePin(index)}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </>
    )
  );
};

export default Dashboard;
