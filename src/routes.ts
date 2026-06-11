import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { CreateNutritionController } from "./Controllers/CreateNutritionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      ' ```json\n{\n  "nome": "Zenaldo",\n  "sexo": "Masculino",\n  "idade": 36,\n  "altura": 1.78,\n  "peso": 110,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "2 fatias de pao integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n        "alimentos": [\n          "1 iogurte grego natural",\n          "1 colher de sopa de granola"\n        ]\n    },\n    {\n      "horario": "12:30",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 concha de arroz integral",\n        "1 concha de feijao preto",\n        "Salada de folhas verdes com tomate e cenoura ralada"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 batata doce media cozida",\n        "1 scoop de whey protein"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de carne vermelha magra grelhada",\n        "1 concha de batata doce cozida",\n        "Salada de folhas verdes com brócolis"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir",\n        "alimentos": [\n          "1 scoop de caseína"\n        ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA",\n    "Glutamina"\n  ]\n}\n```';

    try {
      //estrair o JSON

      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);

      return reply.send({ data: jsonObject });
    } catch (err) {
      console.log(err);
    }

    reply.send({ ok: true });
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    },
  );
}
