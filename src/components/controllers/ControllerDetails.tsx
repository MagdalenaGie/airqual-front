import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StoreState } from '../../store/rootReducer';
import { StatusResponseModel } from '../../store/types';
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

interface Props {
    controllerName: string
}

export const ControllerDetails : React.FC<Props> = ({controllerName}) => {
    var statusData = useSelector((state: StoreState) => state.state.statusArray) as StatusResponseModel;
    var healthCheck = statusData[controllerName as keyof StatusResponseModel];

    return (
        <CustomCard sx={{ minWidth: 275 }} className={healthCheck==="00" ? "healthy" : "ill"} >
            <CustomCardContent>
                <Typography variant="h6" component="div">
                    {controllerName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Jakiś krótki opis? 
                </Typography>
                <ParametersTable/>
                <br/>
                <ErrorTable name={controllerName} errCode={healthCheck as string} errTime={statusData.datetime}/>
            </CustomCardContent>
        </CustomCard>
    );
}