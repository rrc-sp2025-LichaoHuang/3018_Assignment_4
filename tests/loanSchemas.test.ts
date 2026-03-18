import { loanSchemas } from "../src/api/v1/validation/loanSchemas";

describe("Loan Schemas Validation", () => {
    describe("Create Loan Schema", () => {
        it("should pass with valid data", () => {
            const validData = {
                applicant: "John Doe",
                amount: 50000,
                status: "pending",
            };

            const { error } = loanSchemas.create.body.validate(validData);

            expect(error).toBeUndefined();
        });

        it("should fail if applicant is missing", () => {
            const invalidData = {
                amount: 50000,
                status: "pending",
            };

            const { error } = loanSchemas.create.body.validate(invalidData);

            expect(error).toBeDefined();
        });

        it("should fail if amount is not a number", () => {
            const invalidData = {
                applicant: "John Doe",
                amount: "not-a-number",
                status: "pending",
            };

            const { error } = loanSchemas.create.body.validate(invalidData);

            expect(error).toBeDefined();
        });

        it("should fail if status is invalid", () => {
            const invalidData = {
                applicant: "John Doe",
                amount: 50000,
                status: "invalid-status",
            };

            const { error } = loanSchemas.create.body.validate(invalidData);

            expect(error).toBeDefined();
        });
    });

    describe("Update Loan Schema", () => {
        it("should pass with partial valid data", () => {
            const validData = {
                status: "pending",
            };

            const { error } = loanSchemas.update.body.validate(validData);

            expect(error).toBeUndefined();
        });

        it("should fail if id param is missing", () => {
            const { error } = loanSchemas.update.params.validate({});

            expect(error).toBeDefined();
        });

        it("should pass with valid id param", () => {
            const { error } = loanSchemas.update.params.validate({
                id: "1",
            });

            expect(error).toBeUndefined();
        });
    });
});