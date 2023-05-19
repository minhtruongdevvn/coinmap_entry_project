import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MongoExceptionFilter } from './common/filter/mongo-exception-filter';
import { AtGuard, RoleGuard } from './common/guard';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    MongooseModule.forRootAsync({
      //imports: [ConfigModule], // no need as ConfigModule is global
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
    }),
    AuthModule,
    UserModule,
    CommonModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
  ],
})
export class AppModule {}
