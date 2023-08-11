import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Registration = () => {
  return (
    <>
      <div className="content">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="reg-img">
              <img alt="..." src={require("assets/img/image.webp")} />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="reg-form">
              <div className="reg-heading">
                <h1>Please Register Youself</h1>
              </div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "80ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="E-mail"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="E-mail"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="E-mail"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="E-mail"
                  variant="standard"
                />
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Registration;
