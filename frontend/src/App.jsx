import { useState, useEffect } from "react";

function App() {

    // State for storing backend message
    const [message, setMessage] = useState("");

    // Fetch data from backend when component loads
    useEffect(() => {
        fetch("http://localhost:3000/")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            });
    }, []);

  return (
    <h1>{message}</h1>
  );
};

export default App;