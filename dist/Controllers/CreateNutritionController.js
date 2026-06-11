"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNutritionController = void 0;
const CreateNutritionServices_1 = require("../Services/CreateNutritionServices");
class CreateNutritionController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Corrigido: wight para weight
            const { name, weight, height, age, gender, objective, level } = request.body;
            // Cria uma nova instância do serviço de nutrição
            const createNutrition = new CreateNutritionServices_1.CreateNutritionService();
            try {
                // Chama o método execute() do serviço, aguardando a resposta
                const nutrition = yield createNutrition.execute({
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
        });
    }
}
exports.CreateNutritionController = CreateNutritionController;
//# sourceMappingURL=CreateNutritionController.js.map