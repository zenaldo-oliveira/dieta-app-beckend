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
exports.routes = routes;
const CreateNutritionController_1 = require("./controllers/CreateNutritionController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/teste', (request, reply) => {
            let responseText = ' ```json\n{\n  "nome": "Zenaldo",\n  "sexo": "Masculino",\n  "idade": 36,\n  "altura": 1.78,\n  "peso": 110,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "2 fatias de pao integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n        "alimentos": [\n          "1 iogurte grego natural",\n          "1 colher de sopa de granola"\n        ]\n    },\n    {\n      "horario": "12:30",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 concha de arroz integral",\n        "1 concha de feijao preto",\n        "Salada de folhas verdes com tomate e cenoura ralada"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 batata doce media cozida",\n        "1 scoop de whey protein"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de carne vermelha magra grelhada",\n        "1 concha de batata doce cozida",\n        "Salada de folhas verdes com brócolis"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir",\n        "alimentos": [\n          "1 scoop de caseína"\n        ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA",\n    "Glutamina"\n  ]\n}\n```';
            try {
                //estrair o JSON
                let jsonString = responseText
                    .replace(/```\w*\n/g, '')
                    .replace(/\n```/g, '')
                    .trim();
                let jsonObject = JSON.parse(jsonString);
                return reply.send({ data: jsonObject });
            }
            catch (err) {
                console.log(err);
            }
            reply.send({ ok: true });
        });
        fastify.post('/create', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateNutritionController_1.CreateNutritionController().handle(request, reply);
        }));
    });
}
//# sourceMappingURL=routes.js.map