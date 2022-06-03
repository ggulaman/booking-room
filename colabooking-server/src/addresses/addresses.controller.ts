import { Controller, Get } from '@nestjs/common';
import { AddressesModule } from './addresses.module';
import { AddressesService } from './addresses.service';
import { AddressesDto } from './addresses.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Get('/')
  getAddress(): AddressesDto {
    return this.addressService.getAddress();
  }
} 
