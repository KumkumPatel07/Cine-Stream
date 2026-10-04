import FavoriteList from "../../components/FavoriteList";
import Navbar from "../../components/Navbar";

export default function FavoritesPage() {
  return (
    <>
      <Navbar />

      <main>
        <h1>My Favorites</h1>

        <p className="page-subtitle">
          Movies you saved to your favorites.
        </p>

        <FavoriteList />
      </main>
    </>
  );
}