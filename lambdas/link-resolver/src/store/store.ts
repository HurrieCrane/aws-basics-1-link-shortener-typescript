import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const DynamoDBTableName = "shortened-links"

const GetLink = async (hash: string): Promise<string> => {
    try {
        const client = getDynamoClient();
        const cmd = new GetItemCommand({
            Key: { 
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "link-hash": {
                    S: hash
                } 
            },
            TableName: DynamoDBTableName,
        });
        const res = await client.send(cmd);
        return res.Item["link"].S;
    } catch (e) {
        console.error("could not add link to datastore", e);
        throw e;
    }
};

const getDynamoClient = (): DynamoDBClient => {
    if (process.env.ENVIRONMENT === "local") {
        return new DynamoDBClient({
            region: "localhost",
            endpoint: "http://dynamo:8000",
            credentials: {
                accessKeyId: 'b59xng',
                secretAccessKey: 'b2sc6o',
                sessionToken: ''
            },
        })
    } else {
        return new DynamoDBClient({ region: "eu-west-1" });
    }
}

export { GetLink as default }