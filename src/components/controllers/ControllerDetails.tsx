import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import { ErrorTable } from './ErrorTable';
import { ParametersTable } from './ParametersTable';

const CustomCard = styled(Card)({
    margin: '20px',
    height: '95vh',
    '&.healthy': {
        backgroundColor: '#ebfaeb',
    },
    '&.ill': {
        backgroundColor: '#ffebe6',
    }
});

const CustomCardContent = styled(CardContent)({
    
})

interface measurement {
    name: string,
    value: number
}

interface Props {
    controllerName: string,
    measurements: measurement[],
    healthCheck: boolean
}

export const ControllerDetails : React.FC<Props> = ({controllerName, measurements, healthCheck}) => {

    return (
        <CustomCard sx={{ minWidth: 275 }} className={healthCheck ? "healthy" : "ill"} >
            <CustomCardContent>
                <Typography variant="h6" component="div">
                    {controllerName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Jakiś krótki opis? 
                </Typography>
                <ParametersTable/>
                <br/>
                <ErrorTable/>
            </CustomCardContent>
        </CustomCard>
    );
}