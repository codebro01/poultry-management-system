import React from 'react';
import { DataTable } from '../../components/DataTable';
import { Box, Typography, Skeleton } from '@mui/material';
import { People } from '@mui/icons-material';
import {useTheme} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridDeleteForeverIcon } from '@mui/x-data-grid';
import {gql, useQuery} from '@apollo/client';
import { NoCheckBoxDataTable } from '../../components/noCheckboxSelectionDataTable';
import { useState, useEffect} from 'react';

export const Users = () => {
    const theme = useTheme();
    const [users, setUsers] = useState()

    const USERSQUERY = gql`
        query GetUsers  {
            users {
                uid
                role
                id
                username
                phoneNo
                email
                address    
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
        { field: 'uid', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'Email Address', width: 130 },
        {
          field: 'address',
          headerName: 'Address',
          width: 90,
        },
        {
          field: 'phoneNo',
          headerName: 'Contact No.',
          type: 'number',
          width: 90,
        },
        {
          field: 'role',
          headerName: 'Role',
          width: 90,
        },
      
        
        // {
        //     field: 'Edit',
        //     headerName: 'Edit',
        //     description: 'Edit Bird Information',
        //     sortable: false,
        //     width: 160,
        //     renderCell: (params) => (
        //         <IconButton onClick={() => handleEdit(params.row.id)} color="secondary">
        //             <EditIcon />
        //         </IconButton>
        //     ),
        // },
        // {
        //     field: 'Delete',
        //     headerName: 'Delete',
        //     description: 'Delete Bird',
        //     sortable: false,
        //     width: 160,
        //     renderCell: (params) => (
        //         <IconButton onClick={() => handleDelete(params.row.id)} color="error">
        //             <GridDeleteForeverIcon />
        //         </IconButton>
        //     ),
        // },
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

      const {data, error, loading} = useQuery(USERSQUERY);
      useEffect(() =>{
        if(data) setUsers(data.users)
      }, [data])

    return (
        <Box display= {"flex"} flexDirection = {"column"}>
            <Typography display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} variant='h3' bgcolor={theme.palette.secondary.main} color={theme.palette.text.white} padding={{ xs: 2, md: 5 }} textAlign={'center'}>User Management <People /></Typography>
            {data ? <NoCheckBoxDataTable rows={users} columns={columns} /> :             
            <Box display={"flex"} flexDirection={'column'} gap = {3}>
            <Skeleton variant="rectangular" animation = 'pulse' width={"100%"} height={30} />
            <Skeleton variant="rectangular" animation = 'pulse' width={"100%"} height={30} />
            <Skeleton variant="rectangular" animation = 'pulse' width={"100%"} height={30} />
            <Skeleton variant="rectangular" animation = 'pulse' width={"100%"} height={30} />
            <Skeleton variant="rectangular" animation = 'pulse' width={"100%"} height={30} />
            {/* <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} /> */}
            </Box>
            }
        </Box>
    )
}
