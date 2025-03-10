import { useEffect, useState } from "react";
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
        <div>
            <h2>Influencer Trust Leaderboard</h2>
            <p>Real-time rankings of health influencers based on credibility and transparency.</p>
            <LeadboardStats />
            <LeadboardFilters />
            <LeadboardTable influencers={influencers}/>
        </div>
    );
}

export default Leadboard;