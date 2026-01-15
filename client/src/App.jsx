import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    age: 0,
    degree: "",
    isMarried: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setNewUser({
      ...newUser,
      [name]:
        type === "checkbox" ? checked : name === "age" ? Number(value) : value,
    });
  }

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/api/users/");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>Degree: {user.degree}</p>
          <p>Married: {user.isMarried ? "Yes" : "No"}</p>
        </div>
      ))}

      <form
        onSubmit={submitForm}
        style={{ display: "grid", padding: 20, gap: 10, maxWidth: 400 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newUser.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={newUser.degree}
          onChange={handleChange}
        />

        <label>
          Married:
          <input
            type="checkbox"
            name="isMarried"
            checked={newUser.isMarried}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add user</button>
      </form>
    </div>
  );
}
