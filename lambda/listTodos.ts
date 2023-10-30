import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME || "";

const createResponse = (
  body: Record<string, unknown>[] | string,
  statusCode = 200,
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
    },
    body: JSON.stringify(body, null, 2),
  };
};

const getAllTodos = async () => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const scanResult = await docClient.send(command);

  return scanResult;
};

export const handler = async function () {
  try {
    const response = await getAllTodos();

    return createResponse(response.Items || []);
  } catch (error) {
    console.log(error);
    return createResponse((error as Error).message, 500);
  }
};
