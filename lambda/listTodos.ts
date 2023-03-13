import { DynamoDB } from "aws-sdk";

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

export const handler = async function () {
  try {
    const response = await getAllTodos();

    return createResponse(response.Items || []);
  } catch (error) {
    console.log(error);
    return createResponse((error as Error).message, 500);
  }
};
