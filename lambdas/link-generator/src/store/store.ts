import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const DynamoDBTableName = "shortened-links"

const StoreLink = async (hash: string, link: string): Promise<void> => {
    try {
        const client = getDynamoClient();
        const cmd = new PutItemCommand({
            Item: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "link-hash": { S: hash },
                "link": { S: link }
            },
            TableName: DynamoDBTableName,
        });
        const out = await client.send(cmd);
        console.log(out);
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
            }
        })
    } else {
        return new DynamoDBClient({ region: "eu-west-1" });
    }
}

export { StoreLink as default }