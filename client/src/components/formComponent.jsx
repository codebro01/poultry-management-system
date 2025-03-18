import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";

export const ReusableForm = ({ open, onClose, onSubmit, fields, title }) => {
  // Define Yup validation schema dynamically
  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation || Yup.string().required(`${field.label} is required`);
      return acc;
    }, {})
  );

  // Set initial values dynamically
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {});

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title || "Form"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            onSubmit(values);
            setSubmitting(false);
            onClose(); // Close modal after submit
          }}
        >
          {({ errors, touched, handleChange, handleBlur, setFieldValue, values}) => (
            <Form>
              <Grid container spacing={2}>
                {fields.map((field) => (
                  <Grid size = {{xs: 12, sm: 6}} key={field.name}>
                    {field.type === "select" ? (
                      <TextField
                        fullWidth
                        select
                        size="small"
                        name={field.name}
                        label={field.label}
                        variant="outlined"
                        value={values[field.name] || ""} // Default value
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : field.type === "file" ? (
                      // **File Upload Field**
                      <input
                        type="file"
                        multiple 
                        name={field.name}
                        onChange={(event) => {
                            setFieldValue(field.name, Array.from(event.currentTarget.files)); // Store all selected files
                        }}
                        onBlur={handleBlur}
                        accept={field.accept || "*"} // Specify allowed file types
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                      />
                    ) : (
                      // **Default TextField**
                      <TextField
                        fullWidth
                        size="small"
                        name={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>

              <DialogActions>
                <Button onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};


