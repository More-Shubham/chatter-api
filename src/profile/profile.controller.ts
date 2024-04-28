import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DUser, RUser } from 'src/users/user.decorator';

@Controller('profile')
export class ProfileController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@DUser() user: RUser ) {
      return user
    }
  
}
