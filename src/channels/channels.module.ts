import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { ChannelsGateway } from './channels.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },  
    })
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService, ChannelsGateway]
})
export class ChannelsModule {}
