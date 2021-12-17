import styled from "styled-components";
import { ControllerTile } from "./ControllerTile";
import { StatusResponseModel } from "./../../store/types";
import { StoreState } from "../../store/rootReducer"; 
import { useSelector } from "react-redux";
import { Spinner } from "../ui/Spinner/Spinner";
import { ReactElement } from "react";

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
                <ControllerTile controllerName={"NOx_Err"} status={statusData.NOx_Err} healthCheck={statusData.NOx_Err===""} />
                <ControllerTile controllerName={"SO2_Err"} status={statusData.SO2_Err} healthCheck={statusData.SO2_Err===""} />
                <ControllerTile controllerName={"O3_Err"} status={statusData.O3_Err} healthCheck={statusData.O3_Err===""} />
                <ControllerTile controllerName={"CO_Err"} status={statusData.CO_Err} healthCheck={statusData.CO_Err===""} />
                <ControllerTile controllerName={"BAM_Err"} status={statusData.BAM_Err} healthCheck={statusData.BAM_Err===""} />
            </ControllersList>
        )
    }

    var spinner = <Spinner/>

    return (
        (isLoading || statusData === null) ? spinner : controllerList
    );
}