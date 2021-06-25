export interface Result {
  name: string;
  url: string;
}

export interface PokemonPreviewReponse {
  count: number;
  next?: string;
  previous?: string;
  results: Result[];
}
