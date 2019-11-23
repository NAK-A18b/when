# WHEN

WHEN is a serverless nodejs-application intended to run on AWS. It informs students using WhatsApp about train delays.

## Project structure

- `aws` contains all logic related to AWS
- `backend`
  - `src/functions` contains all functions being deployed to the AWS-lambda infrastructure
  - `src/app` contains helper functions
  - `src/app/hvv` provides information about train delays
  - `src/app/nordakademie` fetches (and updates in DynamoDB) the students timetable times
- `bff` is a GraphQL Server handling frontend requests
- `dynamodb` contains seeds and migrations for the local DynamoDB installation
- `frontend` is a React App used to register for the notification service
- `whatsapp` provides functionality to send messages using the WhatsAppWebClient

## Branches

- `master` is the prod version
- `develop` is an unstable version with new features used during development

## Setup

### For local development

Go to the root directory:

```bash
npm run bootstrap
npm run dev
```
