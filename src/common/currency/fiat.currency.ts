import axios from "axios";

const api_key = "y8BC9LqNcEs2H9zoPJ3KjzpeYobjOHOk"

export async function convertToUSD(currencyFrom: string, amountInCentsFrom: number) {
    const response = await axios.get(
        `https://api.currencybeacon.com/v1/convert?api_key=${api_key}&from=${currencyFrom}&to=USD&amount=${amountInCentsFrom}`
    );
    return response.data.response.value as number;
}

export const FiatCurrency: string[] = [
    "EUR",
    "USD",
]


