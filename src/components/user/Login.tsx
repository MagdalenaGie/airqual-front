import styled from 'styled-components';
import { Alert, Button, FormControl, Input, InputLabel} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../store/actions';
import { useState } from 'react';
import { StoreState } from '../../store/rootReducer';

interface Props {
}

interface ILoginCredentials {
    login: string ,
    password: string
}

export const Form = styled.form`
  border: 1px solid green;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  margin: auto;
  margin-top:30vh;
`;

export const Login : React.FC<Props> = () => {

    const [showError, setShowError] = useState(
        {
            shouldRender: false,
            message: ""
        });

    var isAuth = useSelector((state: StoreState) => state.state.isAuth);

    var credentials = {} as ILoginCredentials;
    const dispatch = useDispatch();
    
    const loginUser = async (credentials: ILoginCredentials) => {
        dispatch(login(credentials.login, credentials.password));
    }
    
    const handleLoginFormSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            credentials = {
                login : (e.currentTarget.elements[0] as HTMLInputElement).value,
                password: (e.currentTarget.elements[1] as HTMLInputElement).value
            };
            loginUser(credentials).then(() => {
                if(!isAuth){
                    setShowError({
                        shouldRender: true,
                        message: "Coś poszło nie tak podczas autentykacji! Sprawdź poprawność wprowadzonych danych"
                    })
                }
            })
        }catch(error){
            setShowError({
                shouldRender: true,
                message: "Coś poszło nie tak podczas autentykacji! Spróbuj ponownie później"
            })
        }
    });

    return (
        <Form onSubmit={handleLoginFormSubmit}>
            {showError.shouldRender ? <Alert variant="outlined" severity="error" style={{margin: "20px"}} onClose={() => {setShowError({shouldRender: false, message:""})} }>{showError.message}</Alert> : null}
            <FormControl>
            <InputLabel htmlFor="login">Login</InputLabel>
                <Input type="text" name="login" id="login" required/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Hasło</InputLabel>
                <Input type="password" name="password" id="password" required/>
            </FormControl>
            <Button variant="outlined" type="submit" color="success">Zaloguj</Button>
        </Form>
    );
}