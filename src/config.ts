enum Environments {
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}

interface Config {
  MENTE_SERENA_API_BASE_URL: string;
}

//TODO:  Look for QA and PROD URL
const configByEnvironment: {
  [key in Environments]: Config;
} = {
  [Environments.DEV]: {
    MENTE_SERENA_API_BASE_URL: 'https://api-dev.tumenteserena.com',
  },
  [Environments.STAGING]: {
    MENTE_SERENA_API_BASE_URL: 'https://api-qa.tumenteserena.com',
  },
  [Environments.PROD]: {
    MENTE_SERENA_API_BASE_URL: 'https://api-dev.tumenteserena.com',
  },
};

//TODO: Check this NEXT_PUBLIC_ENVIRONMENT
const config =
  (configByEnvironment?.[process.env.NEXT_PUBLIC_ENVIRONMENT] as Config) ?? configByEnvironment[Environments.PROD];

export default config;
