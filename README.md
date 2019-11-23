# WHEN
WHEN is a serverless nodejs-application intended to run on AWS. It informs students using WhatsApp about train delays.
## Project structure in `packages` folder
- `aws` contains all logic related to AWS
- `backend`
  - `drivers` provides Chrome-Drivers for Selenium
  - `src/functions` contains all functions being deployed to the AWS-lambda infrastructure
  - `src/app` contains helper functions: 
  - `chrome` is used to initalize selenium drivers
  - `hvv` provides information about train delays
  - `nordakademie` fetches (and updates in DynamoDB) the students timetable times
  - `whatsapp` provides functionality to send any messages to WhatsApp users
- `frontend`
  - `client` is a React App used to register for the notifcation service
  - `server` is a GraphQL Server handling frontend requests
## Branches
- `master` is the prod version
- `develop` is an unstable version with new features used during development
## Setup
### Local DynamoDB Setup
```bash
npm run db:setup
npm run db:start
npm run db:migrate
```
