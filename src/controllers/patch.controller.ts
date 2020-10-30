import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StreamGateway } from '../stream/stream.gateway';
import { PatchPayload } from './interfaces/patch.payload';

@Controller()
export class PatchController {
  /**
   * The gateway to stream patched
   *
   * @type {StreamGateway}
   * @private
   */
  @Inject(StreamGateway)
  private readonly gateway: StreamGateway;

  /**
   * Handle a patch
   *
   * @param {PatchPayload} data
   * @return {Promise<void>}
   */
  @EventPattern('patch')
  async patch(
    @Payload() data: PatchPayload,
  ) {
    this.gateway.notifyChange(data.entity, data.payload);
  }
}
