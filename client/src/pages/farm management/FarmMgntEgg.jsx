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
import EggIcon from "@mui/icons-material/Egg"; // Example icon for poultry
import { useMutation, useQuery, gql } from '@apollo/client';
import { ReusableForm } from '../../components/formComponent';
import Grid from "@mui/material/Grid2";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import * as Yup from "yup";
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`


export const FarmMgntEgg = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [imageUrls, setImagesUrls] = useState([]);
    const [selectedEgg, setSelectedEgg] = useState('');



    const EGGSQUERY = gql`
        query EggsQuery {
        poultryEggs {
        types
        id
        images
        pricePerTray
        stock
        eggStatus

    }
}
    
    `
    const ADDEGGMUTATION = gql`
      mutation AddEgg ($egg: AddPoultryEggInput) {
    addPoultryEgg(egg: $egg) {
        id, types, pricePerTray, stock, images, createdAt eggStatus
    }
    }   
    `
    const EDITEGGMUTATION = gql`
        mutation EditEgg ($id: ID!, $edit: EditPoultryEggInput) {
        editPoultryEgg(id: $id, edit: $edit) {
        id, types, pricePerTray, stock, images, createdAt
    }
}
    
    `
    const DELETEMUTATION = gql`
        mutation deleteEggMutation($id: ID!) {
        deletePoultryEgg(id: $id) {
        id,types, pricePerTray, stock, images, eggStatus
    }
}
    `

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'types', headerName: 'Type', width: 130 },
        { field: 'pricePerTray', headerName: 'Price Per Tray', width: 130 },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            width: 90,
        },
        {
            field: 'eggStatus',
            headerName: 'Eggs Condition',
            description: 'The egg is either good or bad',
            sortable: true,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
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

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    const { data: eggsData, error: eggsError, loading: eggsLoading } = useQuery(EGGSQUERY);


    useEffect(() => {
        if (eggsData) {
            setRows(eggsData.poultryEggs)
        }
    }, [eggsData])

    const [addPoultryEgg, { data: addData, error: addError, loading: addLoading }] = useMutation(ADDEGGMUTATION);
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



            await addPoultryEgg({ variables: { egg: mergedValues } });

        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (addData) {
            setRows((prevData) => {
                return [...prevData, addData.addPoultryEgg]
            })
        }

    }, [addData])



    const handlePopupForm = () => {
        setShowForm(true);
    }
    const handleSelectForEdit = (id) => {
        setShowEditForm(true)
        setSelectedEgg(id);

    }

    const handlePopupEditForm = () => {
        setShowEditForm(true)
    }

    const [editPoultryEgg, { data: editData, error: editError, loading: editLoading }] = useMutation(EDITEGGMUTATION);

    const handleEdit = async (values) => {

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



            await editPoultryEgg({ variables: { id: selectedEgg, edit: mergedValues } });



        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (editData) {
            setRows(prevData => {
                const filteredData = prevData.filter(data => data.id !== selectedEgg)
                setSelectedEgg('');
                return [...filteredData, editData.editPoultryEgg]
            })
        }
    }, [editData])

    const [deletePoultryEgg, { data: deleteData, error: deleteError, loading: deleteLoading }] = useMutation(DELETEMUTATION);

    const handleDelete = async (id) => {
        try {

            const confirmDelete = window.confirm('Are you sure you want to delete the student?')

            if(!confirmDelete) return;

            await deletePoultryEgg({variables: {id}});
        }
        catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if(deleteData) {
            setRows(deleteData.deletePoultryEgg);
        }
    }, [deleteData])

    return (
        <>
            <Box display={"flex"} flexDirection={'column'}>
                <Grid container bgcolor={theme.palette.secondary.main} padding={{ xs: 1, md: 3 }}>
                    <Grid size={10}>
                        <Typography display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} variant='h3' color={theme.palette.text.white} textAlign={'center'}>Eggs Catalogue Management <GiChicken size={50} /></Typography>
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

                
                {(eggsLoading || addLoading || editLoading || deleteLoading) ?
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
                        {
                            name: "types", type: 'select', label: "Type", options: [
                                "table",
                                "fertilized",
                            ], validation: Yup.string().required("Egg type is required")
                        }, { name: "pricePerTray", label: "Price Per Tray", type: "number", validation: Yup.number().required("Price is required") },
                        { name: "stock", label: "Stock", type: "number", validation: Yup.number().required("Stock is required") },
                        {
                            name: "eggStatus", type: 'select', label: "Egg Status", options: [
                                "good",
                                "bad",
                            ], validation: Yup.string().required("Total Cost is required")
                        },
                        { name: "totalCost", label: "Total Cost", type: "number", validation: Yup.number().required("Total Cost is required") },
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
                        {
                            name: "types", type: 'select', label: "Type", options: [
                                "table",
                                "fertilized",
                            ], validation: Yup.string().required("Egg type is required")
                        }, { name: "pricePerTray", label: "Price Per Tray", type: "number", validation: Yup.number().required("Price is required") },
                        { name: "stock", label: "Stock", type: "number", validation: Yup.number().required("Stock is required") },
                        {
                            name: "eggStatus", type: 'select', label: "Egg Status", options: [
                                "good",
                                "bad",
                            ], validation: Yup.string().required("Total Cost is required")
                        },
                        { name: "totalCost", label: "Total Cost", type: "number", validation: Yup.number().required("Total Cost is required") },
                        { name: "images", label: "Upload Photo", type: "file", accept: "image/*", validation: Yup.mixed().required("Image is required") },

                    ]}
                />
            )}
        </>
    )
}
