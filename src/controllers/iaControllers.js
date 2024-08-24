const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")

require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");
const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

const genAI = new GoogleGenerativeAI(process.env.IA_TOKEN);

class iaController {
    async generate(req, res){
        const {input, detalhada} = req.body

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        let prompt = ""

        if(detalhada){
            prompt = `Faça um pergunta sobre o assunto ${input} com 4 alternativas, sendo um correta. Tanto a pergunta e as alternativas podem ser bem detalhadas e descritivas. Me devolva no seguinte formato: { pergunta: "", alternativas: [{conteudo: "", correta: boolean}] }, sem mais nada, somente nesse formato que eu lhe pedi e em string`
        } else{  
            prompt = `Faça um pergunta sobre o assunto ${input} com 4 alternativas, sendo um correta. Tanto a pergunta quando as alternativas podem ser bem descritivas, ou não, você que decide. Me devolva no seguinte formato: { pergunta: "", alternativas: [{conteudo: "", correta: boolean}] }, sem mais nada, somente nesse formato que eu lhe pedi e em string`
        }

    
        const { totalTokens } = await model.countTokens(prompt);
        console.log(totalTokens);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;

        if(!response){
            throw new AppError(ERROR_CODES.IA_ERROR.SOMETHING_WRONG)
        }

        const text = response.text();

        const jsonResponse = JSON.parse(text);

        res.json(jsonResponse)
    }

}

module.exports = iaController