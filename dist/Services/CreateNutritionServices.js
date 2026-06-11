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
exports.CreateNutritionService = void 0;
const generative_ai_1 = require("@google/generative-ai");
class CreateNutritionService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, age, gender, height, level, objective, weight, }) {
            // lógica do serviço
            var _b;
            try {
                const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const response = yield model.generateContent(`
        Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente no nível de atividade: ${level} e ignore qualquer outro parâmetro que não seja os passados. Retorne em JSON com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação além das passadas no prompt, retorne em JSON e nenhuma propriedade pode ter acento.

        `);
                console.log("API_KEY existe?", !!process.env.API_KEY);
                console.log("Resposta Gemini:", response);
                if (response.response && response.response.candidates) {
                    const jsonText = (_b = response.response.candidates[0]) === null || _b === void 0 ? void 0 : _b.content.parts[0].text;
                    //EXTRAIR O JSON
                    let jsonString = jsonText
                        .replace(/```\w*\n/g, "")
                        .replace(/\n```/g, "")
                        .trim();
                    let jsonObject = JSON.parse(jsonString);
                    return { data: jsonObject };
                }
            }
            catch (err) {
                console.error('ERRO COMPLETO GEMINI:', err);
                throw err;
            }
        });
    }
}
exports.CreateNutritionService = CreateNutritionService;
//# sourceMappingURL=CreateNutritionServices.js.map