import express, { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllLoans,
    getLoanById,
} from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import { loanSchemas } from "../validation/loanSchemas";
import { createLoan } from "../controllers/loanController";

const router: express.Router = express.Router();

router.get("/health", (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// loans
router.get("/loans", getAllLoans);

router.get("/loans/:id", getLoanById);

router.post(
    "/loans",
    validateRequest(loanSchemas.create),
    createLoan
);

export default router;