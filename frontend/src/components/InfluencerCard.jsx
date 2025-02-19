
const InfluencerCard = ( { influencer }) => {

    return (
        <div className="influencer-card">
            <img src={influencer.profile_image_url} alt={influencer.name}/>
            <h2>{influencer.name}</h2>
            <p>@{influencer.username}</p>
            <p>followers: {influencer.followers_count}</p>
        </div>
    )
}

export default InfluencerCard;