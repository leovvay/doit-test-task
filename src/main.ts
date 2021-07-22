import { NestFactory } from '@nestjs/core';
import { CSVMigrationModule } from './CSVMigration.module';

async function bootstrap() {
  const app = await NestFactory.create(CSVMigrationModule);
  await app.listen(3000);
}
bootstrap();
