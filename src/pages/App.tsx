import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { PokemonPreview } from "../models/pokemon-preview";
import { PokemonPreviewReponse } from "../models/pokemon-preview-reponse";
import styles from "./App.module.css";

const POKE_API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

const loadPokemons = async (
  setPokemons: Function,
  setNext: Function,
  setPrevious: Function,
  endpoint = POKE_API_ENDPOINT
) => {
  const response = await fetch(endpoint);
  const { next, results, previous }: PokemonPreviewReponse =
    await response.json();
  const newPokemonsMapped = results.map(
    (result) => new PokemonPreview(result.name, result.url)
  );
  setNext(next);
  setPokemons(newPokemonsMapped);
  setPrevious(previous);
};
const displayPokemon = (pokemon: PokemonPreview) => (
  <Col xs={12} sm={6} md={4} key={pokemon.id}>
    <Card className={styles.card} border="dark" style={{ width: "18rem" }}>
      <Card.Header>{pokemon.id} - {pokemon.name}</Card.Header>
      <Card.Img variant="bottom" src={pokemon.image} />
    </Card>
  </Col>
);

function App() {
  const [pokemons, setPokemons] = useState<PokemonPreview[]>([]);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");

  useEffect(() => {
    loadPokemons(setPokemons, setNext, setPrevious).then();
  }, []);

  let previousButton = null;

  if (previous) {
    previousButton = (
      <Button variant="primary" size="lg" active onClick={() => loadPokemons(setPokemons, setNext, setPrevious, previous)}>
        Previous
      </Button>
    );
  }

  let nextButton = null;

  if (next) {
    nextButton = (
      <Button variant="primary" size="lg" active onClick={() => loadPokemons(setPokemons, setNext, setPrevious, next)}>
        Next
      </Button>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>Pokedex</h1>
      <Container>
        <Row>{pokemons.map(displayPokemon)}</Row>
      </Container>
      <div className={styles.buttonContainer}>
        {previousButton}
        <br />
        {nextButton}
      </div>
    </main>
  );
}

export default App;
