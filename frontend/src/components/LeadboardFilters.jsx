import { useState } from "react";
import { Button, Stack } from "@mui/material";

const categories = ["All", "Nutrition", "Fitness", "Medicine", "Mental Health"];

const LeaderboardFilters = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Stack direction="row" spacing={2} sx={{ marginBottom: "20px", marginTop:"25px" }}>
        {categories.map((category) => (
            <Button
                key={category}
                onClick={() => handleFilterClick(category)}
                sx={{
                    backgroundColor: selectedCategory === category ? "#12B981" : "#757575",
                    color: "white",
                    borderRadius: "20px", 
                    padding: "8px 16px", 
                    minWidth: "120px", 
                    textTransform: "none", 
                    "&:hover": {
                        backgroundColor: selectedCategory === category ? "#0FA971" : "#5c5c5c",
                    },
                }}
            >
                {category}
            </Button>
        ))}
    </Stack>
);
};

export default LeaderboardFilters;
