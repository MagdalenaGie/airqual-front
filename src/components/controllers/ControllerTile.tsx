import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CustomCard = styled(Card)({
    margin: '20px',
    '&.healthy': {
        backgroundColor: '#ebfaeb',
    },
    '&.ill': {
        backgroundColor: '#ffebe6',
    },
    '&:hover':{
        margin: '15px'
    }
});

const CustomCardContent = styled(CardContent)({
    display: 'grid',
    gridTemplateColumns: '9fr 1fr',
})

interface Props {
    controllerName: string,
    measurements: string,
    healthCheck: boolean
}

export const ControllerTile : React.FC<Props> = ({controllerName, measurements, healthCheck}) => {
    var healthCheckIcon = healthCheck 
    ? <CheckCircleOutlineIcon color="success" fontSize="large"/>
    : <ErrorOutlineIcon sx={{ color: 'red' }} fontSize="large"/>
    ; 
    return (
        <CustomCard sx={{ minWidth: 275 }} className={healthCheck ? "healthy" : "ill"} >
            <CustomCardContent>
                <div>
                    <Typography variant="h5" component="div">
                        {controllerName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {measurements}
                    </Typography>
                </div>
                {healthCheckIcon}
            </CustomCardContent>
        </CustomCard>
    );
}