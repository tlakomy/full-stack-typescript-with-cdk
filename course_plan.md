Course title: Full Stack TypeScript with AWS Cloud Development Kit

## Lesson 01

Title: Install AWS Cloud Development Kit (CDK) and create a new project

Description: All amazing projects have to start somewhere and AWS CDK is no exception.

In this quick lesson we're going to learn how to install AWS CDK command line interface with npm as well as how to use cdk init in order to create our very first CDK project 🥳

Notes:

- `npm install -g aws-cdk`
- `cdk --version` (make sure it's 2.x.x)
- `mkdir todo-app && cd $\_`
- `cdk init sample-app --language=typescript`

## Lesson 02

Title: Build and deploy a sample AWS Cloud Development Kit stack to AWS

Description:
Now that our initial AWS CDK project has been created, it's time to deploy it!

In this quick lesson we're going to learn:

- where do we define an AWS CDK stack
- what is a CDK construct (you can read more about CDK constructs [here](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html))
- how to use `cdk diff` command in order to see the difference between our currently deployed stack and the stack we're about to deploy
- how to use `cdk deploy` in order to deploy a CDK stack to AWS

## Lesson 03

Title: Review an AWS CloudFormation stack deployed with AWS CDK

Description:
Now that our initial stack has been deployed it's time to dig into AWS Console to see what exactly did we deploy.

Cloud Development Kit is built on top of CloudFormation which is an AWS service that allows you to describe a stack in AWS using a static file (either YAML or JSON).

In essence - it's going to convert our code written in TypeScript, to JavaScript, which will be then converted to CloudFormation and CloudFormation will be used to deploy our infrastructure.

Sounds complicated, right? Luckily CDK abstracts a lot of things away from us, so we get to focus on solving our problems instead of writing YAML by hand.

In this lesson we're going to learn how to review an AWS CDK stack deployment in CloudFormation console.

## Lesson 04

Title: Clear an initial AWS CDK stack to start building an app from scratch

Description: In this quick lesson we're going to clear out the SQS Queue and SNS Topic that was created for us when we created a CDK app with cdk init in order for us to be able to start building our app from scratch.

## Lesson 05

Title: Create and deploy a Node.js AWS Lambda function with AWS CDK

Description:

It's time to start building our serverless backend!

In this quick lesson we're going to use the `NodejsFunction` construct provided by CDK in order to build and deploy a 'Hello World!' AWS Lambda function.

You can find out more about what kind of constructs are available in AWS CDK construct library [here](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)

Notes:

- `npm i --save-dev @types/aws-lambda`
- `npm i --save-dev esbuild`
- deploy

## Lesson 06

Title: Review and execute an AWS Lambda function deployed with CDK in AWS Console

Description:
In the previous lesson we've managed to successfully create and deploy an AWS Lambda function.

Before we progress further, in this lesson we're going to quickly take a look at AWS Console in order to understand where exactly can we find the stack that we've deployed and also execute the Lambda function using a test event to make sure that it's working fine.

- go to console and create a Test event
- execute the function

## Lesson 07

Title: Change the properties of an AWS Lambda function deployed with AWS CDK

Description:
Every resource we deploy to AWS with CDK has some default values configured for us so that we don't have to configure everything ourselves.

This comes in handy because it allows us to focus on building our infrastructure and solving our problems instead of configuring everything.

With that being said - CDK allows us to configure various properties of our resources! In this quick lesson we're going to learn how to configure the memory size, runetime, architecture and timeout of an AWS Lambda function.

Notes:

- memorySize: 256,
- architecture: lambda.Architecture.ARM_64,
- runtime: lambda.Runtime.NODEJS_18_X,
- timeout: Duration.seconds(10),

## Lesson 08

Title: Attach an API Gateway to an AWS Lambda function deployed with AWS CDK

Description:

Serverless technologies like AWS Lambda allow us to build our applications out of small, independent functions that can be called based on events such as an API call.

By default, it's not possible to call an AWS Lambda function from the Internet - it's safely stored within AWS cloud, following the principle of least privilege.

In order to create a REST API to call an AWS Lambda function we need to use API Gateway. Luckily, with AWS CDK, we can create a LambdaRestApi in 3 lines of code and this is exactly what we're going to learn in this quick lesson!

## Lesson 09

Title: Pass environment variables to an AWS Lambda function deployed with AWS CDK

Description: Environment variables are really useful in programming - they allow us to avoid hardcoding secrets (such as API keys) in our code with added bonus of using different values depending on the environment (hence the name!).

In this quick lesson we're going to learn how to pass environment variables to an AWS Lambda function deployed with Cloud Development Kit (in a single line of code!)

## Lesson 10

Title: Create and deploy an S3 bucket with AWS CDK

Description:

AWS Lambda functions and API Gateways are not the only type of AWS resource we can deploy to AWS cloud using CDK. In fact - nearly every resource that is deployable (is that a word?) with CloudFormation, can also be deployed with AWS CDK.

One of the most popular services on AWS is Amazon S3, which stands for Simple Storage Service.

Files on S3 are stored in things called "buckets", which are unlimited in size and each bucket has a globally unique name.

In this quick lesson we're going to create and deploy a brand new S3 bucket to AWS with CDK

## Lesson 11

Title: Make the contents of an S3 bucket deployed with CDK public

Description:

Files uploaded to an S3 bucket are not accessible by default from the Internet.

Which makes sense - by default they should be secure, but since we'd like to host a logo file to be displayed in our app, we need to make the bucket public.

Luckily, with CDK we need to literally change a single line of code - in this quick lesson we're going to learn how to make the contents of an S3 bucket public.

## Lesson 12

Title: Create an S3 event notification to trigger an AWS Lambda function on file upload

Description:

A huge part of building serverless applications with AWS is being able to connect certain cloud resources and have them react to certain events.

Currently our HelloLambda function can be triggered by a GET request event sent to the API Gateway, but that's not the only use case when a lambda function can be triggered.

Suppose we'd like to trigger the lambda function whenever a file is uploaded to an S3 bucket, for instance, to generate a thumbnail. Once a thumbnail is generated, lambda function can call another function etc., this behaviour is up to us to define.

In order to call a lambda function when a file is uploaded to an S3 bucket, we need to use an s3Notifications construct - and that's exactly what we're going to do in this quick lesson.

## Lesson 13

Title: Use a bucket deployment to upload a file to S3 when deploying a CDK stack

Description:

Instead of uploading the files manually through the AWS console, a better solution would be to automatically upload the asset directory (or any other directory we'd like to upload) whenever we deploy our stack. After all, with CDK we'd like to reduce the manual work to minimum and focus on building an architecture and solving our problems.

In this lesson we're going to learn how to use the aws-s3-deployment construct in order to upload an assets directory to an s3 bucket automatically whenever we deploy the CDK stack.

## Lesson 14

Title: Create a custom AWS CDK construct

Now that we know a lot about shipping cloud resources with CDK it's time to start creating a serverless backend for our todo application.

We could add the database and new AWS Lambda functions to our main stack but after a while it might get difficult to maintain.

Instead, in this lesson we're going learn how to create our very own custom CDK construct.

Learn more about CDK constructs [here](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html).

## Lesson 15

Title: Create a DynamoDB table with AWS CDK

Description:

Amazon DynamoDB is a fully managed non-relational (NoSQL) database service that provides fast and predictable performance with seamless scalability.

In other words - DynamoDB is entirely managed by AWS (so it's scaled for us, even if our startup has millions of users), it's a NoSQL database so we don't have to start by defining a detailed schema like in a relational database and it's used by companies like AirBnB, Lyft and Samsung in production.

In this quick lesson we're going to learn how to create a brand new DynamoDB table from scratch with AWS CDK.

## Lesson 16

Title: Get all items from a DynamoDB table deployed with CDK using DocumentClient API

Now we're getting somewhere 🎉

Our stack has plenty of resources and how it's the time to start combining them together.

In this lesson we're going to create a new lambda function that will read data from our new TodoTable.

Since we don't want to add unnecessary noise, we're going to define the lambda function in the TodoBackend stack.

After all - whoever will end up using that stack shouldn't have worry too much about the underlying details. That's the power of CDK - we get to abstract away unnecessary implementation details and focusing on solving problems by deploying infrastructure and resources we need to solve them.

Notes:

- Remove helloWorldFunction and endpoint for it
- Create a new RestApi inside of the TodoBackend stack
- npm i --save aws-sdk
- https://github.com/dabit3/dynamodb-documentclient-cheat-sheet#scan---scanning-and-returning-all-of-the-items-in-the-database

## Lesson 17

Title: Debug permission issues and allow an AWS Lambda function to access data from a DynamoDB table

Description:

At the end of the last lesson we've managed to create a Lambda function which we want to use to get data from DynamoDB table using the scan operation.

Unfortunately, after calling the AWS Lambda function we get a following response:

```
"message": "User: arn:aws:sts::696785635119:assumed-role/TodoAppStack-TodoDatabaseTodoHandlerServiceRole991-152UNT6KUIOG2/TodoAppStack-TodoDatabaseTodoHandlerDD6198FE-CPTO6AAJJU5W is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:eu-central-1:696785635119:table/TodoAppStack-TodoDatabaseTodoTable29EA4913-E6Z09XSAAHF8",
```

In this quick lesson we're going to learn two things:

- how to debug permission issues in AWS using CloudWatch
- how to allow an AWS Lambda function to access data from a DynamoDB table with grantReadData function (in a single line of code!)

## Lesson 18

Title: Adding data to a DynamoDB table with put operation

Description:

In this quick lesson we're going to create a `createTodo` AWS Lambda function which will allow us to add new items to our DynamoDB table.

Notes:

- npm i uuid
- npm i --save-dev @types/uuid

## Lesson 19

Title: Delete an item from a DynamoDB table with delete operation

The best kind of todo is the one we already did and we can delete it from the list 🎉

In this quick lesson we're going to learn how to delete an item from our DynamoDB table with a AWS.DynamoDB.DocumentClient delete operation.

## Lesson 20

Title: Connect React app to a serverless backend deployed with CDK and fix CORS issues

Description:
It is time.

Our serverless backend and infrastructure (that we both created and deployed ourselves with CDK!) is ready so we can connect it to our React app.

In this quick lesson we're going to learn how to connect the React app from the source code of this course to our API as well as how to add appropriate CORS headers to our API response.

Notes:

- Add:

```
defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
```

to apigateway

- Return proper headers in each Lambda function:

```
headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE",
    },
```

## Lesson 21

Title: Add a custom CloudFormation stack output with CDK

Description:

Once we deploy static assets to an S3 bucket it's good to know, well, where are they exactly - saying that "they're in the cloud" is not a good answer.

We can find the S3 bucket and other resources in AWS Console manually but there's a better solution - creating custom CloudFormation stack outputs that are displayed in the terminal once we deploy.

In this quick lesson we're going to learn how to create a custom CloudFormation stack output in order to output the path to an egghead logo in order to add it to our app.

## Lesson 22

Title: Deploy a static website to S3 with AWS CDK

Description:

Our app is now finished and it is time to show it to the world.

In this quick lesson we're going to learn how to deploy a static website to S3 with AWS CDK so it is accessible from the internet and no longer lives only in our localhost.

## Lesson 23

Title: Deploy a site with HTTPS support behind a CDN with CDK

Description:

Deploying a static site to S3 works really well unless we consider the fact that you cannot add HTTPS support to the site directly in S3. In order to do that - a CloudFront distribution is required.

While it is possible to setup CloudFront with CDK on our own, we don't always have to do anything on our own.

Instead, we can use constructs that were created by the community, such as ones from [CDK Construct Hub](https://constructs.dev/), for instance [`static-website`](https://constructs.dev/packages/@aws-prototyping-sdk/static-website/v/0.14.10?lang=typescript) construct.

## Lesson 24

Title: Destroy an AWS CDK stack

Description:
When experimenting with CDK it's possible to deploy a service which is outside of free tier (since nearly all AWS services are supported) and it's useful to be able to delete an entire CDK stack if necessary.

In this quick lesson we're going to learn how to delete an entire AWS CDK stack with cdk destroy command.
