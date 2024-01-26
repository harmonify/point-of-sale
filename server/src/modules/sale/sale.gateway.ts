import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SaleGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('cart-update')
  async identity(@MessageBody() { sessionId, data }: any): Promise<any> {
    return this.server.emit(`cart-update-${sessionId}`, data);
  }
}
