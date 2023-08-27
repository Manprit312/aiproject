import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
  CardHeader
} from "@material-ui/core";

import { withFormik } from "formik";
import * as yup from "yup";


const validationsForm = {
  name: yup.string().required("Required"),
  surname: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  skills: yup.string().required("Select your skills "),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password"),

};

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
});

const courseCategory = [
  {
    value: "webDevelopment",
    label: "Web Development"
  },
  {
    value: "networking",
    label: "Networking"
  },
  {
    value: "computerScience",
    label: "Computer Science"
  }
];

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
        <CardHeader title="REGISTER FORM" textAlign="center"></CardHeader>
          <CardContent>
            {/* <TextField
              id="website"
              label="Website"
              value={values.website}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.website ? errors.website : ""}
              error={touched.website && Boolean(errors.website)}
              margin="dense"
              variant="outlined"
              fullWidth
            /> */}
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            {/* <TextField
              id="surname"
              label="Last Name"
              value={values.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.surname ? errors.surname : ""}
              error={touched.surname && Boolean(errors.surname)}
              margin="dense"
              variant="outlined"
              fullWidth
            /> */}
            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="skills"
              label="skills"
              value={values.skills}
              onChange={handleChange("skills")}
              helperText={touched.skills ? errors.skills : ""}
              error={touched.skills && Boolean(errors.skills)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {courseCategory.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    website,
    name,
    surname,
    email,
    course,
    password,
    confirmPassword
  }) => {
    return {
      website: website || "",
      name: name || "",
      surname: surname || "",
      email: email || "",
      course: course || "",
      password: password || "",
      confirmPassword: confirmPassword || ""
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values,'values')
    setTimeout(() => {
      // submit to the server
      
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(Form);
