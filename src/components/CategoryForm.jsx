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

export default function CreateCategoryForm({ client }) {
  const [gamesCategory, setGamesCategory] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  useEffect(() => {}, []);

  async function createCategory(data) {
    client
      .post(`/game/create_category`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFormSubmit = (values) => {
    const data = {
      name_game_type: values.gameName,
    };
    createCategory(data);
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
                label="Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gameName}
                name="gameName"
                error={!!touched.gameName && !!errors.gameName}
                helperText={touched.gameName && errors.gameName}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create category
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
});

const initialValues = {
  gameName: "",
};
