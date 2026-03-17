import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

export const validateRequest = (schemas: RequestSchemas) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const errors: string[] = [];

            const validatePart = (
                schema: ObjectSchema,
                data: unknown,
                partName: string
            ) => {
                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true,
                });

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => `${partName}: ${detail.message}`
                        )
                    );
                }

                return value;
            };

            if (schemas.body) {
                req.body = validatePart(schemas.body, req.body, "Body");
            }

            if (schemas.params) {
                req.params = validatePart(schemas.params, req.params, "Params");
            }

            if (schemas.query) {
                req.query = validatePart(schemas.query, req.query, "Query");
            }

            if (errors.length > 0) {
                res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
                    errorResponse(errors.join(", "), "VALIDATION_ERROR")
                );
                return;
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};