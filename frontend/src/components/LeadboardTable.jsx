import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Card, CardContent, CardMedia, Typography } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Paper from '@mui/material/Paper';


const LeadboardTable= ( { influencers }) => {

    return (
        <TableContainer component={Paper} sx={{ backgroundColor:"#101820", color: "white", borderRadius: 2, overflow: "hidden"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">RANK</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">INFLUENCER</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">CATEGORY</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">TRUST SCORE</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">TREND</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">FOLLOWERS</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold"}} align="center">VERIFIED CLAIMS</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { influencers.map((influencer, index)=> (
                            <TableRow  key={influencer.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#18202B" }}}>
                                {/* RANK */}
                                <TableCell sx={{ color:"white"}} align="center">#{index + 1}</TableCell>

                                {/* INFLUENCER */}
                                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1, color: "white"}} >
                                    <Avatar  src={influencer.profile_image_url} alt={influencer.name} sx={{ width: 40, height: 40 }} />
                                    <Typography sx={{ color:"white"}}>{influencer.name}</Typography>
                                </TableCell>

                                {/* CATEGORIA */}
                                <TableCell sx={{ color:"white"}} align="center">
                                    category
                                </TableCell>

                                {/* TRUST SCORE */}
                                <TableCell sx={{ color:"green"}} align="center">
                                    %
                                </TableCell>

                                {/* TREND */}
                                <TableCell align="center">
                                    <TrendingUpIcon sx={{ color: "green" }} />
                                </TableCell>

                                {/* FOLLOWERS */}
                                <TableCell sx={{ color: "white" }} align="center">{influencer.followers_count}</TableCell>

                                {/* ANALIZE CLAIMS */}
                                <TableCell sx={{ color: "white" }} align="center">{influencer.claims.length}</TableCell>
                            </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


        // <Card>
        //     <CardMedia
        //         component="img"
        //         height="140"
        //         image={influencer.profile_image_url || "https://via.placeholder.com/140"}
        //         alt={influencer.name}
        //     />
        //     <CardContent>
        //         <Typography variant="h6">{influencer.name}</Typography>
        //         <Typography variant="body2" color="textSecondary">
        //             @{influencer.username}
        //         </Typography>
        //         <Typography variant="body2">followers: {influencer.followers_count}</Typography>
        //     </CardContent>
        // </Card>
    )
}

export default LeadboardTable;