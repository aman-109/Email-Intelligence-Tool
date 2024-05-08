import logger from "../logger.js";

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(
    "https://intogloopenaigpt4.openai.azure.com/",
    new AzureKeyCredential(process.env.AZURECREDENTIAL_KEY),
);

export const getMessageTone = async (message: string) => {
    if (message.length === 0) return null
    try {
        const events = await client.getChatCompletions("gpt-35-turbo", [
            { role: "system", content: "You will be given email contents sent by client of a shipping company. You should analyse and tone of the message is positive, informative or negative. Negative messages could be various reasons due to delay in shipments, miscommunications, exceptions. Tone can be informative when they content is informing about a delay or other updates. Respond back in json format { tone: '', reply: Fine/Informative/Exception }" },
            { role: "user", content: message },
        ], { maxTokens: 128 });
        logger.info(`OpenAI:: Analysed message:${message} and resulted with ${events.choices[0].message.content}`)
        return JSON.parse(events.choices[0].message.content)
    } catch (error) {
        logger.error(`OpenAI:: Error finding message tone: ${JSON.stringify(error)}`)
        return null
    }
}