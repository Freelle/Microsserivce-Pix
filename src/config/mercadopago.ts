import { MercadoPagoConfig } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv';

dotenv.config();


if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('Access token is not defined in the environment variables');
}

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000, idempotencyKey: uuidv4() } });

export { client };