import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, People, CheckCircle } from "@mui/icons-material";


const LeadboardStats = () => {


    return (
        <div style={{ display: "flex", gap: "20px", marginBottom:"20px"}}>
            <Card sx={{ minWidth: 200}}>
                <CardContent>
                        <People fontSize="large"/>
                        <Typography variant="h6">1,234</Typography>
                        <Typography>Active Influencers</Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 200}}>
                <CardContent>
                        <CheckCircle fontSize="large"/>
                        <Typography variant="h6">25,431</Typography>
                        <Typography>Claims Verified</Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 200}}>
                <CardContent>
                        <BarChart fontSize="large"/>
                        <Typography variant="h6">85.7%</Typography>
                        <Typography>Average Trust Score</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default LeadboardStats;