import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateENVVars } from './config/app.env';
import { getLoggingUtil } from './utils/logging.util';
import { ValidationPipe } from '@nestjs/common';
import { initMySQL } from './config/mysql.config';
const logger = getLoggingUtil('MAIN');

async function bootstrap() {
  validateENVVars();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/apis/blogging-sys');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //app.useGlobalFilters(new ExceptionFilterEx()); //todo
  await initDatabases();
  await app.startAllMicroservices();
  const PORT: number = 3001;
  logger.info('BOOTSTRAP', `BLOGGING_SYS_API_STARTED - PORT: ${PORT}`);

  await app.listen(PORT);
}
async function initDatabases() {
  logger.info('BOOTSTRAP', 'INITIALIZING DATABASE');
  await initMySQL();
  logger.info('BOOTSTRAP', 'INITIALIZED DATABASE');
}

bootstrap();

