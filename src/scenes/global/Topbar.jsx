import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";

export default function Topbar({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dataGames = data;
  const stringGamesData = [];
  dataGames.forEach((e) => {
    stringGamesData.push(e.name);
  });

  console.log(dataGames);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* <Box display="flex" justifyContent="space-between"  p={2}> */}
      {/* Search section */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      <Autocomplete
          id="combo-box"
          options={stringGamesData}
          sx={{ ml: 2, flex: 1, width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Game" />}
        />

        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box> */}
      {/* Icon section */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
