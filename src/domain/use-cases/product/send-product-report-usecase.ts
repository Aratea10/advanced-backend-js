import { ProductRepository } from '../../repositories/ProductRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { EmailService } from '../../services/EmailService';

export class SendProductReportUseCase {
    private readonly userRepository: UserRepository;
    private readonly productRepository: ProductRepository;
    private readonly emailService: EmailService;

    constructor(
        userRepository: UserRepository,
        productRepository: ProductRepository,
        emailService: EmailService
    ) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    async execute() {
        // Obtener todos los usuarios
        const users = await this.userRepository.find();

        for (const user of users) {
            const products = await this.productRepository.findMany({
                ownerId: user.id,
                page: 1,
                limit: 9999, // ProductModel.countDocuments()    !!!!!!
            });

            // enviar email
            void this.emailService.sendEmail(
                user.email,
                `Hola! tienes publicados en la plataforma ${products.length} productos`,
                'Resumen semanal'
            );
        }
    }
}
