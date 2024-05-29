import React from 'react';
import './DashboardStyles.css';

interface NoteProps {
  title: string;
  content: string;
  pinned?: boolean;
  togglePin?: () => void; 
}

const Note: React.FC<NoteProps> = ({ title, content, pinned, togglePin }) => {
  const handleTogglePin = () => {
    if (togglePin) {
      togglePin();
    }
  };

  return (
    <div className="note">
      <h2>{title}</h2>
      {pinned?<p>{content}</p>:<p>{content.substring(0,50)}</p>}
      
      {pinned !== undefined && content.length>50 &&(
        <button onClick={handleTogglePin}>{pinned ? 'Show less' : '...Show More'}</button>
      )}
    </div>
  );
};

export default Note;
