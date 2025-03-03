import { Container, CssBaseline, AppBar, Toolbar, Typography} from "@mui/material";

const Layout = ( { children }) => {
    return (
        <Container maxWidth="md">
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"> Influencer Dashboard</Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    );
};

export default Layout;