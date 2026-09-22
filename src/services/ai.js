const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getMoodMovie(mood) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing.");
  }

  const prompt = `
Recommend ONE popular movie for this mood: "${mood}"

Return ONLY JSON:
{
  "movieTitle": "Movie Name"
}
`;

  const model = "gemini-3.6-flash";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("GEMINI RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        `Gemini API Error: ${response.status}`
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleanText = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    const result = JSON.parse(cleanText);

    if (!result.movieTitle) {
      throw new Error("Movie title missing from Gemini response.");
    }

    return result.movieTitle;
  } catch {
    throw new Error(`Invalid Gemini response: ${cleanText}`);
  }
}