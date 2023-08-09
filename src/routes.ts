import {Router, Request, Response} from "express";

const router = Router()
router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

export default router;
