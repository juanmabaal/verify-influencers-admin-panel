const topics = {
    Nutrition: [
      "diet", "nutrition", "vitamins", "healthy eating", 
      "fiber", "minerals", "nutrient", "calorie", "protein"
    ],
    Medicine: [
      "medicine", "treatment", "doctor", "healthcare", 
      "disease", "illness", "therapy", "surgery", "medication"
    ],
    "Mental Health": [
      "mental health", "anxiety", "stress", "depression", 
      "therapy", "well-being", "mindfulness", "emotional"
    ],
    Longevity: [
      "longevity", "aging", "anti-aging", "life expectancy", 
      "lifespan", "centenarians", "age-related", "long life"
    ],
    Neuroscience: [
      "brain", "neuro", "cognitive", "memory", 
      "neurons", "neurological", "neuroplasticity", "cognition"
    ],
    "Public Health": [
      "public health", "pandemic", "vaccination", "epidemic", 
      "health policies", "community health", "disease prevention"
    ],
    Genetics: [
      "genes", "DNA", "genetic", "hereditary", 
      "mutation", "genome", "CRISPR", "genomics"
    ],
    "Sports and Health": [
      "fitness", "exercise", "sports", "athletic", 
      "workout", "cardio", "weightlifting", "physical activity"
    ],
    Beauty: [
      "beauty", "skincare", "hair", "cosmetics", 
      "makeup", "aesthetics", "anti-aging skincare", "glowing skin"
    ],
    Reproductive: [
      "fertility", "pregnancy", "reproductive health", "IVF", 
      "childbirth", "hormones", "family planning", "contraception"
    ],
  };
  
  const determineTopic = (text) => {
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some((keyword) => text.toLowerCase().includes(keyword))) {
        return topic;
      }
    }
    return "Uncategorized";
  };
  
  module.exports = { determineTopic };
  