import { DynamoDB } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { APIGatewayEvent } from "aws-lambda";

const tableName = process.env.TABLE_NAME || "";
const dynamo = new DynamoDB.DocumentClient();

const createResponse = (
  body: string | DynamoDB.DocumentClient.ItemList,
  statusCode = 200,
) => {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};

const addTodoItem = async (data: { todo: string; id: string }) => {
  // Implement me!
  const { id, todo } = data;
  if (todo && todo !== "") {
    await dynamo
      .put({
        TableName: tableName,
        Item: {
          id: id || uuid(),
          todo,
        },
      })
      .promise();
  }

  return todo;
};

export const handler = async function (event: APIGatewayEvent) {
  try {
    const { body: requestBody } = event;

    if (!requestBody) {
      return createResponse("Missing request body", 500);
    }

    const data = JSON.parse(requestBody);

    const todo = await addTodoItem(data);
    return todo
      ? createResponse(`${todo} added to the database`)
      : createResponse("Todo is missing", 500);
  } catch (error) {
    console.log(error);
    return createResponse((error as Error).message, 500);
  }
};
