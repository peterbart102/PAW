import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import 'reflect-metadata';
import {createConnection} from 'typeorm';

async function bootstrap() {
    await createConnection();
    const app = await NestFactory.create(ApplicationModule);
    app.enableCors({
        origin: 'http://localhost:8080'
    });
    await app.listen(9000);
}

bootstrap();
