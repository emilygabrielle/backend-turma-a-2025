import {z} from "zod";

const PaymentSchema = z.object({
    data: z.string().min(3,{message: "Data Inválida"}),
    numerorecibo: z.string().email({message: "Número do Recibo Inválido"}),
    usuarioId: z.string().min(6, {message: "Usúario Inválido"}),
});
const PaymentController = {
    async createPayment(req, res) {
        try {
            const {nome, email, senha} = req.body;
            PaymentSchema.parse({nome, email, senha});
            console.log({nome, email, senha});
            res.status(201).json({ message: 'Payment created successfully' });
        } catch (error) {
            if(error instanceof z.ZodError) {
                return res.status(400).json
                ({ message: "Error de validação",
                    errors: error.errors.map(
                        err => ({
                            atributo: err.path[0],
                            message: err.message
                        })
                    )
                });
            }
            res.status(500).json({ message: error.message});
            
        }

    }
}

export default PaymentController;