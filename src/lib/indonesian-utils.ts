/**
 * Utility functions for Indonesian market formatting and localization
 */

/**
 * Format number as Indonesian Rupiah currency
 * Uses Indonesian locale (id-ID) for proper number formatting
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date for Indonesian locale
 */
export function formatIndonesianDate(date: Date | { toDate(): Date } | string | number): string {
  let dateObj: Date;
  
  if (date && typeof date === 'object' && 'toDate' in date) {
    // Firebase Timestamp
    dateObj = date.toDate();
  } else {
    // Regular Date, string, or number
    dateObj = new Date(date);
  }
  
  return dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  });
}

/**
 * Format phone number for Indonesian format
 */
export function formatIndonesianPhone(phone: string): string {
  // Remove any non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Handle Indonesian phone numbers (starting with 08 or +62)
  if (digits.startsWith('62')) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`;
  } else if (digits.startsWith('08')) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }
  
  return phone; // Return original if format not recognized
}

/**
 * Indonesian provinces for shipping/address forms
 */
export const indonesianProvinces = [
  'Aceh',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Kepulauan Riau',
  'Jambi',
  'Sumatera Selatan',
  'Bangka Belitung',
  'Bengkulu',
  'Lampung',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Banten',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Sulawesi Utara',
  'Sulawesi Tengah',
  'Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Gorontalo',
  'Sulawesi Barat',
  'Maluku',
  'Maluku Utara',
  'Papua',
  'Papua Barat'
];

/**
 * Common Indonesian shipping couriers
 */
export const indonesianCouriers = [
  { code: 'jne', name: 'JNE' },
  { code: 'pos', name: 'Pos Indonesia' },
  { code: 'tiki', name: 'TIKI' },
  { code: 'anteraja', name: 'AnterAja' },
  { code: 'jnt', name: 'J&T Express' },
  { code: 'sicepat', name: 'SiCepat' },
  { code: 'ninja', name: 'Ninja Express' },
  { code: 'lion', name: 'Lion Parcel' }
];