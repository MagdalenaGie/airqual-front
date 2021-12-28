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
    }
});

const CustomCardContent = styled(CardContent)({
    display: 'grid',
    gridTemplateColumns: '9fr 1fr',
})

interface Props {
    controllerName: string,
    status: string,
    healthCheck: boolean
}

export const ControllerTile : React.FC<Props> = ({controllerName, status, healthCheck}) => {
    var healthCheckIcon = healthCheck 
    ? <CheckCircleOutlineIcon color="success" fontSize="large"/>
    : <ErrorOutlineIcon sx={{ color: 'red' }} fontSize="large"/>
    ; 
    
    return (
        <div>
            <CustomCard sx={{ minWidth: 275 }} className={healthCheck ? "healthy" : "ill"}>
                <CustomCardContent>
                    <div>
                        <Typography variant="h5" component="div">
                            {controllerName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Status: {status}
                        </Typography>
                    </div>
                    {healthCheckIcon}
                </CustomCardContent>
            </CustomCard>
        </div>
    );
}