import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material"
import { PoultryFeedCard } from "../../components/PoultryFeedCard";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReusableForm } from "../../components/formComponent";
import * as Yup from 'yup'
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios'



export const PoultryFeedList = () => {
  const API_URL = `${import.meta.env.VITE_API_URL}`


  const [poultryFeeds, setPoultryFeeds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [imageUrls, setImagesUrls] = useState([]);


  const FEEDQUERY = gql`
    query QueryFeeds {
    poultryFeeds {
        id
        name, types, weight, price, stock, description, images, isAvailable
    }
}
  `

  const ADDFEEDMUTATION = gql`
    mutation AddBird ($feed: AddFeedsInput) {
    addPoultryFeed(feed: $feed) {
     id, name, types, weight, price, stock, description, images, isAvailable
    }
}
  `

  const { data: feedData, error: feedError, loading: feedLoading } = useQuery(FEEDQUERY);

  useEffect(() => {
    if (feedData) setPoultryFeeds(feedData.poultryFeeds)

  }, [feedData])


  const [addPoultryFeed, { data: addData, error: addError, loading: addLoading }] = useMutation(ADDFEEDMUTATION)
  const handleSubmit = async (values) => {
    try {

      const formData = new FormData();

      // Ensure `values.images` exists and is an array
      if (values.images && values.images.length > 0) {
        values.images.forEach((image) => {
          formData.append("images", image); // Append each file separately
        });
      } else {
        return;
      }

      const uploadImages = await axios.post(`${API_URL}/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      setImagesUrls(uploadImages?.data?.imageUrls);


      let { name, types, weight, price, stock, description, images, isAvailable } = values;

      const isAvailableToBoolean = isAvailable === 'true' ? true : false
      const mergedValues = { ...values, images: uploadImages?.data?.imageUrls , isAvailable: isAvailableToBoolean};



      await addPoultryFeed({ variables: { feed: mergedValues } });



    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(addData) {
      setPoultryFeeds(prevFeeds => {
        return [...prevFeeds, addData.addPoultryFeed]
      })
    }
  }, [addData])


  const handleShowForm = () => setShowForm(true)

  return (


    <>
      <Box sx={{ mt: 4, mb: 5, display: "flex", justifyContent: "center", flexDirection: "column", gap: 5, flexWrap: "wrap"}}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: 5 }}>
          <Button sx={{ display: "inline-flex" }} variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleShowForm}>Add Feed
          </Button>
        </Box>
        <Grid container spacing={3}>
          {poultryFeeds.map((feed) => (
            <Grid item xs={12} sm={6} md={4} key={feed.id}>
              <PoultryFeedCard feed={feed} feedLoading = {feedLoading} addLoading = {addLoading}    />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ReusableForm

        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        title={"Add new Item"}
        fields={[
          { name: "name", label: "Name", validation: Yup.string().required("Name is required") },
          { name: "price", label: "Price", type: "number", validation: Yup.number().required("Price is required") },
          {
            name: "types", type: 'select', label: "Type", options: [
              "STARTER",
              "GROWER",
              "FINISHER",
              "LAYER",
            ], validation: Yup.string().required("Type is required")
          },
          { name: "description", label: "Description", validation: Yup.string().required("Description is required") },
          { name: "weight", label: "Weight(kg)", type: "number", validation: Yup.number().required("Weight is required") },
          { name: "stock", label: "Stock", type: "number", validation: Yup.number().required("Stock is required") },
          {
            name: "isAvailable", type: 'select', label: "Availability Status", options: [
              'true',
              'false',
            ], validation: Yup.boolean().required("Availability Status is required")
          },
          { name: "images", label: "Upload Photo", type: "file", accept: "image/*", validation: Yup.mixed().required("Image is required") },

        ]}
      />
    </>

  );
};

