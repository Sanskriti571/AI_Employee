const axios = require("axios");

exports.getRecommendation = async (req, res) => {

  try {

    const { employee } = req.body;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "user",

            content: `
Analyze this employee.

Name: ${employee.name}
Department: ${employee.department}
Skills: ${employee.skills}
Performance Score: ${employee.performanceScore}
Experience: ${employee.experience}

Provide:
1. Promotion Recommendation
2. Training Suggestions
3. Performance Feedback
4. Employee Ranking
            `
          }
        ]
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI request failed"
    });
  }
};

exports.getAllEmployeeRecommendations = async (req, res) => {

  try {

    const { employees } = req.body;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "user",

            content: `
Analyze the following employees.

${JSON.stringify(employees)}

Provide:
1. Employee Ranking
2. Top Performers
3. Promotion Recommendations
4. Training Suggestions
5. Weak Performance Analysis
            `
          }
        ]
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI ranking failed"
    });
  }
};