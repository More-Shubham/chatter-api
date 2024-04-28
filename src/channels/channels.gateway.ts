import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { group } from 'console';
import { Server, Socket as _Socket } from "socket.io"

type Socket = { user: { username: string, sub: string } } & _Socket

@WebSocketGateway()
export class ChannelsGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) { }

  @WebSocketServer()
  server: Server;
  
  handleConnection(client: Socket, ...args: any[]) {
    try {
      const authorization = client.handshake.headers['authorization'] as string | undefined
      const [, token] = authorization.split(' ')
      const user = this.jwtService.verify(token)
      client.user = user

      client.join(user.username)
    } catch (error) {
      client.disconnect()
    }
  }

  @OnEvent('channel.message')
  handleMessage(payload: { group: string, username: string, message: string }){
    this.server.to(payload.group).emit('message', { message: payload.message, username: payload.username })
  }
}
