import { Box, useTheme, Typography } from "@mui/material";
// import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Popup from "reactjs-popup";

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

const Customers = ({ data, client }) => {
  const [customerGamesData, setCustomerGamesData] = useState([]);
  console.log(data);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "first_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      flex: 1,
    },

    {
      field: "button",
      headerName: "Rentet Games",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(`jestesmy tutaj ${params.row.id}`);
          console.log(params.row.id);
          client
            .post("game/get_customer_borowed_games", {
              customerId: params.row.id,
            })
            .then((response) => {
              console.log(response);
              setCustomerGamesData(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        return (
          <Popup
            modal
            nested
            trigger={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor={colors.grey[100]}
              >
                <button style={{ width: "50px" }} onClick={onClick}>
                  click
                </button>
              </Box>
            }
          >
            <Box
              backgroundColor={colors.grey[100]}
              height="100%"
              width="100%"
              color="black"
            >
              {customerGamesData.map((obj, index) => (
                <Box>
                  <Typography
                    variant="h5"
                    color={colors.grey[900]}
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                  >
                    Id rent: {obj.id}
                  </Typography>
                  <Typography
                    variant="h5"
                    color={colors.grey[900]}
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                  >
                    Game name: {obj.game.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    color={colors.grey[900]}
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                  >
                    Date start rent: {obj.date_borow_start}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Popup>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Rent Game" subtitle="Chose game to borrow" />
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Customers;
