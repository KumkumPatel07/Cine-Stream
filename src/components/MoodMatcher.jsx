import { useState } from "react";
import { getMoodMovie } from "../services/ai";

function MoodMatcher({ onMovieFound }) {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleMoodSearch(event) {
    event.preventDefault();

    if (!mood.trim()) {
      setError("Tell us your mood first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const movieTitle = await getMoodMovie(mood.trim());

      console.log("AI movie:", movieTitle);

      onMovieFound(movieTitle);
    } catch (error) {
      console.error("Mood matcher error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mood-matcher">
      <div className="mood-content">
        <div className="mood-icon">✦</div>

        <p className="mood-label">AI MOOD MATCHER</p>

        <h2>
          Tell us your mood.
          <br />
          <span>We'll find the movie.</span>
        </h2>

        <p className="mood-description">
          Feeling happy, nostalgic, adventurous or just want
          something relaxing? Let AI pick a movie that matches
          your vibe.
        </p>

        <form className="mood-form" onSubmit={handleMoodSearch}>
          <input
            type="text"
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            placeholder="I'm feeling happy and want something funny..."
            aria-label="Describe your mood"
          />

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="mood-spinner"></span>
                Finding...
              </>
            ) : (
              <>
                Find My Movie
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {error && <p className="mood-error">{error}</p>}

        <div className="mood-suggestions">
          <span>Try:</span>

          <button
            type="button"
            onClick={() => setMood("I want something funny")}
          >
            😄 Funny
          </button>

          <button
            type="button"
            onClick={() => setMood("I want something romantic")}
          >
            💕 Romantic
          </button>

          <button
            type="button"
            onClick={() => setMood("I want an emotional movie")}
          >
            🥹 Emotional
          </button>

          <button
            type="button"
            onClick={() => setMood("I want an adventurous movie")}
          >
            ⚡ Adventure
          </button>
        </div>
      </div>

      <div className="mood-decoration">
        <div className="mood-glow"></div>
        <div className="mood-orbit orbit-one"></div>
        <div className="mood-orbit orbit-two"></div>
        <div className="mood-orbit orbit-three"></div>

        <div className="mood-movie-symbol">
          <span>▶</span>
        </div>
      </div>
    </section>
  );
}

export default MoodMatcher;