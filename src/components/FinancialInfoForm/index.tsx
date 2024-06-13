import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CompleteFormSchemaType } from '@/utils/zod.schemas';

interface FinancialInfoFormProps {
  form: UseFormReturn<CompleteFormSchemaType>;
  onPreviousStep: () => void;
}

const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({
  form,
  onPreviousStep,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="income"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Income</FormLabel>
            <FormControl>
              <Input
                placeholder="Income"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Please enter your total annual income.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="debts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Debts</FormLabel>
            <FormControl>
              <Input
                placeholder="Debts"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>Please enter your total debts.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="assets"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assets</FormLabel>
            <FormControl>
              <Input
                placeholder="Assets"
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>Please enter your total assets.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <Button type="button" onClick={onPreviousStep}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </>
  );
};

export default FinancialInfoForm;
