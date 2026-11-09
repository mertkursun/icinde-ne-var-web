import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ScoreStory } from "./components/ScoreStory";
import { Audiences } from "./components/Audiences";
import { Gallery } from "./components/Gallery";
import { Pro } from "./components/Pro";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { useHashRoute } from "./hooks/useHashRoute";

export default function App() {
  const route = useHashRoute();

  return (
    <>
      <Nav />
      <main>
        {route === "home" ? (
          <>
            <Hero />
            <ScoreStory />
            <Audiences />
            <Gallery />
            <Pro />
          </>
        ) : (
          <LegalPage kind={route} />
        )}
      </main>
      <Footer />
    </>
  );
}
