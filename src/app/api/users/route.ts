import CustomerService from '@/services/CustomerService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await CustomerService.getAllCustomers();

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'Error retrieving users',
    });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const data = await CustomerService.createCustomer({ ...body });

    return NextResponse.json({
      status: 201,
      message: 'Customer created successfully',
      data,
    });
  } catch (error) {
    console.error('ERR', error);
    return NextResponse.json({
      status: 500,
      message: 'Error creating customer',
    });
  }
};
