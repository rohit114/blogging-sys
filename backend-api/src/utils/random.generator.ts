import { v4 as uuidv4 } from 'uuid';

export class RandomGenerator {
    static generateRandomEmail(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        // Append a random UUID
        result += uuidv4().replace(/-/g, '').substring(0, 12); // Use the first 8 characters of the UUID

        return result.concat('@example.com');
    }

    static generateRandomNumber(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }
}