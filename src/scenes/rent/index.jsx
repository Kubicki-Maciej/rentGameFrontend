import { Box, useTheme, Button } from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import PopUpBorrowGame from "../popupborrowgames";

function converData(data) {
  console.log(data);
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

const RentGame = ({ data }) => {
  const [gameSelected, setGameSelected] = useState([]);
  const [popUpElement, setPopUpElement] = useState(false);

  const navigate = useNavigate();
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
    {
      field: "button",
      headerName: "Action",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(`jestesmy tutaj ${params.id}`);
        };

        return <button onClick={onClick}>Click</button>;
      },
    },
  ];

  return (
    <Box m="20px">
      <h1>RentGame</h1>
      <Box
        m="20px 0 0 0"
        height="65vh"
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
        <PopUpBorrowGame trigger={false}>
          <h1>POPUP</h1>
        </PopUpBorrowGame>
        <DataGrid
          checkboxSelection
          rows={converData(data)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Button
        sx={{ marginTop: 2 }}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => navigate("./borrowgame")}
      >
        Rent Game
      </Button>
    </Box>
  );
};

export default RentGame;
