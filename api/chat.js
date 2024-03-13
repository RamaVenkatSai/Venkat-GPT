// api/chat.js
module.exports = async (req, res) => {
    const { model, messages, max_tokens } = req.body;

    // Use your API key securely here
    const API_KEY = process.env.API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            max_tokens: max_tokens
        })
    });

    const data = await response.json();
    res.status(200).json(data);
};
