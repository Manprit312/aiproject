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
import '../../assets/css/black-dashboard-react.css';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const initialValues = {
  name: "",
  phoneNumber: "",
  skill: "",
  experience: "",
 
  email: "",
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
  name: Yup.string().required("Required"),
  experience:Yup.number().required("Required"),
  
  
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber:
    Yup.number().required("Required")
   
});
const useStyles = makeStyles(theme => ({
// backgroundImage:url(require("asse"))
}));

const UserForm = () => {
  const classes = useStyle();
 

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Grid container spacing={1} className="formGrid" justifyContent="center" alignItems="center">
      <Grid item md={6}>
        <Card className={`${classes.padding} formCard`}  >
          <CardHeader title="REGISTER FORM"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              {console.log(values)}
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justifyContent="center">
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          label="Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={values.name}
                          component={TextField}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm ={6} md={6}>
                      <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                        </Grid> */}
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

                      <Grid item xs={12} sm={12} md={12}>
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
                            name="skill"
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
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          label="Experience"
                          variant="outlined"
                          fullWidth
                          name="experience"
                          value={values.experience}
                          component={TextField}
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} md={12}>
                        <Field
                          label="Phone No."
                          variant="outlined"
                          fullWidth
                          name="phoneNumber"
                          value={values.phoneNumber}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
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
