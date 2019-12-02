import { DynamoDB } from 'aws-sdk';

export const toDynamoDBValue = (data: any) => DynamoDB.Converter.input(data);
export const toDynamoDBRecord = (data: any) =>
  DynamoDB.Converter.marshall(data);
