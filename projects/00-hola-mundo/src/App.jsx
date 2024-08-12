import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export function App() {
  return (
    <>
      <section className="App">
        <TwitterFollowCard isFollowing userName="midudev" name="Miguel Ángel Duran" />
        <TwitterFollowCard isFollowing={false} userName="pheralb" name="Pablo Hernandez" />
        <TwitterFollowCard  userName="elonmusk" name="Elon Musk" />
        <TwitterFollowCard  userName="vander" name="Vanderhart" />
      </section>S
    </>
  );
}
