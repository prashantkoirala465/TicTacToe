import Axios from 'axios';
import { BLOCK_CHAIN_URL } from 'config/config';

export const GameList = async (limit = 100) => {
    let gameList = [];
    try {
        const response = await Axios.post(BLOCK_CHAIN_URL + '/v1/chain/get_table_rows', {
            json: true,
            code: 'tictactoe',
            table: 'games',
            scope: 'tictactoe',
            limit: limit,
            reverse: true,
        });

        if (response?.data) {
            gameList = response?.data?.rows;
        }
    } catch (error) {
        console.error('GameList:', error);
    }

    return gameList;
};
