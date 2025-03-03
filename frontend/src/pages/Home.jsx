import { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import InfluencerCard from "../components/InfluencerCard";
import apiService from "../services/apiService";

const Home = () => {

    const [influencers, setInfluencers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const data = await apiService.getInfluencers();
                setInfluencers(data);
            } catch (error) {
                console.error("Error fetching Influencers: ", error)
            } finally {
                setLoading(false);
            }
        };

        fetchInfluencers();
       
    }, []);


    return (
        <>
            {loading ? (
                <CircularProgress />
            ): (
                <div style={{ padding:"20px" }}>
                    <h1 style={{ color: "white", textAlign: "center" }}>Top Influencers</h1>
                    <InfluencerCard influencers={influencers} />
                </div>

            )}
        </>
        
    );
};

export default Home;