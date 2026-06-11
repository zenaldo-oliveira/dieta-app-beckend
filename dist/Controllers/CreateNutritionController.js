"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNutritionController = void 0;
const CreateNutritionServices_1 = require("../Services/CreateNutritionServices");
class CreateNutritionController {
    async handle(request, reply) {
        // Corrigido: wight para weight
        const { name, weight, height, age, gender, objective, level } = request.body;
        // Cria uma nova instância do serviço de nutrição
        const createNutrition = new CreateNutritionServices_1.CreateNutritionService();
        try {
            // Chama o método execute() do serviço, aguardando a resposta
            const nutrition = await createNutrition.execute({
                name,
                weight,
                height,
                age,
                gender,
                objective,
                level,
            });
            // Envia a resposta de nutrição
            reply.send(nutrition);
        }
        catch (error) {
            // Tratamento de erro para capturar possíveis exceções
            console.error('Erro ao executar o serviço de nutrição:', error);
            reply.status(500).send({ error: 'Erro ao processar a solicitação' });
        }
    }
}
exports.CreateNutritionController = CreateNutritionController;
//# sourceMappingURL=CreateNutritionController.js.map