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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
    },
    body: JSON.stringify(body, null, 2),
  };
};

const getAllTodos = async () => {
  const scanResult = await dynamo
    .scan({
      TableName: tableName,
    })
    .promise();

  return scanResult;
};

const addTodoItem = async (data: { todo: string; id: string }) => {
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
    const { httpMethod, body: requestBody } = event;

    if (httpMethod === "OPTIONS") {
      return createResponse("OK");
    }

    if (httpMethod === "GET") {
      const response = await getAllTodos();

      return createResponse(response.Items || []);
    }

    if (!requestBody) {
      return createResponse("Missing request body", 500);
    }

    const data = JSON.parse(requestBody);

    if (httpMethod === "POST") {
      const todo = await addTodoItem(data);
      return todo
        ? createResponse(`${todo} added to the database`)
        : createResponse("Todo is missing", 500);
    }

    if (httpMethod === "DELETE") {
      const id = await deleteTodoItem(data);
      return id
        ? createResponse(
            `Todo item with an id of ${id} deleted from the database`,
          )
        : createResponse("ID is missing", 500);
    }

    return createResponse(
      `We only accept GET, POST, OPTIONS and DELETE, not ${httpMethod}`,
      500,
    );
  } catch (error) {
    console.log(error);
    return createResponse(error as any, 500);
  }
};
