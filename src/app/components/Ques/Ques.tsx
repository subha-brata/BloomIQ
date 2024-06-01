import React from 'react';
import './DashboardStyles.css';


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

const Ques: React.FC<NoteProps> = ({ title,questions, pinned, togglePin }) => {
  const handleTogglePin = () => {
    if (togglePin) {
      togglePin();
    }
  };

  return (
    <div className="note">
      <h2>{title}</h2>
      {pinned 
        ? <div>{questions.map((q, key) => (
            <p key={key}>{key + 1}. {q.text} - {q.label} (Confidence: {q.Confidence}, Bloom Level: {q.bloom_level})</p>
          ))}
          </div>
        : <p>{questions[0].text} - {questions[0].label} (Confidence: {questions[0].Confidence}, Bloom Level: {questions[0].bloom_level})</p>}
      {pinned !== undefined && questions.length > 1 && (
        <button onClick={handleTogglePin}>{pinned ? 'Show less' : '...Show More'}</button>
      )}
    </div>
  );
};

export default Ques;
