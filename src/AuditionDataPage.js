import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios, a library for fetching and making HTTP requests.
import "./App.css";

const AuditionData = () => { // Functional React component
    const [data, setData] = useState([]); // useState lets you add state to functional components. `data` is initialized as an empty array, and `setData` will be used to update it.

    useEffect(() => {
        const fetchData = async () => { // fetch data is what it sounds like. 
            try {
                const response = await axios.get('http://localhost:5000/data'); // Sends a GET request from the CLIENTSIDE to the server to fetch data 
                setData(response.data); // Updates the state with the fetched data, now the state contains the object data from mongoDB, its SET like an objects attribute in encapsulation, we are setting the objects within the data array 
            } catch (error) {
                console.error('Error fetching data', error); // Logs an error message if the request fails
            }
        };

        fetchData(); // Calls the fetchData function when the component mounts, axios clientside http requests, mongoose server side to handle requests
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // Log the data array before rendering the list
    console.log('Data:', data);

    return (
        <div>
            <h1>Student List</h1>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Nametag</th>
                        <th>Instrument</th>
                        <th>Age</th>
                        <th>Experience</th>
                        <th>Music Score</th>
                        <th>Adaptability Score</th>
                        <th>Technique Score</th>
                        <th>Preparation Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <td>{item.FIRST}</td>
                            <td>{item.LAST}</td>
                            <td>{item.NAMETAG}</td>
                            <td>{item.INSTRUMENT}</td>
                            <td>{item.AGE}</td>
                            <td>{item.EXPERIENCE}</td>
                            <td>{item.MUSICSCORE}</td>
                            <td>{item.ADAPTSCORE}</td>
                            <td>{item.TECHNIQUESCORE}</td>
                            <td>{item.PREPSCORE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AuditionData; // Exporting the component so it can be used in other parts of the application
