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

// Midtrans implementation
class MidtransProvider implements PaymentProvider {
  name = 'Midtrans';
  private serverKey: string;
  private clientKey: string;
  private isProduction: boolean;
  private baseUrl: string;
  
  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    this.clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    this.baseUrl = this.isProduction 
      ? 'https://api.midtrans.com/v2' 
      : 'https://api.sandbox.midtrans.com/v2';
      
    if (!this.serverKey || !this.clientKey) {
      console.warn('Midtrans credentials not configured. Please check your environment variables.');
    }
  }
  
  async createTransaction(data: PaymentTransactionData): Promise<PaymentResponse> {
    try {
      if (!this.serverKey) {
        return {
          success: false,
          transactionId: data.orderId,
          message: 'Midtrans server key not configured'
        };
      }

      // Prepare Midtrans Snap API payload
      const snapPayload = {
        transaction_details: {
          order_id: data.orderId,
          gross_amount: data.amount
        },
        customer_details: {
          first_name: data.customerDetails.firstName,
          last_name: data.customerDetails.lastName || '',
          email: data.customerDetails.email || '',
          phone: data.customerDetails.phone,
          shipping_address: {
            address: data.shippingAddress.address,
            city: data.shippingAddress.city || '',
            postal_code: data.shippingAddress.postalCode || ''
          }
        },
        item_details: data.items.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name
        })),
        callbacks: {
          finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`
        }
      };

      // Call Midtrans Snap API
      const response = await fetch(`${this.baseUrl}/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(this.serverKey + ':').toString('base64')}`
        },
        body: JSON.stringify(snapPayload)
      });

      const result = await response.json();

      if (response.ok && result.redirect_url) {
        return {
          success: true,
          paymentUrl: result.redirect_url,
          transactionId: data.orderId,
          message: 'Payment URL created successfully'
        };
      } else {
        return {
          success: false,
          transactionId: data.orderId,
          message: result.status_message || 'Failed to create payment'
        };
      }
    } catch (error) {
      console.error('Midtrans payment creation error:', error);
      return {
        success: false,
        transactionId: data.orderId,
        message: 'Payment service temporarily unavailable'
      };
    }
  }
  
  async verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse> {
    try {
      if (!this.serverKey) {
        return {
          success: false,
          status: 'pending',
          transactionId
        };
      }

      const response = await fetch(`${this.baseUrl}/${transactionId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(this.serverKey + ':').toString('base64')}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        let status: 'pending' | 'paid' | 'failed' | 'cancelled' = 'pending';
        
        switch (result.transaction_status) {
          case 'capture':
          case 'settlement':
            status = 'paid';
            break;
          case 'pending':
            status = 'pending';
            break;
          case 'deny':
          case 'cancel':
          case 'expire':
            status = 'cancelled';
            break;
          case 'failure':
            status = 'failed';
            break;
        }

        return {
          success: true,
          status,
          transactionId,
          amount: result.gross_amount ? parseInt(result.gross_amount) : undefined
        };
      } else {
        return {
          success: false,
          status: 'pending',
          transactionId
        };
      }
    } catch (error) {
      console.error('Midtrans verification error:', error);
      return {
        success: false,
        status: 'pending',
        transactionId
      };
    }
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