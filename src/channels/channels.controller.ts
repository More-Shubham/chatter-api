import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DUser, RUser } from 'src/users/user.decorator';

@Controller('channels')
export class ChannelsController {
    constructor(private eventEmitter: EventEmitter2) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    sendMessage(@DUser() user: RUser, @Body('message') message: string, @Body('group') group?: string) {
        // TODO: store in database
        this.eventEmitter.emit(
            'channel.message',
            {
                group: group ?? user.username,
                username: user.username,
                message: message
            }
        );
        return { group: group ?? user.username, username: user.username, message }
    }
}
