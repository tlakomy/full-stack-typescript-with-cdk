import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class TodoBackend extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "TodoDatabase", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    const listTodosFunction = new lambdaNodejs.NodejsFunction(
      this,
      "ListTodosFunction",
      {
        entry: "lambda/listTodos.ts",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_18_X,
        architecture: lambda.Architecture.ARM_64,
        environment: {
          TABLE_NAME: todosTable.tableName,
        },
      },
    );

    const createTodoFunction = new lambdaNodejs.NodejsFunction(
      this,
      "CreateTodoFunction",
      {
        entry: "lambda/createTodo.ts",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_18_X,
        architecture: lambda.Architecture.ARM_64,
        environment: {
          TABLE_NAME: todosTable.tableName,
        },
      },
    );

    todosTable.grantReadData(listTodosFunction);
    todosTable.grantReadWriteData(createTodoFunction);

    const todoServiceApi = new apigateway.RestApi(this, "Endpoint", {
      restApiName: "Todo Service",
    });

    const todoResource = todoServiceApi.root.addResource("todos");

    todoResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(listTodosFunction),
    );

    todoResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createTodoFunction),
    );
  }
}
