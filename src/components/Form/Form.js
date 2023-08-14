import React from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const initialValues = {
  firstName: "",
  lastName: "",
  occupation: "",
  city: "",
  country: "",
  email: "",
  password: "",
};

const options = [
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "Javascript", value: "Javascript" },
  { label: "React Js", value: "React.js" },
  { label: "Node Js", value: "Node.js" },
];

//password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contain one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contain one uppercase alphabetical character!"
    )
    .matches(numericRegEx, "Must contain one numeric character!")
    .matches(lengthRegEx, "Must contain 6 characters!")
    .required("Required!"),
});

const UserForm = () => {
  const classes = useStyle();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="REGISTER FORM"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Name"
                          variant="outlined"
                          fullWidth
                          name="firstName"
                          value={values.firstName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          name="lastName"
                          value={values.lastName}
                          component={TextField}
                        />
                      </Grid> */}

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Skills
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.occupation}
                            name="occupation"
                          >
                            <MenuItem>None</MenuItem>
                            {options.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Experience"
                          variant="outlined"
                          fullWidth
                          name="Experince"
                          value={values.city}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Phone No."
                          variant="outlined"
                          fullWidthnterview
                          name="Phone No."
                          value={values.country}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}
                    >
                      REGISTER
                    </Button>
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserForm;
