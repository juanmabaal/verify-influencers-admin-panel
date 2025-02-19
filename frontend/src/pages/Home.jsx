import { useEffect, useState } from "react";
import InfluencerCard from "../components/InfluencerCard";
import apiService from "../services/apiService";

const Home = () => {

    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        const fetchInfluencers = async () => {
            const data = await apiService.getInfluencers();
            setInfluencers(data);
        };

        fetchInfluencers();
       
    }, []);

    console.log(influencers.map((influencer) => influencer.name))

    return (
        <div>
            <h1>Influencers List</h1>
            <div className="Influencer-container">
                { influencers.map((influencer)=> (
                    <InfluencerCard key={influencer.id} influencer={influencer}/>
                ))}
            </div>
        </div>
    );
};

export default Home;