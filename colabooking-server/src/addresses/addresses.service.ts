import { Injectable } from '@nestjs/common';
import { AddressesDto } from './addresses.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AddressesService {
  constructor(private readonly configService: ConfigService) {}

  public address: AddressesDto = { addresses: this.configService.get('COLADAY_SC_ADDRESS')};

  getAddress(): AddressesDto {
    return this.address;
  }
}
