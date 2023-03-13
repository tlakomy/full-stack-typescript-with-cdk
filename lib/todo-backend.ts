import * as cdk from "aws-cdk-lib";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class TodoBackend extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const todosTable = new dynamodb.Table(this, "TodoDatabase", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

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
    const deleteTodosFunction = new lambdaNodejs.NodejsFunction(
      this,
      "DeleteTodosFunction",
      {
        entry: "lambda/deleteTodos.ts",
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
    todosTable.grantReadWriteData(deleteTodosFunction);

    const todoServiceApi = new apigateway.RestApi(this, "Endpoint", {
      restApiName: "Todo Service",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const todos = todoServiceApi.root.addResource("todos");

    todos.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createTodoFunction),
    );
    todos.addMethod("GET", new apigateway.LambdaIntegration(listTodosFunction));
    todos.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(deleteTodosFunction),
    );
  }
}
