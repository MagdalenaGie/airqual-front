import styled from 'styled-components';
import { Button, FormControl, Input, InputLabel} from '@mui/material';

interface Props {
  setToken: (userToken: string) => void
}

interface ILoginCredentials {
    login: string | null,
    password: string | null
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

const loginUser = async (credentials: ILoginCredentials) => {
    // send async using axios
    // will return string token

    var token = "123 testtoken"
    return token;
}

export const Login : React.FC<Props> = ({setToken}) => {

    var credentials = {} as ILoginCredentials;
    
    const handleLoginFormSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            //set credentials
            credentials = {
                login : (e.currentTarget.elements[0] as HTMLInputElement).value,
                password: (e.currentTarget.elements[1] as HTMLInputElement).value
            };
            //authenticate and wait for token
            var token = await  loginUser(credentials);
            //after setting token app will automaticly rerender and display main page for logged in user 
            setToken(token);
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