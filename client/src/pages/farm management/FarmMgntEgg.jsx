import React from 'react'
import { DataTable } from '../../components/DataTable';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import BirdIcon from '../../components/BirdIcon';
import { GiChicken } from "react-icons/gi";
import { GridDeleteIcon } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EggIcon from "@mui/icons-material/Egg"; // Example icon for poultry
import { useMutation, useQuery, gql } from '@apollo/client';


export const FarmMgntEgg = () => {
    const theme = useTheme();

    const EGGSQUERY = gql`
        query EggsQuery {
        poultryEggs {
        types
        id
        images
        pricePerTray
    }
}
    
    `


    const handleEdit = (id) => {
        console.log(`Edit row with ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete row with ID: ${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
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
                <IconButton onClick={() => handleEdit(params.row.id)} color="secondary">
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

    const rows = [
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

const {data: eggsData, error: eggsError, loading: loadingError} =useQuery(EGGSQUERY);

console.log(eggsData)



    return (
        <Box display={"flex"} flexDirection={'column'}>
            <Typography display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} variant='h3' bgcolor={theme.palette.secondary.main} color={theme.palette.text.white} padding={{ xs: 2, md: 5 }} textAlign={'center'}>Egg Catalogue Management <EggIcon color='primary' /></Typography>

            <DataTable rows={rows} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />
        </Box>
    )
}
