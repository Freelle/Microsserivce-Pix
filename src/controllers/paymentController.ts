import { Request, Response } from 'express';
import { Payment } from 'mercadopago';
import { client } from '../config/mercadopago';
import { v4 as uuidv4 } from 'uuid';

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { transaction_amount, description, email, first_name, last_name, cpf } = req.body;

    if (!transaction_amount || !description || !email || !first_name || !last_name || !cpf) {
        res.status(400).json({
        message: 'Missing required fields',
        status: 400,
      });
    }

    const paymentInstance = new Payment(client);
    const paymentData = {
      transaction_amount: Number(transaction_amount),
      description,
      payment_method_id: 'pix',
      payer: {
        email,
        first_name,
        last_name,
        identification: { type: 'CPF', number: String(cpf) },
      },
    };

    const requestOptions = { idempotencyKey: uuidv4() };
    const paymentResult = await paymentInstance.create({ body: paymentData, requestOptions });

    res.status(200).json(paymentResult);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};
