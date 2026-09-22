const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getMoodMovie(mood) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing.");
  }

  const prompt = `
You are a movie recommendation assistant.

The user is feeling: "${mood}"

Recommend ONE popular movie that matches this mood.

Return ONLY valid JSON in this exact format:

{
  "movieTitle": "Movie Name"
}

Do not add markdown.
Do not add explanations.
Do not add any extra text.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  console.log("Gemini response:", data);

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Gemini API request failed."
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let result;

  try {
    result = JSON.parse(cleanText);
  } catch {
    throw new Error(
      `Gemini returned invalid JSON: ${cleanText}`
    );
  }

  if (!result.movieTitle) {
    throw new Error("Gemini did not return a movie title.");
  }

  return result.movieTitle;
}