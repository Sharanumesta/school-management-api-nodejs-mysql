
const school = (Schema) => async (req, res, next) => {
    try {
        const parsedBody = await Schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const status = 400;
        const message = "Validation failed, please check your inputs.";

        const errorMessages = err.errors.map(error => ({
            field: error.path.join('.'),
            message: error.message,
        }));

        return res.status(status).json({
            status,
            message,
            errors: errorMessages
        });
    }
};

export default school;