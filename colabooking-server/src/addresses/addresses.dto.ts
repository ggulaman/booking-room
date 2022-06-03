import { IsString } from "class-validator";
export class AddressesDto {

  @IsString()
  addresses: string;
  
}
