import { CustomerResponseDto } from './customer-response.dto';

/**
 * Customer with author and sales information
 */
export class CustomerInfoResponseDto extends CustomerResponseDto {
  createdByName: string;
  purchasedAmount: number;
}
