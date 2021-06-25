
import { PokemonDetails } from "../models/pokemon-details";
import {
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { capitalizeFirstLetter } from "../shared/string-transformations";

import styles from "./PokemonDetailsModal.module.css";

interface Props {
  pokemonDetails: PokemonDetails;
  show: boolean;
  handleClose: any;
}

export const PokemonDetailsModel = (props: Props) => {
  const { pokemonDetails, show, handleClose } = props;
  if(!pokemonDetails) {
    return (<></>);
  }
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
  return (
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
  )
}