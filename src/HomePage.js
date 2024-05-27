import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook makes navigation easy.
import "./App.css";
import axios from 'axios'; 

function HomePage() {
    // State variables to store name and id
    const[name, setName] = useState("");
    const[id, setId] = useState("");
    const[musicScore, setMusicScore] = useState(0);
    const[adaptScore, setAdaptScore] = useState(0);
    const[techniqueScore, setTechniqueScore] = useState(0);
    const[prepScore, setPrepScore] = useState(0); 

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
      fetchStudents(); 
    }, []);
    
    // Function to handle name input change
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handleIdChange = (event) => {
      setId(event.target.value);
  };

      
    const fetchStudents = async () => {
      try {
        const reponse = await axios.get('http://localhost:5000/data');
        setStudents(repsonse.data);
      } catch(error) {
        console.error('Error fetching students data', error);
      }
    };

    // Add event handler
    const handleStudentSelect = (event) => {
      setSelectedStudentId(event.target.value);
    };
    
    // Function to handle ranking
    const handleRanking = async () => {
      const newStudent = {
        name, 
        id,
        musicScore,
        adaptScore,
        techniqueScore,
        prepScore
    };
    
    try {
        await axios.post(`http://localhost:5000/data/${setSelectedStudentId}`, updatedScores); // We added this post request so we can post it to the DB lmao 
        navigate('/audition-data'); // Naviate to the audition-data page using app.js, this is what its called
    } catch (error) {
        console.error('Error adding student data', error); 
    }  
  };

    // Basically allows the state to be modified as you change it
    const incrementScore = (setter) => {
        setter((prevScore) => Math.min(prevScore + 1, 3));
    };

    const decrementScore = (setter) => {
        setter((prevScore) => Math.max(prevScore - 1, 0));
    };


      // Function to handle ID input change
   // 5/27/24 stopped here need to change the return to add student select bar
    return (
        <div className="container">
          <h1>Auditionee Ranking</h1>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
            className="input-field"
          />
          <br />
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={handleIdChange}
            className="input-field"
          />
          <br />
        <div className="score-container">
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
    </div>
      );
}

export default HomePage;

//Fix adding student data 