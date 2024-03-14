import * as React from 'react';
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";

export const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <Box sx={{marginBottom: 5, textAlign: "center"}}>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            id="email"
                            label="email"
                            variant="standard"
                            onChange={props.handleChange}
                            value={props.auth.email}
                            required={true}
                        />
                        <TextField
                            id="password"
                            label="password"
                            variant="standard"
                            type="password"
                            onChange={props.handleChange}
                            value={props.auth.password}
                            required={true}
                        />
                    </Stack>
                </Box>
                <Box sx={{marginBottom: 1, textAlign: "center"}}>
                    <Button
                        variant="contained"
                        sx={{width: '100%'}}
                        type={"submit"}
                    >Log In</Button>
                </Box>
            </form>
    );
}