import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: process.env.RMQ_URLS?.split(',') ?? ['amqp://localhost:5772'],
      queue: process.env.RMQ_QUEUE ?? 'stream-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listenAsync();
}

void bootstrap();
