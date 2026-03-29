// Import the 'waxJS' module for interactions.
import wax from './waxJS';

// Import the 'Action' type for contract-related actions.
import { Action } from 'utils/types/contract';

// Default configuration for transaction approval (TAPOS).
const defaultTaposConfig = {
    blocksBehind: 3,
    expireSeconds: 1800,
};

// Create a formatted action for contract interactions.
function createAction<T = Record<string, unknown>>(
    accountName: string,
    contract: string,
    name: string,
    data: T,
): Action {
    // Ensure an account is logged in before proceeding.
    if (!accountName) {
        throw Error('Require login');
    }
    // Return a formatted action object.
    return {
        account: contract,
        name,
        authorization: [
            {
                actor: accountName,
                permission: 'active',
            },
        ],
        data,
    };
}

export async function sendActions(actions: any, customData: any = null) {
    try {
        const taposConfig = { ...defaultTaposConfig, ...customData };

        if (!wax?.api) {
            await wax.login();
        }

        const tx = await wax.api.transact({ actions }, taposConfig);
        return tx as any;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function CloseGame(host: string, game_id: string) {
    return sendActions([
        createAction(host, 'tictactoe', 'close', {
            game_id,
        }),
    ]);
}

export async function CreateNewGame(host: string, challenger: string) {
    return sendActions([
        createAction(host, 'tictactoe', 'create', {
            challenger,
            host,
        }),
    ]);
}

export async function Move({
    game_id,
    by,
    row,
    column,
}: {
    game_id: string;
    by: string;
    row: number;
    column: number;
}) {
    return sendActions([
        createAction(by, 'tictactoe', 'move', {
            game_id,
            by,
            row,
            column,
        }),
    ]);
}
