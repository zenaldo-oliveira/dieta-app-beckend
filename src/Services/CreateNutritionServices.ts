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
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const response = await model.generateContent(`
Crie uma dieta completa para:

Nome: ${name}
Sexo: ${gender}
Peso: ${weight}kg
Altura: ${height}cm
Idade: ${age}
Objetivo: ${objective}
Nivel de atividade: ${level}

Retorne APENAS um JSON valido no formato:

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

Nao utilize markdown.
Nao utilize crases.
Nao escreva explicacoes.
Retorne somente JSON.
`);

      const jsonText =
        response.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log("RESPOSTA GEMINI:", jsonText);

      const jsonObject = JSON.parse(jsonText);

      return {
        data: jsonObject,
      };
    } catch (err) {
      console.error("ERRO COMPLETO GEMINI:", err);

      return {
        data: {
          nome: name,
          sexo: gender,
          idade: Number(age),
          altura: Number(height),
          peso: Number(weight),
          objetivo: objective,
          refeicoes: [],
          suplementos: [],
        },
      };
    }
  }
}

export { CreateNutritionService };
