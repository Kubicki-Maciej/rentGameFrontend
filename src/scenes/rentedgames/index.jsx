import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Header from "../../components/Header";

function converData(data) {
  const converedData = [];
  data.forEach((e) => {
    const temp_category = [];
    e.game.category.forEach((category) =>
      temp_category.push(category.name_game_type)
    );
    converedData.push({
      id: e.id,
      id_customer: e.customer.id,
      name_customer: `${e.customer.first_name} ${e.customer.last_name}`,
      phone_customer: e.customer.phone,
      id_game: e.game.id,
      name_game: e.game.name,
      category_game: temp_category,
      rent_start: e.date_borow_start,
    });
  });

  return converedData;
}

const RentedGames = ({ data, client }) => {
  const [gameSelected, setGameSelected] = useState([]);

  function showSelected() {
    console.log(gameSelected);
    // convert to data
    const data = { borowed_games: [] };
    gameSelected.forEach((id) =>
      data.borowed_games.push({ id_borrow_game: id })
    );
    console.log(data);
    return data;
  }

  function cancelRent() {
    client
      .post(`/game/cancel_borow_game`, showSelected())
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID_RentedGame", flex: 0.5 },

    {
      field: "name_game",
      headerName: "GameName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name_customer",
      headerName: "Customer",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone_customer",
      headerName: "Phone",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "category_game",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "rent_start",
      headerName: "Rental date",
      flex: 1,
    },
    {
      field: "button",
      headerName: "Action_name:Endrent",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params.row.id);

          client
            .post("game/cancel_borow_game", { borrowId: params.row.id })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        return (
          <Button variant="contained" color="secondary" onClick={onClick}>
            Cancel Rent
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Games Rented" subtitle="Games rented by customer" />
      <Box
        m="40px 0 0 0"
        height="60vh"
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
      <Button
        sx={{ m: 2 }}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => cancelRent()}
      >
        Cancel Rent
      </Button>
    </Box>
  );
};

export default RentedGames;
