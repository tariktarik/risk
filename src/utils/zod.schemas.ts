import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const PersonalInfoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  ssn: z.string().length(9, 'SSN must be 9 digits'),
  dob: z.string().length(10, 'DOB must be in the format YYYY-MM-DD'),
});

export const FinancialInfoFormSchema = z.object({
  income: z.number().min(0, 'Income must be a positive number'),
  debts: z.number().min(0, 'Debts must be a positive number'),
  assets: z.number().min(0, 'Assets must be a positive number'),
});

export const CompleteFormSchema = PersonalInfoFormSchema.merge(
  FinancialInfoFormSchema
);

export type CompleteFormSchemaType = z.infer<typeof CompleteFormSchema>;

export const CompleteFormResolver = zodResolver(CompleteFormSchema);
