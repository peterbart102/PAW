import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';

async function bootstrap() {
    const connection: Connection = await createConnection();
    const app = await NestFactory.create(ApplicationModule);
    await app.listen(9000);
}

bootstrap();
