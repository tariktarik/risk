import prisma from '@/lib/prisma';

const FinancialInfoService = {
  async createFinancialInfo(data: {
    income: number;
    debts: number;
    assets: number;
    customerId: number;
  }) {
    const { income, debts, assets, customerId } = data;

    try {
      const financialInfo = await prisma.financialInfo.create({
        data: {
          income,
          debts,
          assets,
          customerId,
        },
      });

      return financialInfo;
    } catch (error) {
      console.error('Error creating financial info:', error);
      throw new Error('Failed to create financial info');
    }
  },
};

export default FinancialInfoService;
