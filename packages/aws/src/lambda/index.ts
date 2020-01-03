import aws from "aws-sdk";

const { env } = process;
export const lambda = new aws.Lambda({
  apiVersion: "2031",
  region: "eu-central-1",
  endpoint: env.IS_LOCAL || env.IS_OFFLINE ? "http://localhost:4000" : undefined
});
