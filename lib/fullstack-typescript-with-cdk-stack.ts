import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { TodoBackend } from "./todo-backend";
import { Website } from "@symphoniacloud/cdk-website";

export class FullstackTypescriptWithCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new TodoBackend(this, "TodoBackend");

    // const logoBucket = new s3.Bucket(this, "LogoBucket", {
    //   publicReadAccess: true,
    //   blockPublicAccess: {
    //     blockPublicAcls: false,
    //     blockPublicPolicy: false,
    //     ignorePublicAcls: false,
    //     restrictPublicBuckets: false,
    //   },
    // });

    // new s3Deployment.BucketDeployment(this, "DeployLogo", {
    //   destinationBucket: logoBucket,
    //   sources: [s3Deployment.Source.asset("./assets")],
    // });

    // new cdk.CfnOutput(this, "LogoPath", {
    //   value: `https://${logoBucket.bucketDomainName}/egghead-logo.png`,
    // });

    // const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
    //   publicReadAccess: true,
    //   accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    //   websiteIndexDocument: "index.html",
    // });

    // new s3Deployment.BucketDeployment(this, "DeployWebsite", {
    //   destinationBucket: websiteBucket,
    //   sources: [s3Deployment.Source.asset("./frontend/build")],
    // });

    // new cdk.CfnOutput(this, "WebsiteAddress", {
    //   value: websiteBucket.bucketWebsiteUrl,
    // });

    // const website = new StaticWebsite(this, "StaticWebsite", {
    //   websiteContentPath: "./frontend/build",
    // });

    // new cdk.CfnOutput(this, "WebsiteAddress", {
    //   value: `https://${website.cloudFrontDistribution.distributionDomainName}`,
    // });

    const website = new Website(this, "website", {
      content: {
        path: "frontend/build",
        performCacheInvalidation: true,
      },
    });

    new cdk.CfnOutput(this, "WebsiteAddress", {
      value: `https://${website.cloudFront.distributionDomainName}`,
    });
  }
}
