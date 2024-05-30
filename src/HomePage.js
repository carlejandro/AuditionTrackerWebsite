import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook makes navigation easy.
import axios from 'axios'; 
import "./App.css";

function HomePage() {
    // State variables to store students, selected student, and scores
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [musicScore, setMusicScore] = useState(0);
    const [adaptScore, setAdaptScore] = useState(0);
    const [techniqueScore, setTechniqueScore] = useState(0);
    const [prepScore, setPrepScore] = useState(0);

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/data');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students', error);
            }
        };

        fetchStudents();
    }, []);

    // Function to handle ranking
    const handleRanking = async () => {
        if (!selectedStudent) {
            alert('Please select a student to rank');
            return;
        }

        const updatedScores = {
            musicScore,
            adaptScore,
            techniqueScore,
            prepScore
        };

        try {
            await axios.post(`http://localhost:5000/data/${selectedStudent._id}`, updatedScores); // Post request to update the student's scores in the database
            navigate('/audition-data'); // Navigate to the audition-data page using app.js
        } catch (error) {
            console.error('Error updating student scores', error);
        }
    };

    // Function to increment score
    const incrementScore = (setter) => {
        setter((prevScore) => Math.min(prevScore + 1, 3));
    };

    // Function to decrement score
    const decrementScore = (setter) => {
        setter((prevScore) => Math.max(prevScore - 1, 0));
    };

    return (
        <div className="container">
            <h1>Auditionee Ranking</h1>
            <div className="student-list"> 
                {students.map((student) => (
                    <div
                        key={student._id}
                        className={`student-item ${selectedStudent && selectedStudent._id === student._id ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedStudent(student);
                            setMusicScore(student.MUSICSCORE || 0);
                            setAdaptScore(student.ADAPTSCORE || 0);
                            setTechniqueScore(student.TECHNIQUESCORE || 0);
                            setPrepScore(student.PREPSCORE || 0);
                        }}
                    >
                        {student.FIRST} {student.LAST}
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className="score-container">
                    <h2>Ranking for {selectedStudent.FIRST} {selectedStudent.LAST}</h2>
                    <div>
                        <span className="score-label">Music Score: {musicScore}</span>
                        <button onClick={() => incrementScore(setMusicScore)}>+</button>
                        <button onClick={() => decrementScore(setMusicScore)}>-</button>
                    </div>
                    <div>
                        <span className="score-label">Adaptability Score: {adaptScore}</span>
                        <button onClick={() => incrementScore(setAdaptScore)}>+</button>
                        <button onClick={() => decrementScore(setAdaptScore)}>-</button>
                    </div>
                    <div>
                        <span className="score-label">Technique Score: {techniqueScore}</span>
                        <button onClick={() => incrementScore(setTechniqueScore)}>+</button>
                        <button onClick={() => decrementScore(setTechniqueScore)}>-</button>
                    </div>
                    <div>
                        <span className="score-label">Preparation Score: {prepScore}</span>
                        <button onClick={() => incrementScore(setPrepScore)}>+</button>
                        <button onClick={() => decrementScore(setPrepScore)}>-</button>
                    </div>
                    <br />
                    <button onClick={handleRanking} className="rank-button">Rank</button>
                </div>
            )}
        </div>
    );
}

export default HomePage;
