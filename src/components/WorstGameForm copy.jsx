import React, { useState } from "react";

const WorstGameForm = () => {
  const [gameName, setGameName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [ean, setEan] = useState(0);
  const [gameType, setGameType] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      gameName,
      maxPlayers,
      ean,
      gameType,
    };
    fetch("http://127.0.0.1/game/create_game/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const generateGameTypeOptions = () => {
    const options = ["Action", "Adventure", "Casual", "Strategy"];
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Name:
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Max Players:
        <input
          type="number"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(e.target.value)}
        />
      </label>
      <br />
      <label>
        EAN:
        <input
          type="number"
          value={ean}
          onChange={(e) => setEan(e.target.value)}
        />
      </label>
      <br />
      <label>
        Game Type:
        <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
          <option value="">Select a game type</option>
          {generateGameTypeOptions()}
        </select>
      </label>
      <br />
      <button type="submit">Create Game</button>
    </form>
  );
};

export default WorstGameForm;
