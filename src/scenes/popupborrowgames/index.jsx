import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import Popup from "reactjs-popup";

import { tokens } from "../../theme";

export default function PopUpBorrowGame({ trigger, data }) {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  // console.log(trigger);
  console.log('data która idzie do popupwindow');
  console.log(data);
  const [dataGames, setDataGames] = useState([]) 
  useEffect(()=>{
    setDataGames(data)
  },[])

  return (
    <Box className="PopupWindow"
      
      style={{
        height: "auto",
        width: "auto",
        border: "1px solid black",
        background: colors.primary[400],
        color: "white",
        padding: "30px",
        display: "flex",
        flexDirection:"column"

      }}
    >
      <Box style={{
        
        border: "1px solid white",
      }}>
      <h1>Rent games</h1>
      </Box>
      
      <Box className="gamesWindows"> {
         
        dataGames.map((element ,index )=> {
          
          return(
          <Box key={index}>
            <p> id: {element.id}</p>
            <p> name: {element.name}</p>
            <p> ean: {element.ean}</p>
           
          </Box>
           )
        })
      }
      <Button  
        sx={{ marginTop: 2 }}
        type="submit"
        variant="contained"
        color="secondary"
      
      >Borrow games</Button>
      </Box>
    </Box>
  );

}
