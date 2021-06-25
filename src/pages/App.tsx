import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { PokemonDetails } from "../models/pokemon-details";
import { PokemonPreview } from "../models/pokemon-preview";
import { PokemonPreviewReponse } from "../models/pokemon-preview-reponse";
import styles from "./App.module.css";

const POKE_API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

const capitalizeFirstLetter = (string?: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

const loadPokemon = async (
  endpoint: string,
  setPokemon: Function,
  setShowModal: Function
) => {
  const response = await fetch(endpoint);
  const pokemonDetails: PokemonDetails = await response.json();
  setPokemon(pokemonDetails);
  setShowModal(true);
};

const displayPokemon = (
  pokemon: PokemonPreview,
  setPokemon: Function,
  setShowModal: Function
) => (
  <Col className={styles.centerCol} xs={12} sm={6} md={4} key={pokemon.id}>
    <Card
      className={styles.card}
      border="dark"
      style={{ width: "18rem" }}
      onClick={() => loadPokemon(pokemon.url, setPokemon, setShowModal)}
    >
      <Card.Header>
        {pokemon.id} - {capitalizeFirstLetter(pokemon.name)}
      </Card.Header>
      <Card.Img variant="bottom" src={pokemon.image} />
    </Card>
  </Col>
);

function App() {
  const [pokemons, setPokemons] = useState<PokemonPreview[]>([]);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({});
  const [show, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    loadPokemons(setPokemons, setNext, setPrevious).then();
  }, []);

  let previousButton = null;

  if (previous) {
    previousButton = (
      <Button
        variant="primary"
        size="lg"
        active
        onClick={() =>
          loadPokemons(setPokemons, setNext, setPrevious, previous)
        }
      >
        Previous
      </Button>
    );
  }

  let nextButton = null;

  if (next) {
    nextButton = (
      <Button
        variant="primary"
        size="lg"
        active
        onClick={() => loadPokemons(setPokemons, setNext, setPrevious, next)}
      >
        Next
      </Button>
    );
  }

  let pokemonDetailsModal = null;

  if (pokemonDetails) {
    const stats = pokemonDetails?.stats?.map((stat, index) => (
      <tr key={`stats_${index}`}>
        <td>{stat.stat.name}</td>
        <td>{stat.base_stat}</td>
      </tr>
    ));
    let statSection = null;
    if (stats) {
      statSection = (
        <section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Statistic</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{stats}</tbody>
          </Table>
          
        </section>
      );
    }
    pokemonDetailsModal = (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{capitalizeFirstLetter(pokemonDetails?.name)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className={styles.centerImage}>
            <img
              alt={`${pokemonDetails.name} Front`}
              src={pokemonDetails?.sprites?.front_default}
              className={styles.pokemonDetailImage}
            />
          </section>
          {statSection}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>Pokedex</h1>
      <Container>
        <Row>
          {pokemons.map((pokemon) =>
            displayPokemon(pokemon, setPokemonDetails, setShowModal)
          )}
        </Row>
      </Container>
      <div className={styles.buttonContainer}>
        {previousButton}
        <br />
        {nextButton}
      </div>
      {pokemonDetailsModal}
    </main>
  );
}

export default App;
