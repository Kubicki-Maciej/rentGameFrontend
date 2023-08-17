import { Box, Button, useTheme } from "@mui/material";
// import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
import Header from "../../components/Header";

function converData(data) {
  const converedData = [];
  data.forEach((e) => {
    const temp_category = [];
    e.category.forEach((category) =>
      temp_category.push(category.name_game_type)
    );
    converedData.push({
      id: e.id,
      name: e.name,
      ean: e.ean,
      max_players: e.max_players,
      category: temp_category,
    });
  });
  return converedData;
}

const Games = ({ data }) => {
  //   console.log(data);
  const [gameSelected, setGameSelected] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "max_players",
      headerName: "Players",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "ean",
      headerName: "ean",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Games" subtitle="Games for borrow" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={converData(data)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={(itm) => setGameSelected(itm)}
        />
      </Box>
    </Box>
  );
};

export default Games;
