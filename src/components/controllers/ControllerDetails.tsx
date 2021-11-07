import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';

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

interface Props {
    controllerName: string,
    measurements: string,
    healthCheck: boolean
}

export const ControllerDetails : React.FC<Props> = ({controllerName, measurements, healthCheck}) => {
    return (
        <CustomCard sx={{ minWidth: 275 }} className={healthCheck ? "healthy" : "ill"} >
            <CustomCardContent>
                <Typography variant="h5" component="div">
                    {controllerName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {measurements}
                    Also:
                    1.list of errors (if there are any) - details for every single measurement healtchcheck
                    2.list of recent measurements
                    3.chart with this controller recent measurements
                </Typography>
            </CustomCardContent>
        </CustomCard>
    );
}