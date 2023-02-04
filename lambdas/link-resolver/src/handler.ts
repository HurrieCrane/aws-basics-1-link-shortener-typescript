import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import ResolveTinyLink from "./resolver/resolver";

const queryParamName = "hash"

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const hash = event.pathParameters[queryParamName];

    try {
        const tinyLink = await ResolveTinyLink(hash);
        return {
            statusCode: 301,
            headers: {
                "Location": tinyLink,
            },
            body: undefined,
            isBase64Encoded: false
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