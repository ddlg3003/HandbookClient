import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'; 
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useGoogleLogin } from '@react-oauth/google';
import Input from './Input';
import Icon from './icon';
import { googleToken } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {

    };

    const handleChange = () => {
         
    };

    const switchMode = () => {
        setIsSignup((prev) => !prev);
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const { data } = await googleToken(code);
            const token = data?.id_token;
            try {
                dispatch({ type: AUTH, data: { token } });
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        },
        flow: 'auth-code'
    });

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last name" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" half />
                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword ? "text" : "password"} 
                            handleShowPassword={handleShowPassword} 
                            half
                        />
                        { isSignup && <Input name="confirmPassword" label="Retype Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Button 
                        className={classes.googleButton} 
                        variant="contained" 
                        color="secondary" 
                        fullWidth
                        onClick={googleLogin}
                    >
                        <Icon /> Sign in with Google
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth