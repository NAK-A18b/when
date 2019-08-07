# WHEN
WHEN is a serverless nodejs-application intended to run on AWS. It informs students using WhatsApp about train delays.
## Project structure
- `drivers` provides Chrome-Drivers for Selenium
- `src/functions` contains all functions being deployed to the AWS-lambda infrastructure
- `src/app` contains helper functions: 
  - `chrome` is used to initalize selenium drivers
  - `hvv` provides information about train delays
  - `nordakademie` fetches (and updates in DynamoDB) the students timetable times
  - `whatsapp` provides functionality to send any messages to WhatsApp users
## Branches
- `master` is the prod version
- `develop` is an unstable version with new features used during development
