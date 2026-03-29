import { WcwData } from 'components/Navigation/slice/types';

const ACCOUNT_INFOR = 'account_infor';

// Remove account information from local storage
export function removeAccount(): void {
    // Remove the account information associated with the key from local storage
    localStorage.removeItem(ACCOUNT_INFOR);
}

// Save the account information to local storage
export function saveAccount(data: WcwData): boolean {
    try {
        // Convert the data object to a JSON string for storage
        const jsonString: string = JSON.stringify(data);
        // If local storage is supported, save the stringified data
        window.localStorage && localStorage.setItem(ACCOUNT_INFOR, jsonString);
        // Return true upon successful save
        return true;
    } catch (error) {
        // Return false if there's an error during saving
        return false;
    }
}

// Retrieve the account information from local storage
export function getAccount(): WcwData | undefined {
    let data: WcwData | undefined;
    try {
        // Check if local storage is supported
        if (window.localStorage) {
            // Retrieve the stored JSON string from local storage
            const jsonString = localStorage.getItem(ACCOUNT_INFOR);
            // If the JSON string exists, parse it back to an object
            if (jsonString) {
                data = JSON.parse(jsonString);
            }
        }
    } catch (error) {
        // If there's an error during retrieval, set data to undefined
        data = undefined;
    }

    // Return the retrieved data or undefined if not found or errors occurred
    return data;
}

export const delay = (ms: number): Promise<void> => {
    // Create a delay using setTimeout and resolve after ms
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const decodeTo3x3Array = (encodedString?: string): number[][] => {
    // Initialize result array for holding the decoded 3x3 matrix
    const result: number[][] = [];
    if (!encodedString) {
        return result;
    }
    // Start decoding from the beginning of the encoded string
    let index = 0;

    // Loop through each row of the 3x3 matrix
    for (let i = 0; i < 3; i++) {
        // Initialize an array to hold values for the current row
        const row: number[] = [];
        // Loop through each column of the 3x3 matrix
        for (let j = 0; j < 3; j++) {
            // Extract a substring from the encoded string and convert it from hex to decimal
            const value = parseInt(encodedString.substr(index, 2), 16);
            // Add the decoded value to the current row
            row.push(value);
            // Move to the next pair of characters in the encoded string
            index += 2;
        }
        // Add the filled row to the result matrix
        result.push(row);
    }

    // Return the fully decoded 3x3 matrix
    return result;
};

// Define a function that takes an encoded string and returns an array of numbers
export const decodeToStringArray = (encodedString: string): number[] => {
    // Initialize an empty array to store decoded values
    const result: number[] = [];

    // Loop through the encoded string two characters at a time
    for (let i = 0; i < encodedString.length; i += 2) {
        // Extract two characters from the encoded string and convert them from hexadecimal to decimal
        const value = parseInt(encodedString.substr(i, 2), 16); // Decode hex to decimal

        // Add the decoded value to the result array
        result.push(value); // Add decoded value to the result array
    }

    // Return the resulting array containing decoded values
    return result; // Return the decoded array
};
