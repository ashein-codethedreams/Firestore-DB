// Your React component file
import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "" });

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

  useEffect(() => {
    fetchData();
  }, []);

  // Function to add data to Firestore
  const addDataToFirestore = async () => {
    try {
      const dataCollection = collection(firestore, "lists");
      await addDoc(dataCollection, formData);
      console.log("Data added to Firestore successfully!");
      // After adding data, you may want to refetch the data to update the UI
      fetchData();
    } catch (error) {
      console.error("Error adding data to Firestore:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDataToFirestore();
  };

  return (
    <div>
      <h1>Your Data From Firestore Database</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} {item.age}
          </li>
        ))}
      </ul>
      <br />
      <h3>Add new user</h3>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />{" "}
        <span></span>
        Age:{" "}
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />{" "}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
