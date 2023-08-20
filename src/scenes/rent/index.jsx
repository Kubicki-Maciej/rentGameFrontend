import { Box, useTheme, Button } from "@mui/material";
import Popup from "reactjs-popup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import PopUpBorrowGame from "../popupborrowgames";

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

const RentGame = ({ data }) => {
  const [dataGames, setDataGames] = useState([])
  const [gameSelected, setGameSelected] = useState([]);
  const [popUpElement, setPopUpElement] = useState(false);
  const [gameToPopUp, setGameToPopUp] = useState([]);

  useEffect(()=>{
    console.log('gry zostaly zupdatowane');
    console.log(gameSelected);
    selectedGamesToPopUpWindow()

  },[gameSelected])

  useEffect(()=>{
    console.log('wybrane elementy');
    console.log(gameSelected);
    console.log('obiekty elementów');
    console.log(gameToPopUp);
    setDataGames(data)
    
    // selectedGamesToPopUpWindow()
  },[data])

  function selectedGamesToPopUpWindow() {
    const listPopUpGames = []
  
    const idSelected = gameSelected
    dataGames.forEach((game)=>{
     
      if(idSelected.includes(game.id)){
        
        listPopUpGames.push(game)
      }
    })
    console.log(listPopUpGames);
    setGameToPopUp(listPopUpGames)
  }



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
        <DataGrid
          checkboxSelection
          rows={converData(data)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={(itm) => {
          setGameSelected(itm)
          // console.log("item");
          // console.log(itm)
          // console.log('state')
          // console.log(gameSelected);
          // selectedGamesToPopUpWindow()
          }}
        />
      </Box>
      <Popup
        modal
        nested
        position="right center"
        onOpen={()=>{
          
          popUpElement ? setPopUpElement(false) : setPopUpElement(true)
          selectedGamesToPopUpWindow()
          
          
        }}
        onClose={()=>{
          
          popUpElement ? setPopUpElement(false) : setPopUpElement(true)
          console.log('close')
        }}
        trigger={
          <Button
            sx={{ marginTop: 2 }}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => {
              
              
        
            }}
          >
            Rent Game
          </Button>
        }
      >
        
          
        <PopUpBorrowGame trigger={popUpElement} data={gameToPopUp} />
        
      </Popup>
    </Box>
  );
};

export default RentGame;
