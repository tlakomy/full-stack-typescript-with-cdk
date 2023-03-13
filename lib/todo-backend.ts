import * as cdk from "aws-cdk-lib";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class TodoBackend extends Construct {
  public readonly handler: lambdaNodejs.NodejsFunction;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "TodoDatabase", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    this.handler = new lambdaNodejs.NodejsFunction(this, "TodoHandler", {
      entry: "lambda/todoHandler.ts",
      handler: "handler",
      environment: {
        TABLE_NAME: todosTable.tableName,
      },
    });

    todosTable.grantReadWriteData(this.handler);
  }
}
