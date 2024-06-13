import prisma from '@/lib/prisma';
import financialInfoService from './FinancialInfoService';
import { Customer } from '@prisma/client';

const CustomerService = {
  async getAllCustomers() {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          financial: true,
        },
      });
      return customers;
    } catch (error) {
      console.error('Error retrieving customers:', error);
      throw new Error('Failed to retrieve customers');
    }
  },
  async createCustomer(
    data: Partial<Customer> & {
      income: number;
      debts: number;
      assets: number;
    }
  ) {
    const { firstName, lastName, dob, ssn, income, debts, assets } = data;

    if (!firstName || !lastName || !dob || !ssn) {
      throw new Error(
        'Missing required fields (firstName, lastName, dob, ssn)'
      );
    }

    try {
      const customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          dob,
          ssn,
        },
      });

      await financialInfoService.createFinancialInfo({
        income: income,
        debts: debts,
        assets: assets,
        customerId: customer.id,
      });

      return customer;
    } catch (error) {
      console.error('Error creating customer and financial info:', error);
      throw new Error('Failed to create customer and financial info');
    }
  },
};

export default CustomerService;
