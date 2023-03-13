import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { TodoBackend } from "./todo-backend";

export class TodoAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new TodoBackend(this, "TodoBackend");

    const logoBucket = new s3.Bucket(this, "LogoBucket", {
      publicReadAccess: true,
    });

    new s3Deployment.BucketDeployment(this, "DeployLogo", {
      destinationBucket: logoBucket,
      sources: [s3Deployment.Source.asset("./assets")],
    });

    new cdk.CfnOutput(this, "LogoPath", {
      value: `https://${logoBucket.bucketDomainName}/egghead-logo.png`,
    });

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    new s3Deployment.BucketDeployment(this, "DeployWebsite", {
      destinationBucket: websiteBucket,
      sources: [s3Deployment.Source.asset("./frontend/build")],
    });

    new cdk.CfnOutput(this, "WebsiteAddress", {
      value: websiteBucket.bucketWebsiteUrl,
    });
  }
}
