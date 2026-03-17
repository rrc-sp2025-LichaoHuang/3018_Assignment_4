import Joi from "joi";

export const loanSchemas = {
    create: {
        body: Joi.object({
            applicant: Joi.string().required(),
            amount: Joi.number().positive().required(),
            status: Joi.string()
                .valid("pending", "under_review", "flagged")
                .required(),
        }),
    },
};