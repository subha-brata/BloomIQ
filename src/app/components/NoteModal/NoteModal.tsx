import React from 'react';
import './ModalStyles.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Question {
  text: String;
  label: String;
  Confidence: number;
  bloom_level: number;
}

interface NoteModalProps {
  email: String;
  time: String;
  title: String;
  questions: Question[];
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ time, title, questions, onClose }) => {
  const bloomLevelCounts = questions.reduce((acc, question) => {
    acc[question.bloom_level] = (acc[question.bloom_level] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });
 const  backgroundColor= [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]
  const data = {
    labels: Object.keys(bloomLevelCounts).map(level => `Bloom Level ${level}`),
    datasets: [
      {
        label: 'no of Questions',
        data: Object.values(bloomLevelCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  
  
  const calculate=(bloomLevelCounts:{[key:number]:number})=>{
    const desiredRatios:{[key:number]:number} = {
        1: 0.05,
        2: 0.19,
        3: 0.50,
        4: 0.16,
        5: 0.10
      };
      
      // Calculate total number of questions
      const totalQuestions = questions.length;
      
      // Calculate the actual ratios
      const actualRatios = Object.keys(bloomLevelCounts).reduce((acc, key) => {
        const level = parseInt(key);
        acc[level] = bloomLevelCounts[level] / totalQuestions;
        return acc;
      }, {} as { [key: number]: number });
      
      // Calculate the score
      let score = 0;
      Object.keys(desiredRatios).forEach(key => {
        const level = parseInt(key);
        const desiredRatio = desiredRatios[level];
        const actualRatio = actualRatios[level] || 0;
        const difference = Math.abs(desiredRatio - actualRatio);
        score += (1 - difference);
      });
      
      // Normalize the score to be out of 100
      score = (score / Object.keys(desiredRatios).length) * 100;
      
      return score;
      
  }
//   const centerTextPlugin: Plugin = {
//     id: 'centerText',
//     beforeDraw: (chart) => {
//       const { width, height, ctx } = chart;
//       ctx.restore();
//       const fontSize = (height / 114).toFixed(2);
//       ctx.font = `${fontSize}em sans-serif`;
//       ctx.fillStyle='white'
//       ctx.textBaseline = 'middle';
//       const textX = Math.round((width - ctx.measureText(text).width) / 2);
//       const textY = height / 2;
//       ctx.fillText(text, textX, textY);
//       ctx.save();
//     },
//   };
  const options = {
    cutout: '95%', // Adjust this value to make the ring narrower or wider
    plugins: {
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const score = calculate(bloomLevelCounts);

  const color = score > 75 ? '#93c47d' : score > 45 ? '#f1c232' : '#e06666';
  //ChartJS.register(centerTextPlugin);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 style={{ fontSize: '25px' }}>{title}</h2>
        <span>{time}</span>
        <div className="chart-container"style={{
            height:"30vh",
            textAlign:"center"
        }}>
          <Doughnut data={data} options={options} style={{
            margin:"auto"
          }} />
        </div>
        <br></br>
        <h1
        style={{
          margin:"auto",
          width:'fit-content',
          backgroundColor:color,
          padding:"5px",
          borderRadius:'5px'
        }}>Score : {score} %</h1>
        <br></br>
        <div>
          {questions.map((q, key) => (
            <p key={key}>
              {key + 1}. {q.text} <div style={{
                backgroundColor:backgroundColor[q.bloom_level-1],
                padding:"5px",
                borderRadius:'5px',
                width:'fit-content'
              }}>{q.label}</div>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
