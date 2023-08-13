import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
//
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
//
import axios from "axios";
//

// imports
import Games from "./scenes/games";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

function App() {
  const [theme, colorMode] = useMode();
  const [dataGames, setDataGames] = useState([]);
  const [loding, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function fetchDataGames() {
    client
      .get(`/game/all_games`)
      .then((actualData) => {
        setDataGames(actualData.data);
      })
      .catch((err) => {
        setError(err.message);
        setDataGames(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setInterval(() => {
      fetchDataGames();
    }, 5000);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/games" element={<Games data={dataGames} />} />
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
