import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

/**
 * The gateway that handles subscriptions and can send patch events
 */
@WebSocketGateway(80, {
  transports: ['websocket'],
})
export class StreamGateway {
  private readonly logger = new Logger('StreamGateway');

  @WebSocketServer()
  readonly server: Server;

  /**
   * The handler to subscribe to patch events
   *
   * @param {string} data
   * @param {SocketIO.Socket} socket
   */
  @SubscribeMessage('subscribe')
  subscribe(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.debug(`Someone joined ${data}`);

    socket.join(data);
  }

  /**
   * The handler to unsubscribe from patch events
   *
   * @param {string} data
   * @param {SocketIO.Socket} socket
   */
  @SubscribeMessage('unsubscribe')
  unsubscribe(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.debug(`Someone left ${data}`);

    socket.leave(data);
  }

  /**
   * Method to send a patch event to subscribed clients
   *
   * @param {string} room
   * @param data
   */
  notifyChange(room: string, data: any) {
    this.server.to(room).emit('patch', data);
  }
}
