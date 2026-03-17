/**
 * Creates a standardized success response object.
 *
 * @param data - The response payload.
 * @param message - Optional success message.
 * @returns A formatted success response object.
 */
export const successResponse = (
    data: unknown,
    message: string = "Request successful"
) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
});

/**
 * Creates a standardized error response object.
 * This ensures all API errors follow the same format for consistent client handling.
 *
 * @param {string} message - The error message to display to the client.
 * @param {string} code - The error code for programmatic handling.
 * @returns {object} A formatted error response object.
 */
export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});