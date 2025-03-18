import React, { useEffect, useState } from 'react'
import { DataTable } from '../../components/DataTable';
import { Typography, Box, Skeleton } from '@mui/material';
import { useTheme } from '@emotion/react';
import BirdIcon from '../../components/BirdIcon';
import { GiChicken } from "react-icons/gi";
import { GridDeleteIcon } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { gql, useMutation, useQuery } from '@apollo/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Grid from '@mui/material/Grid2'
import { Button } from "@mui/material";
import { ReusableForm } from '../../components/formComponent';
import * as Yup from "yup";
import axios from 'axios';
import { EditForm } from '../../components/editFormComponent';


export const FarmMgntBird = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [imageUrls, setImagesUrls] = useState([]);
    const [selectedBird, setSelectedBird] = useState('');
    const [idtoDelete, setIdToDelete] = useState('');
    const API_URL = `${import.meta.env.VITE_API_URL}`



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Category', width: 130 },
        { field: 'totalCost', headerName: 'Total Cost', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'weight', headerName: 'Weight', width: 130 },
        { field: 'healthStatus', headerName: 'Health Status', width: 130 },

        {
            field: 'Edit',
            headerName: 'Edit',
            description: 'Edit Bird Information',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <IconButton onClick={() => handleSelectForEdit(params.row.id)} color="secondary">
                    <EditIcon />
                </IconButton>
            ),
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            description: 'Delete Bird',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id)} color="error">
                    <GridDeleteIcon />
                </IconButton>
            ),
        },

    ];

    const rowss = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const BIRDQUERY = gql`
        query GetBirds {
        poultryBirds {
        id
        name
        totalCost
        price
        healthStatus
        weight
    }
}
    `

    const ADDBIRDMUTATION = gql`
    mutation AddBird ($bird: PoultryBirdInput) {
    addPoultryBird(bird: $bird) {
       id, name, price, description, age, healthStatus, weight, totalCost
    }
}
    `

    const EDITBIRDMUTATION = gql`
        mutation EditBird ($id: ID!, $edit: EditPoultryBirdInput) {
        editPoultryBird(id: $id, edit: $edit) {
            id, name, price, description, age, healthStatus, weight, totalCost

    }
}
    `

    const DELETEMUTATION = gql`
        mutation deleteBird ($id: ID!) {
        deletePoultryBird(id: $id) {
            id
            name, 
            price
        }
    }
    `



    const { data, error, loading } = useQuery(BIRDQUERY);

    // console.log(data.poultryBirds, error, loading)

    // const rows = data ? data?.poultryBirds :  [];

    useEffect(() => {
        if (data?.poultryBirds) {
            setRows(data.poultryBirds)
        }
    }, [data])

    const [editPoultryBird, { data: editData, error: editError, loading: editLoading }] = useMutation(EDITBIRDMUTATION);


    const handleSelectForEdit = (id) => {
        setSelectedBird(id); // Save the selected bird in state
        setShowEditForm(true); // Open the form for editing
    };


    const handleEdit = async (values) => {
        setShowEditForm(true)
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
            setImagesUrls(uploadImages?.data?.imageUrls)


            const mergedValues = { ...values, images: uploadImages?.data?.imageUrls };



            await editPoultryBird({ variables: { id: selectedBird, edit: mergedValues } });



        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (editData) {
            setRows((prev) => {
                const newData = prev.filter(item => item.id !== selectedBird);
                setSelectedBird('');
                return [...newData, editData.editPoultryBird]
            })
        }
    }, [editData])


    const [deletePoultryBird, { data: deleteData, error: deleteError, loading: deleteLoading }] = useMutation(DELETEMUTATION);
    const handleDelete = async (id) => {
        setIdToDelete(id);
        const confirmDelete = window.confirm(`Are you sure you want to delete the item?`);
        if (!confirmDelete) return;
        await deletePoultryBird({ variables: { id } });

        // setRows(prev => prev.filter(item => item.id !== id)); // ✅ Correctly updates state
    };
    useEffect(() => {
        if (deleteData) {
            setRows((prev) => {
                return prev.filter(item => item.id !== setIdToDelete)
            })
        }

    }, [deleteData])


    const handlePopupForm = () => {
        setShowForm(true);
    }

    const handlePopupEditForm = () => {
        setShowEditForm(true)
    }

    const [addPoultryBird, { data: addData, error: addError, loading: addLoading }] = useMutation(ADDBIRDMUTATION);
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
            setImagesUrls(uploadImages?.data?.imageUrls)

            let { name, price, description, age, healthStatus, weight, totalCost, images } = values;

            const mergedValues = { ...values, images: uploadImages?.data?.imageUrls };



            await addPoultryBird({ variables: { bird: mergedValues } });



        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (addData) {
            setRows(prev => [...prev, addData.addPoultryBird]); // ✅ Correct way to update state immutably
        }
    }, [addData]);


    return (
        <>
            <Box display={"flex"} flexDirection={'column'}>
                <Grid container bgcolor={theme.palette.secondary.main} padding={{ xs: 1, md: 3 }}>
                    <Grid size={10}>
                        <Typography display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} variant='h3' color={theme.palette.text.white} textAlign={'center'}>Bird Catalogue Management <GiChicken size={50} /></Typography>
                    </Grid>
                    <Grid size={2} alignItems={'center'} justifyContent={'center'}>
                        <Box height={"100%"} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{
                            cursor: 'pointer'
                        }} onClick={handlePopupForm}>
                            <AddRoundedIcon sx={{
                                color: theme.palette.text.white,
                                fontSize: "30px"
                            }} />
                        </Box>
                    </Grid>
                </Grid>


                {(loading || addLoading || editLoading || deleteLoading) ?
                    (<Box display={"flex"} flexDirection={'column'} gap={3}>
                        <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                        <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                        <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                        <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                        <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                        {/* <Skeleton variant="rectangular" width={"100%"} height={20} />
                            <Skeleton variant="rectangular" width={"100%"} height={20} /> */}
                    </Box>)
                    : <DataTable rows={rows} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />
                }


            </Box>

            {showForm &&
                (<ReusableForm

                    open={showForm}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleSubmit}
                    title={"Add new Item"}
                    fields={[
                        { name: "name", label: "Name", validation: Yup.string().required("Name is required") },
                        { name: "price", label: "Price", type: "number", validation: Yup.number().required("Price is required") },
                        { name: "age", label: "Age(Weeks)", type: "number", validation: Yup.number().required("Age is required").min(0.1, "Age must be at least 1") },
                        { name: "description", label: "Description", validation: Yup.string().required("Description is required") },
                        { name: "weight", label: "Weight(kg)", type: "number", validation: Yup.number().required("Weight is required").min(0.1, 'Weight cannot be less that 0.1') },
                        { name: "totalCost", label: "Total Cost", type: "number", validation: Yup.number().required("Total Cost is required") },
                        {
                            name: "healthStatus", type: 'select', label: "Health Status", options: [
                                "sick",
                                "healthy",
                                "vaccinated",
                                "dead",
                            ], validation: Yup.string().required("Total Cost is required")
                        },
                        { name: "images", label: "Upload Photo", type: "file", accept: "image/*", validation: Yup.mixed().required("Image is required") },

                    ]}
                />)
            }

            {showEditForm && (
                <ReusableForm

                    open={handlePopupEditForm}
                    onClose={() => setShowEditForm(false)}
                    onSubmit={handleEdit}
                    title={'Edit Item'}
                    fields={[
                        { name: "name", label: "Name", validation: Yup.string().required("Name is required") },
                        { name: "price", label: "Price", type: "number", validation: Yup.number().required("Price is required") },
                        { name: "age", label: "Age(Weeks)", type: "number", validation: Yup.number().required("Age is required").min(1, "Age must be at least 1") },
                        { name: "description", label: "Description", validation: Yup.string().required("Description is required") },
                        { name: "weight", label: "Weight(kg)", type: "number", validation: Yup.number().required("Weight is required") },
                        { name: "totalCost", label: "Total Cost", type: "number", validation: Yup.number().required("Total Cost is required") },
                        {
                            name: "healthStatus", type: 'select', label: "Health Status", options: [
                                "sick",
                                "healthy",
                                "vaccinated",
                                "dead",
                            ], validation: Yup.string().required("Total Cost is required")
                        },
                        { name: "images", label: "Upload Photo", type: "file", accept: "image/*", validation: Yup.mixed().required("Image is required") },

                    ]}
                />
            )}



        </>

    )
}
