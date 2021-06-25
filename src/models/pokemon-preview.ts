const API_PREFIX = 'https://pokeapi.co/api/v2/pokemon/';
const IMAGE_PREFIX = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export class PokemonPreview {

  constructor(public name: string, public url: string) {}

  get id() {
    return this.url.replace(API_PREFIX, '').replace("/", '');
  }
  get image() {
    return `${IMAGE_PREFIX}${this.id}.png`;
  }
}