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

// const getControllersList = () => {
//     // AXIOS GET FROM SERVER 
//     var response = ["", "", ""];
//     return response;
// }

export const Controllers : React.FC<Props> = () => {
    // var controllersData = getControllersList();

    // generate gontrollers in loop
    
    return (
        <ControllersLayout>
            <ControllersList>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true} id={1}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={false} id={2}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={false} id={3}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true} id={4}/>
                <ControllerTile controllerName={"name"} measurements={"measurements"} healthCheck={true} id={5}/>
            </ControllersList>
            <div>
                <ControllerDetails controllerName={"name"} measurements={[{name:"pm10", value:111}]} healthCheck={true}/>
            </div>
        </ControllersLayout>
        
    );
}