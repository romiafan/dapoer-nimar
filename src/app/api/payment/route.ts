import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, PaymentTransactionData } from '../../../lib/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { orderId, amount, customerDetails, shippingAddress, items } = body;
    
    if (!orderId || !amount || !customerDetails || !shippingAddress || !items) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    // Create payment transaction data
    const paymentData: PaymentTransactionData = {
      orderId,
      amount,
      customerDetails: {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
      },
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // Initialize payment service with Midtrans
    const paymentService = new PaymentService('midtrans');
    
    // Create payment
    const result = await paymentService.createPayment(paymentData);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        paymentUrl: result.paymentUrl,
        transactionId: result.transactionId,
      });
    } else {
      return NextResponse.json(
        { error: result.message || 'Payment creation failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const paymentService = new PaymentService('midtrans');
    const result = await paymentService.verifyPayment(transactionId);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}