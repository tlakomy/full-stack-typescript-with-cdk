import { APIGatewayEvent } from "aws-lambda";
export const handler = async function (event: APIGatewayEvent) {
  console.log("event: ", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello World. You've hit ${event.path}`,
    }),
  };
};
