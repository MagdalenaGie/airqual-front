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
                <ControllerTile controllerName={"NO"} status={statusData.NO} healthCheck={statusData.NO==="00"} />
                <ControllerTile controllerName={"NO2"} status={statusData.NO2} healthCheck={statusData.NO2==="00"} />
                <ControllerTile controllerName={"NOx"} status={statusData.NOx} healthCheck={statusData.NOx==="00"} />
                <ControllerTile controllerName={"SO2"} status={statusData.SO2} healthCheck={statusData.SO2==="00"} />
                <ControllerTile controllerName={"O3"} status={statusData.O3} healthCheck={statusData.O3==="00"} />
                <ControllerTile controllerName={"C0"} status={statusData.CO} healthCheck={statusData.CO==="00"} />
                <ControllerTile controllerName={"PM10"} status={statusData.PM10} healthCheck={statusData.PM10==="00"} />
            </ControllersList>
        )
    }

    var spinner = <Spinner/>

    return (
        (isLoading || statusData === null) ? spinner : controllerList
    );
}