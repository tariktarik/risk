'use client';

import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';

import {
  CompleteFormSchemaType,
  CompleteFormResolver,
} from '@/utils/zod.schemas';
import PersonalInfoForm from '../PersonalInfoForm';
import FinancialInfoForm from '../FinancialInfoForm';
import { calculateRiskScore, simulateApiCall } from '@/utils/formUtils';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function ProfileForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [report, setReport] = useState<null | {
    entered: FieldValues;
    retrieved: FieldValues;
  }>(null);
  const [riskScore, setRiskScore] = useState<null | number>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<CompleteFormSchemaType>({
    resolver: CompleteFormResolver,
    defaultValues: {
      firstName: '',
      lastName: '',
      ssn: '',
      dob: '',
      income: 0,
      debts: 0,
      assets: 0,
    },
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger(['firstName', 'lastName', 'ssn', 'dob']);
    if (isValid) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const onSubmit = async (values: CompleteFormSchemaType) => {
    try {
      const res = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
        }),
      });
    } catch (error) {
      return {
        errors: error,
        message: error,
      };
    }
    const retrievedData = await simulateApiCall({
      firstName: values.firstName,
      lastName: values.lastName,
      ssn: values.ssn,
      dob: values.dob,
    });

    const reportData = {
      entered: {
        income: values.income,
        debts: values.debts,
        assets: values.assets,
      },
      retrieved: retrievedData,
    };

    const score = calculateRiskScore(values, retrievedData);

    setReport(reportData);
    setRiskScore(score);
    setSubmitted(true);
  };

  const handleReturnToHome = () => {
    setStep(1);
    setReport(null);
    setRiskScore(null);
    setSubmitted(false);
    form.reset({
      firstName: '',
      lastName: '',
      ssn: '',
      dob: '',
      income: 0,
      debts: 0,
      assets: 0,
    });

    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300  pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 text-lg">
          Risk Assessment Score
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo.svg"
              alt="WellBP Logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      {!submitted && (
        <div className="w-full max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <PersonalInfoForm form={form} onNextStep={handleNextStep} />
              )}
              {step === 2 && (
                <FinancialInfoForm
                  form={form}
                  onPreviousStep={handlePreviousStep}
                />
              )}
            </form>
          </Form>
        </div>
      )}
      {report && (
        <div className="mt-8 w-full max-w-2xl bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Report</h2>
          <p>
            <strong>Income:</strong> Entered: ${form.getValues('income')};
            Actual: ${report.retrieved.income}
          </p>
          <p>
            <strong>Debts:</strong> Entered: ${form.getValues('debts')}; Actual:
            ${report.retrieved.debts}
          </p>
          <p>
            <strong>Assets:</strong> Entered: ${form.getValues('assets')};
            Actual: ${report.retrieved.assets}
          </p>
          <h3 className="text-xl font-bold mt-4">
            Risk Assessment Score: {riskScore}
          </h3>

          <Button onClick={handleReturnToHome} className="mt-4">
            Start over
          </Button>
        </div>
      )}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left" />
    </main>
  );
}
