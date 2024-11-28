import { z } from "zod";

const schoolSchema = z.object({
    id: z.number()
        .positive({ message: 'Id must be a positive number' }), 
    name: z.string()
        .max(255, { message: 'Name should not exceed 255 characters' })
        .nonempty({ message: 'Name is required' }),
    address: z.string()
        .max(500, { message: 'Address should not exceed 500 characters' })
        .nonempty({ message: 'Address is required' }),
    latitude: z.preprocess(
        val => parseFloat(val), 
        z.number().min(-90, { message: 'Latitude must be >= -90' }).max(90, { message: 'Latitude must be <= 90' })
    ),
    longitude: z.preprocess(
        val => parseFloat(val), 
        z.number().min(-180, { message: 'Longitude must be >= -180' }).max(180, { message: 'Longitude must be <= 180' })
    ),
});

export default schoolSchema;