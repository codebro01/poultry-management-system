import * as React from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";

export function StatBox({ title, subTitle, bottomText, iconText, icon, statBoxIconBgColor, flexBasis }) {
    const theme = useTheme();
    const formatNumber = (num) => num.toLocaleString("en-NG");

    return (
        <Box component='paper' sx={{

            display: "flex",
            background: theme.palette.background.paper,
            flexBasis: {flexBasis},
            padding: {
                xs: "12px", 
                sm: "20px",
                md: "30px"
            },
            borderRadius: "6px",
            width: "100%",
            minHeight:"auto !important",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Box sx={{display: "flex", justifyContent:"left", alignItems: "left", flexDirection: "column", gap:"10px"}}>
                <Typography variant='h5' color={theme.palette.text.white} sx={{
                    color: theme.palette.text.darkGrey
                }}>{subTitle}</Typography>
                <Typography variant='h2'><FontAwesomeIcon icon={faNairaSign} />{formatNumber(title)}</Typography>
                <Box sx={{display: "flex", justifyContent:"space-between", alignItems: "center", gap:"10px"}}>
                    <Typography fontSize={13}>{iconText}</Typography>
                    <Typography sx={{
                        color: theme.palette.text.darkGrey, 
                        fontSize: "12px"
                    }}>{bottomText}</Typography>
                </Box>
            </Box>
            <Box sx={{
                background: statBoxIconBgColor,
                width: {
                    xs: "50px", 
                    md: "70px"
                },
                height: {
                    xs: "50px", 
                    md: "70px"
                },
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.text.white

            }}>
                {icon}
            </Box>
        </Box>
    );
}
