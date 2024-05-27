import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios, a library for fetching and making HTTP requests.
import "./App.css";

const AuditionData = () => { // Functional React component
    const [data, setData] = useState([]); // useState lets you add state to functional components. `data` is initialized as an empty array, and `setData` will be used to update it.

    useEffect(() => {
        const fetchData = async () => { // fetch data is what it sounds like. 
            try {
                const response = await axios.get('http://localhost:5000/data'); // Sends a GET request from the CLIENTSIDE to the server to fetch data 
                setData(response.data); // Updates the state with the fetched data
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
            <h1>Audition Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item._id}>
                        {item.FIRST} {item.LAST} ({item.NAMETAG}) - {item.INSTRUMENT}, {item.AGE} years old, Experience: {item.EXPERIENCE}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuditionData; // Exporting the component so it can be used in other parts of the application
