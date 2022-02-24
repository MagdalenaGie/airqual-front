import styled from "styled-components";
import { ControllerTile } from "./ControllerTile";
import { StatusResponseModel } from "./../../store/types";
import { StoreState } from "../../store/rootReducer"; 
import { useSelector } from "react-redux";
import { Spinner } from "../ui/Spinner/Spinner";
import { Fragment, ReactElement } from "react";
import { Alert } from "@mui/material";

// const ControllersLayout = styled.div({
//     display: 'grid',
//     gridTemplateColumns: '2fr 3fr',
//     height: '100%'
// })
const ControllersList = styled.div({
    
})

interface Props {
    //place for props
}

export const Controllers : React.FC<Props> = () => {

    var statusData = useSelector((state: StoreState) => state.state.statusArray) as StatusResponseModel;
    var isLoading = useSelector((state: StoreState) => state.state.isLoadingStatusArray);

    var controllerList: ReactElement<any, any> | null = null;

    if(statusData !== null && !isLoading){
        controllerList = (
            <ControllersList>
                <ControllerTile controllerName={"NOx_Err"} status={statusData.NOx_Err} healthCheck={statusData.NOx_Err==="00"} />
                <ControllerTile controllerName={"SO2_Err"} status={statusData.SO2_Err} healthCheck={statusData.SO2_Err==="00"} />
                <ControllerTile controllerName={"O3_Err"} status={statusData.O3_Err} healthCheck={statusData.O3_Err==="00"} />
                <ControllerTile controllerName={"CO_Err"} status={statusData.CO_Err} healthCheck={statusData.CO_Err==="00"} />
                <ControllerTile controllerName={"BAM_Err"} status={statusData.BAM_Err} healthCheck={statusData.BAM_Err==="00"} />
            </ControllersList>
        )
    }

    let errorMessage = "Wystąpił problem z załadowaniem danych!";

    return (
        <Fragment>
            { isLoading ? <Spinner/> : null}
            { ( ! isLoading && statusData !== null) ? controllerList : null}
            { ( ! isLoading && statusData === null) ? <Alert variant="outlined" severity="error" style={{margin: "20px"} }>{errorMessage}</Alert> : null}
        </Fragment>
    );
}