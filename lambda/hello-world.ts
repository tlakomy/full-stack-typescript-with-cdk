import { APIGatewayEvent } from "aws-lambda";

export const handler = async function (event: APIGatewayEvent) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
    }),
  };
};
