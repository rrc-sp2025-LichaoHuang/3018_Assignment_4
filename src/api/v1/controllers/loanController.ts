import { Request, Response, NextFunction } from "express";
import { loans } from "../data/loanData";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getAllLoans = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        res.status(HTTP_STATUS.OK).json(successResponse(loans));
    } catch (error) {
        next(error);
    }
};

export const getLoanById = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { id } = req.params;

        const loan = loans.find((l) => l.id === id);

        if (!loan) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Loan not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(loan));
    } catch (error) {
        next(error);
    }
};

export const createLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const newLoan = {
            id: String(loans.length + 1),
            ...req.body,
            createdAt: new Date().toISOString(),
        };

        loans.push(newLoan);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newLoan, "Loan created successfully")
        );
    } catch (error) {
        next(error);
    }
};