import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import React, { useCallback, useState } from 'react';
import { login, UserData } from '../api/login';
import { useNavigate } from 'react-router-dom';

export const USER_DATA = "USER_DATA";

export const LoginForm = () => {

    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [checked,setChecked] = useState<boolean>(true);
    const [error,setError] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const onUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length < 15) setUsername(value);
    },[]);

    const onPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length < 20) setPassword(value);
    },[]);

    const onCheckedChange = useCallback(() => {
        setChecked(prev => !prev);
    },[]);

    const onLogin = async () => {
        try {
            var data = await login(username,password);
            if (data === false) {
                setError("Invalid username or password");
                return;
            }
            saveDataToStorage(checked,data);
            navigate("/");
        } catch (ex) {
            setError("Invalid username or password");
        }
    }
  
    return (
        <div className='login-form'>
            <HomeWorkIcon 
                style={{width: "70px", height: "70px"}}
                color="info"
            /><br></br>
            <h1>BEOCAPRA SERVICE</h1>
            <p>Please enter your credentials</p>
            <TextField 
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                className='login-text-field'
                value={username}
                onChange={onUsernameChange}
            /><br></br>
            <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                className='login-text-field'
                type={"password"}
                value={password}
                onChange={onPasswordChange}
            /><br></br>
            <FormControlLabel 
                label="Remember me"
                control={<Checkbox checked={checked} onChange={onCheckedChange} />}
                defaultChecked
            /><br></br>
            <Button 
                variant="contained" 
                color="info" 
                className='login-button' 
                onClick={onLogin}
            >
                SIGN IN
            </Button><br></br>
            {error && <React.Fragment>
                    <p style={{color: "red"}}>{error}</p>
                </React.Fragment>}
        </div>
    )

}

function saveDataToStorage(checked: boolean, data: UserData) {
    if (checked) localStorage.setItem(USER_DATA,JSON.stringify(data))
    else sessionStorage.setItem(USER_DATA,JSON.stringify(data))
}