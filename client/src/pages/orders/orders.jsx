import React, { useEffect, useState } from 'react'
import { DataTable } from '../../components/DataTable';
import { useTheme } from '@emotion/react';
import { Box, Typography, Skeleton } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { gql, useQuery } from '@apollo/client';
import { NoCheckBoxDataTable } from '../../components/noCheckboxSelectionDataTable';

export const Orders = () => {


    const theme = useTheme();
    const [orders, setOrders] = useState([]);


    const ORDERSQUERY = gql`
        query GetAllOrders {
            listOrders {
                id
        customerEmail
        status
        totalAmount
        customerName
        customerPhone
        category
 createdAt
            updatedAt
        items {
                productId
                productName
                quantity
                price 
                itemOriginalCost
        }
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
        { field: 'customerName', headerName: 'Customer Name', width: 130 },
        { field: 'customerEmail', headerName: 'Customer Email', width: 130 },
        { field: 'customerAddress', headerName: 'Customer Address', width: 130 },
        { field: 'customerPhone', headerName: 'Customer phone no', width: 130 },
        {
            field: 'itemId',
            headerName: 'Item ID',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            valueGetter: (value, rows) => {
                return rows?.items?.length ? rows.items[0].productId : '';
            }
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            valueGetter: (value, rows) => {
                return rows?.items?.length ? rows?.items[0].productName : '';
            }
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            valueGetter: (value, rows) => {
                return rows?.items?.length ? rows?.items[0].quantity : '';
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            valueGetter: (value, rows) => {
                return rows?.items?.length ? rows?.items[0].price : '';
            }
        },
        {
            field: 'itemOriginalCost',
            headerName: 'Orignal Cost',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            valueGetter: (value, rows) => {
                return rows?.items?.length ? rows?.items[0].itemOriginalCost : '';
            }
        },
        { field: 'totalAmount', headerName: 'totalAmount', width: 130 },
        {
            field: 'status',
            headerName: 'status',
            width: 90,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 160,
            valueGetter: (value, rows) => {
                // console.log(value)
                return new Date(parseInt(value)).toLocaleDateString(); 
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 90,
            valueGetter: (value, rows) => {
                console.log(value);

                const date = Number(value);
                return new Date(date).toLocaleDateString(); 
            },
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
        //             <GridDeleteIcon />
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

    const { data, loading, error } = useQuery(ORDERSQUERY);

    useEffect(() => {
        if (data) setOrders(data.listOrders);
    }, [data])
    console.log(data)

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} variant='h3' bgcolor={theme.palette.secondary.main} color={theme.palette.text.white} padding={{ xs: 2, md: 5 }} textAlign={'center'}>Order Management <ShoppingBag /></Typography>
            {data ? <NoCheckBoxDataTable rows={orders} columns={columns} /> :
                <Box display={"flex"} flexDirection={'column'} gap={3}>
                    <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                    <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                    <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                    <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                    <Skeleton variant="rectangular" animation='pulse' width={"100%"} height={30} />
                    {/* <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} /> */}
                </Box>
            }        </Box>
    )
}
