import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(SeedModule);
    const seedService = app.get(SeedService);
    console.log('Starting seed...');
    await seedService.run();
    console.log('Seed completed successfully!');
    await app.close();
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

bootstrap();
