import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material/";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { esES } from "@mui/x-data-grid";

export default function CreateGameForm({ client }) {
  const [gamesCategory, setGamesCategory] = useState([]);

  const [checked, setChecked] = useState([false, false]);
  const [gameTypes, setGameTypes] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    getCategorys();

    console.log("gamesCategory");
    console.log(gamesCategory);
  }, []);
  function createDataGame() {
    // data = {};
    // return data;
  }
  async function createGameWithCategorys(data) {
    client
      .post(`/game/create_game_with_category`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getCategorys() {
    client
      .get(`/game/get_all_games_category`)
      .then((actualData) => {
        setGamesCategory(actualData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function createCategory(data) {
    client
      .post(`/game/create_category`, data)
      .then((response) => {
        console.log(response.data);
        getCategorys();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFormSubmit = (values) => {
    console.log(gameTypes);
    const categoryCheckBoxList = [];
    gameTypes.forEach((element) => {
      if (element.state === true) {
        categoryCheckBoxList.push({ id: element.id });
      }
    });
    const data = {
      name: values.gameName,
      max_players: Number(values.maxPlayers),
      ean: Number(values.ean),
      category: categoryCheckBoxList,
    };
    console.log(data);
    createGameWithCategorys(data);
  };

  const handleCheckboxChange = (index, option) => (event) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);

    const contains = gameTypes.some((type) => type.id === option.id);
    if (!contains) {
      gameTypes.push(option);
    }
    gameTypes.forEach((e) => {
      if (e.id === option.id) {
        if (e.state === false) {
          e.state = true;
        } else {
          e.state = false;
        }
      } else {
        console.log("point 2");
      }
    });

    console.log("gameTypes");
    console.log(gameTypes);
  };

  const generateGameTypeOptions = () => {
    if (gamesCategory) {
      const categoryObjects = [];
      gamesCategory.map((object, index) =>
        categoryObjects.push({
          id: object.id,
          categoryName: object.name_game_type,
          state: false,
          index: index,
        })
      );
      // console.log("jest games category tworzy nowe kategorie");
      return categoryObjects.map((category, index) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckboxChange(index, category)}
              // name={option.categoryName}
            />
          }
          label={category.categoryName}
        />
      ));
    } else {
      return <Box>Loading</Box>;
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE GAME" subtitle="Add new game to database" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gameName}
                name="gameName"
                error={!!touched.gameName && !!errors.gameName}
                helperText={touched.gameName && errors.gameName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Max Players"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxPlayers}
                name="maxPlayers"
                error={!!touched.maxPlayers && !!errors.maxPlayers}
                helperText={touched.maxPlayers && errors.maxPlayers}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ean"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ean}
                name="ean"
                error={!!touched.ean && !!errors.ean}
                helperText={touched.ean && errors.ean}
                sx={{ gridColumn: "span 5" }}
              />
            </Box>
            <Box sx={{}}>
              <FormControl
                sx={{ m: 3 }}
                variant="standard"
                component="fieldset"
              >
                <Box>Take types</Box>
                {generateGameTypeOptions()}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add new game
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const checkoutSchema = yup.object().shape({
  gameName: yup.string().required("required"),
  maxPlayers: yup.string().required("required"),
  ean: yup.string().required("required"),
});

const initialValues = {
  gameName: "",
  maxPlayers: "",
  ean: "",
};
