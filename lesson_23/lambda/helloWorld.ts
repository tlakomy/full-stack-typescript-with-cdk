import { APIGatewayEvent } from "aws-lambda";
export const handler = async function (event: APIGatewayEvent) {
  console.log("event: ", JSON.stringify(event, null, 2));
  console.log("is production?", process.env.isProduction);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello World. You've hit ${event.path}`,
    }),
  };
};
