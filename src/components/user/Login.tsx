import styled from 'styled-components';
import { Button, FormControl, Input, InputLabel} from '@mui/material';
import { useDispatch } from "react-redux";
import { login } from '../../store/actions';

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
            await  loginUser(credentials);
        }catch(error){
            // act on error 
        }
    });

    return (
        <Form onSubmit={handleLoginFormSubmit}>
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