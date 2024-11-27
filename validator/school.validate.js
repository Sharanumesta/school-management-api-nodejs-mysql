import { z } from "zod";

const schoolSchema = z.object({
    name: z.string().max(255, { message: 'Name should not exceed 255 characters' }),
    address: z.string().max(500, { message: 'Address should not exceed 500 characters' }),
    latitude: z.number().refine(val => !isNaN(val) && val >= -90 && val <= 90, {
      message: 'Latitude must be a number between -90 and 90',
    }),
    longitude: z.number().refine(val => !isNaN(val) && val >= -180 && val <= 180, {
      message: 'Longitude must be a number between -180 and 180',
    })
});

export default schoolSchema;