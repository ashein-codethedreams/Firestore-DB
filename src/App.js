// Your React component file
import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollection = collection(firestore, "lists");
        const snapshot = await getDocs(dataCollection);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Data From Firestore Database</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} {item.age}
          </li>
          // Adjust 'name' based on your actual Firestore document structure
        ))}
      </ul>
    </div>
  );
};

export default App;
