import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../controllers/CreateNutritionController";

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
    try {
      console.log("API_KEY existe?", !!process.env.API_KEY);
      console.log("Tamanho da chave:", process.env.API_KEY?.length);

      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const response = await model.generateContent(`
Crie uma dieta completa para uma pessoa com:

Nome: ${name}
Sexo: ${gender}
Peso: ${weight}kg
Altura: ${height}cm
Idade: ${age} anos
Objetivo: ${objective}
Nível de atividade: ${level}

RETORNE APENAS JSON VÁLIDO.

Formato:

{
  "nome": "",
  "sexo": "",
  "idade": 0,
  "altura": 0,
  "peso": 0,
  "objetivo": "",
  "refeicoes": [
    {
      "horario": "",
      "name": "",
      "alimentos": []
    }
  ],
  "suplementos": []
}

Não escreva explicações.
Não escreva markdown.
Não use \`\`\`json.
Retorne somente o JSON.
`);

      const jsonText =
        response.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log("RESPOSTA GEMINI:", jsonText);

      const jsonString = jsonText.trim();

      const jsonObject = JSON.parse(jsonString);

      return {
        data: jsonObject,
      };
    } catch (err) {
      console.error("ERRO COMPLETO GEMINI:", err);
      throw err;
    }
  }
}

export { CreateNutritionService };
