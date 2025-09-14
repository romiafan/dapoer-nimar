// Payment gateway service for Indonesian market
// Supports Midtrans and Xendit integration

export interface PaymentProvider {
  name: string;
  createTransaction(data: PaymentTransactionData): Promise<PaymentResponse>;
  verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse>;
}

export interface PaymentTransactionData {
  orderId: string;
  amount: number;
  customerDetails: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city?: string;
    postalCode?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId: string;
  message?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  transactionId: string;
  amount?: number;
}

// Midtrans implementation (placeholder)
class MidtransProvider implements PaymentProvider {
  name = 'Midtrans';
  
  async createTransaction(data: PaymentTransactionData): Promise<PaymentResponse> {
    // TODO: Implement Midtrans Snap API integration
    // https://docs.midtrans.com/en/snap/overview
    
    console.log('Creating Midtrans transaction for order:', data.orderId);
    
    // Placeholder response
    return {
      success: false,
      transactionId: data.orderId,
      message: 'Midtrans integration not yet implemented'
    };
  }
  
  async verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse> {
    // TODO: Implement Midtrans transaction status check
    console.log('Verifying Midtrans transaction:', transactionId);
    
    return {
      success: false,
      status: 'pending',
      transactionId
    };
  }
}

// Xendit implementation (placeholder)
class XenditProvider implements PaymentProvider {
  name = 'Xendit';
  
  async createTransaction(data: PaymentTransactionData): Promise<PaymentResponse> {
    // TODO: Implement Xendit Invoice API integration
    // https://developers.xendit.co/api-reference/#create-invoice
    
    console.log('Creating Xendit transaction for order:', data.orderId);
    
    return {
      success: false,
      transactionId: data.orderId,
      message: 'Xendit integration not yet implemented'
    };
  }
  
  async verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse> {
    // TODO: Implement Xendit invoice status check
    console.log('Verifying Xendit transaction:', transactionId);
    
    return {
      success: false,
      status: 'pending',
      transactionId
    };
  }
}

// Payment service factory
export class PaymentService {
  private provider: PaymentProvider;
  
  constructor(providerName: 'midtrans' | 'xendit' = 'midtrans') {
    switch (providerName) {
      case 'midtrans':
        this.provider = new MidtransProvider();
        break;
      case 'xendit':
        this.provider = new XenditProvider();
        break;
      default:
        throw new Error(`Unsupported payment provider: ${providerName}`);
    }
  }
  
  async createPayment(data: PaymentTransactionData): Promise<PaymentResponse> {
    return this.provider.createTransaction(data);
  }
  
  async verifyPayment(transactionId: string): Promise<PaymentVerificationResponse> {
    return this.provider.verifyTransaction(transactionId);
  }
  
  getProviderName(): string {
    return this.provider.name;
  }
}

// Environment variables for payment gateways (to be added to .env.local)
export const paymentConfig = {
  midtrans: {
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true'
  },
  xendit: {
    secretKey: process.env.XENDIT_SECRET_KEY,
    publicKey: process.env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY,
    webhookToken: process.env.XENDIT_WEBHOOK_TOKEN
  }
};