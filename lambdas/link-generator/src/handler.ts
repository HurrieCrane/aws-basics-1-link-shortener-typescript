import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import GenerateTinyLink from "./generator/generator";

const queryParamName = "uri"

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const uri = event.queryStringParameters[queryParamName];

    try {
        const tinyLink = await GenerateTinyLink(uri)
        return {
            statusCode: 200,
            body: JSON.stringify({
                uri: tinyLink,
            }),
        };
    }
    catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({
                errorMsg: "unable to generate url",
            }),
        };
    }
};