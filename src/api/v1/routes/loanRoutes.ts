import express, { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const router: express.Router = express.Router();

router.get("/health", (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default router;