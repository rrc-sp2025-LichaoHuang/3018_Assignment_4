import express, { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllLoans,
    getLoanById,
    createLoan,
    deleteLoanHandler,
    updateLoanHandler,
} from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import { loanSchemas } from "../validation/loanSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

/**
 * GET /health
 * Health check endpoint
 */
router.get("/health", (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

/**
 * GET /loans
 * Get all loans
 * Access: officer, manager, admin
 */
router.get(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    getAllLoans
);

/**
 * GET /loans/:id
 * Get a loan by ID
 * Access: officer, manager, admin
 */
router.get(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    getLoanById
);

/**
 * POST /loans
 * Create a new loan
 * Access: manager, admin
 */
router.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["manager", "admin"] }),
    validateRequest(loanSchemas.create),
    createLoan
);

/**
 * DELETE /loans/:id
 * Delete a loan by ID
 * Access: admin only
 */
router.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    deleteLoanHandler
);

/**
 * PUT /loans/:id
 * Update a loan
 * Access: manager, admin
 */
router.put(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager", "admin"] }),
    validateRequest(loanSchemas.update),
    updateLoanHandler
);

export default router;