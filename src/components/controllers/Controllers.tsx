import styled from "styled-components";
import { ControllerDetails } from "./ControllerDetails";
import { ControllerTile } from "./ControllerTile";

const ControllersLayout = styled.div({
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    height: '100%'
})
const ControllersList = styled.div({
    
})

interface Props {
    //place for props
}

export const Controllers : React.FC<Props> = () => {
    return (
        <ControllersLayout>
            <ControllersList>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={false}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={false}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true}/>
            </ControllersList>
            <div>
                <ControllerDetails controllerName={"name"} measurements={"measurements"} healthCheck={true}/>
            </div>
        </ControllersLayout>
        
    );
}