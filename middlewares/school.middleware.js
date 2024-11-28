const school = (Schema) => async (req, res, next) => {
    try {
        const parsedBody = await Schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        console.error("Validation Errors:", err.errors);

        return res.status(400).json({
            status: 400,
            message: "Validation failed, please check your inputs.",
            errors: err.errors.map(error => ({
                field: error.path.join('.'),
                message: error.message,
            })),
        });
    }
};

export default school;