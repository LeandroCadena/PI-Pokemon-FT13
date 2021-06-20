import axios from 'axios';
import { POKEMON_URL } from '../utils/constants'

export const getPokemonDetail = async (id) => {
    const detail = await axios.get(`${POKEMON_URL}/${id}`);
    return detail;
}