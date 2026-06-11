import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../Controllers/CreateNutritionController";

class CreateNutritionService {
  async execute({
    name,
    age,
    gender,
    height,
    level,
    objective,
    weight,
  }: DataProps) {
    // lógica do serviço

    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(
        `
        Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente no nível de atividade: ${level} e ignore qualquer outro parâmetro que não seja os passados. Retorne em JSON com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação além das passadas no prompt, retorne em JSON e nenhuma propriedade pode ter acento.

        `,
      );

      console.log("API_KEY existe?", !!process.env.API_KEY);
      console.log("Resposta Gemini:", response);

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        //EXTRAIR O JSON

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (err) {
  console.error('ERRO COMPLETO GEMINI:', err);
  throw err;
}
    }
  }
}

export { CreateNutritionService };
