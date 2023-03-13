import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";

export class TodoAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloWorldFunction = new lambdaNodejs.NodejsFunction(
      this,
      "HelloWorldFunction",
      {
        entry: "lambda/helloWorld.ts",
        handler: "handler",
        memorySize: 256,
        architecture: lambda.Architecture.ARM_64,
        runtime: lambda.Runtime.NODEJS_18_X,
        timeout: Duration.seconds(10),
        environment: { isProduction: "absolutely not" },
      },
    );

    const endpoint = new apiGateway.LambdaRestApi(this, "Endpoint", {
      handler: helloWorldFunction,
    });
  }
}
