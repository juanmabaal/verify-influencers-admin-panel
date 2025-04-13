import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, People, CheckCircle } from "@mui/icons-material";

const stats = [
    {icon: <People sx={{ color: "#12B981"}} fontSize="large"/>, label: "Active Influencers", value: "1,234"},
    {icon: <CheckCircle sx={{ color: "#12B981"}} fontSize="large"/>, label: "Claims Verified", value: "25,431"},
    {icon: <BarChart sx={{ color: "#12B981"}} fontSize="large"/>, label: "Average Trust Score", value: "85.7%"}
]


const LeadboardStats = () => {


    return (
        <Box display="flex" justifyContent="center" gap={3} sx={{ marginBottom: "20px"}}>
            {stats.map((stat, index)=> (
                <Card key={index} sx={{ backgroundColor: "#1E293B", padding: "20px", borderRadius: "10px", minWidth: "200px", textAlign: "center"}}>
                    {stat.icon}
                    <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", marginTop: "10px"}}>
                        {stat.value}
                    </Typography>
                    <Typography variant="body2"  sx={{ color: "#A0AEC0"}}>
                        {stat.label}
                    </Typography>
                </Card>
            ))}
        </Box>
    )
}

export default LeadboardStats;