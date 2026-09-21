export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { mood } = req.body;

    if (!mood || !mood.trim()) {
      return res.status(400).json({
        error: "Mood is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing",
      });
    }

    const prompt = `
You are a movie recommendation assistant.

The user will describe their mood.

Recommend exactly ONE real movie title.

Rules:
- Return only one movie title.
- No explanation.
- No rating.
- No year.
- No markdown.
- The movie must be real.

User mood:
${mood}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini status:", response.status);
    console.log("Gemini response:", data);

    if (!response.ok) {
      return res.status(500).json({
        error:
          data?.error?.message ||
          "Gemini API request failed",
      });
    }

    const movieTitle =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!movieTitle) {
      return res.status(500).json({
        error: "Gemini did not return a movie title",
      });
    }

    return res.status(200).json({
      movieTitle,
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
}