const axios = require("axios");

// Simple category emission mapping
const categoryEmissionMap = {
  chair: 18,
  table: 25,
  laptop: 200,
  phone: 70
};

async function calculateCarbon(category) {
  try {
    // if using real API
    // const response = await axios.post("API_URL", {...});
    // return response.data.co2e;

    // Simulated calculation
    const value = categoryEmissionMap[category.toLowerCase()] || 10;
    return value;

  } catch (error) {
    console.error("Carbon API error:", error.message);
    return null; // important: don't crash
  }
}

module.exports = { calculateCarbon };
