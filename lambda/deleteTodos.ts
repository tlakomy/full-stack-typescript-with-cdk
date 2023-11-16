import { APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME || "";

const createResponse = (body: string, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
    },
    body: JSON.stringify(body, null, 2),
  };
};

const deleteTodoItem = async (data: { id: string }) => {
  const { id } = data;

  if (id && id !== "") {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: {
        id,
      },
    });

    await docClient.send(command);
  }

  return id;
};

export const handler = async function (event: APIGatewayEvent) {
  try {
    const { body: requestBody } = event;

    if (!requestBody) {
      return createResponse("Missing request body", 403);
    }

    const data = JSON.parse(requestBody);

    const id = await deleteTodoItem(data);
    return id
      ? createResponse(
          `Todo item with an id of ${id} deleted from the database`,
        )
      : createResponse("ID is missing", 500);
  } catch (error) {
    console.log(error);
    return createResponse((error as Error).message, 500);
  }
};
