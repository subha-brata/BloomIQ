import React, { useState } from 'react';
import NoteModal from '../NoteModal/NoteModal';
import './DashboardStyles.css';
import axios from 'axios';

interface Question {
  text: String;
  label: String;
  Confidence: number;
  bloom_level: number;
}

interface NoteProps {
  email:String,
  time: String;
  title: String;
  questions: Question[];
  pinned?: Boolean;
  togglePin?: () => void;
}

const Ques: React.FC<NoteProps> = ({ email,time, title, questions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  

  return (
    <>
      <div className="note" onClick={handleOpenModal}>
        <h2>{title}</h2>
        <span>{time}</span>
        <p>{questions[0].text.substring(0, 50)}...</p>
      </div>
      {isModalOpen && (
        <NoteModal 
          email={email}
          title={title} 
          questions={questions} 
          time={time}
          onClose={handleCloseModal}
          
        />
      )}
    </>
  );
};

export default Ques;
