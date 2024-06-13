import { CompleteFormSchemaType } from './zod.schemas';

export const simulateApiCall = async ({
  firstName,
  lastName,
  ssn,
  dob,
}: Partial<CompleteFormSchemaType>) => {
  return new Promise<{ income: number; debts: number; assets: number }>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          income: 290000,
          debts: 50000,
          assets: 150000,
        });
      }, 1000);
    }
  );
};

export const calculateRiskScore = (
  data: CompleteFormSchemaType,
  retrievedData: { income: number; debts: number; assets: number }
) => {
  let score = 5;

  if (data.income < retrievedData.income) {
    score -= 2;
  }

  if (data.debts > retrievedData.debts) {
    score -= 1.5;
  }

  if (data.assets < retrievedData.assets) {
    score -= 1.5;
  }

  return score;
};
