import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import apiService from "../services/apiService";
import LeadboardStats from "./LeadboardStats";
import LeadboardFilters from "./LeadboardFilters";
import LeadboardTable from "./LeadboardTable";

const Leadboard = () => {
    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await apiService.getInfluencers();
                    setInfluencers(data);
                } catch (error) {
                    console.error("Error fetching Influencers: ", error)
                } 
            };
    
            fetchData();
           
        }, []);

    return (
        <Container sx={{ backgroundColor: "#0F172A", minHeight: "100vh", padding: "20px", borderRadius: "10px" }}>
            <Typography  variant="h4" align="center" sx={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>
                Influencer Trust Leaderboard
            </Typography>
            <Typography align="center" sx={{ color: "#A0AEC0", marginBottom: "30px" }}>
                Real-time rankings of health influencers based on credibility and transparency.
            </Typography>
            <LeadboardStats />
            <LeadboardFilters />
            <LeadboardTable influencers={influencers}/>
        </Container>
    );
}

export default Leadboard;