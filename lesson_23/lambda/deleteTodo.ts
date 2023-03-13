import { DynamoDB } from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";

const tableName = process.env.TABLE_NAME || "";
const dynamo = new DynamoDB.DocumentClient();

const createResponse = (
  body: string | DynamoDB.DocumentClient.ItemList,
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

const deleteTodoItem = async (data: { id: string }) => {
  const { id } = data;

  if (id && id !== "") {
    await dynamo
      .delete({
        TableName: tableName,
        Key: {
          id,
        },
      })
      .promise();
  }

  return id;
};

export const handler = async function (event: APIGatewayEvent) {
  try {
    const { body: requestBody } = event;

    if (!requestBody) {
      return createResponse("Missing request body", 500);
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
