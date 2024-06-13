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

interface PersonalInfoFormProps {
  form: UseFormReturn<CompleteFormSchemaType>;
  onNextStep: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  form,
  onNextStep,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input placeholder="First name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input placeholder="Last name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ssn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SSN</FormLabel>
            <FormControl>
              <Input placeholder="SSN" {...field} />
            </FormControl>
            <FormDescription>Your Social Security Number.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input
                type="date"
                max="2009-12-31"
                min="1924-01-01"
                placeholder="YYYY-MM-DD"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={onNextStep}>
        Next
      </Button>
    </>
  );
};

export default PersonalInfoForm;
