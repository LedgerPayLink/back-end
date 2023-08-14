import {Request, Response, Router} from "express";
import {convertToUSD, USDToToken} from "./service/quote/quote";
import {CURRENCY, TOKEN_ADDRESS} from "./domain/constants";

const router = Router()
router.get('/', async (req: Request, res: Response) => {
    const value = await convertToUSD(CURRENCY.EUR, 31500);
    const response = await USDToToken(value, TOKEN_ADDRESS.ADA)
    console.log(response)
    res.json({
        USD: value / 100,
        ADA: response
    });
});

export default router;
