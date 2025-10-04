"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatRupiah } from "../../../lib/indonesian-utils";

interface PaymentResult {
  success: boolean;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  transactionId: string;
  amount?: number;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const statusCode = searchParams.get('status_code');
    const transactionStatus = searchParams.get('transaction_status');

    if (orderId) {
      verifyPayment(orderId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  async function verifyPayment(transactionId: string) {
    try {
      const response = await fetch(`/api/payment?transactionId=${transactionId}`);
      const result = await response.json();
      setPaymentResult(result);
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentResult({
        success: false,
        status: 'failed',
        transactionId
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold mb-4">Payment Error</h2>
          <p className="text-gray-600 mb-6">We couldn't verify your payment. Please contact support.</p>
          <Link
            href="/products"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const { status, transactionId, amount } = paymentResult;

  if (status === 'paid') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Transaction ID:</p>
            <p className="font-mono text-sm">{transactionId}</p>
            {amount && (
              <>
                <p className="text-sm text-gray-600 mt-2">Amount Paid:</p>
                <p className="font-bold text-lg text-green-600">{formatRupiah(amount)}</p>
              </>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            We'll start preparing your delicious donuts right away! 
            You'll receive a confirmation message on your phone soon.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/orders"
              className="block w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-4">Payment Pending</h2>
          <p className="text-gray-600 mb-4">
            Your payment is being processed. This may take a few minutes.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Transaction ID:</p>
            <p className="font-mono text-sm">{transactionId}</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            You'll receive a notification once the payment is confirmed.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => verifyPayment(transactionId)}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Check Payment Status
            </button>
            <Link
              href="/orders"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Failed or cancelled payment
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
        <div className="text-6xl mb-4">{status === 'cancelled' ? '❌' : '⚠️'}</div>
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          {status === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}
        </h2>
        <p className="text-gray-600 mb-4">
          {status === 'cancelled' 
            ? 'Your payment was cancelled. No charges were made.'
            : 'We couldn\'t process your payment. Please try again.'
          }
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Transaction ID:</p>
          <p className="font-mono text-sm">{transactionId}</p>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/cart"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}