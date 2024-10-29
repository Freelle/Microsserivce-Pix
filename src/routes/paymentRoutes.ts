import { Router } from 'express';
import { createPayment } from '../controllers/paymentController';

const router = Router();

router.post('/create_payment', createPayment);

export default router;