import { Box, useTheme } from "@mui/material";
// import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
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

const RentedGames = ({ data }) => {
  console.log(data);

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
          console.log(`jestesmy tutaj ${params.id}`);
        };

        return <button onClick={onClick}>Click</button>;
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Games Rented" subtitle="Games rented by customer" />
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
        />
      </Box>
    </Box>
  );
};

export default RentedGames;
