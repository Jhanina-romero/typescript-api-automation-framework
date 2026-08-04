import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Environment variable "${name}" is required but was not found.`
    );
  }

  return value;
}

export const config = {
  baseUrl: getRequiredEnvironmentVariable('BASE_URL')
};