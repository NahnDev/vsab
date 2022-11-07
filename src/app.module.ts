import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { CaslModule } from './casl/casl.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppGateway } from './app.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AssociationModule } from './association/association.module';
import { ResourceModule } from './resource/resource.module';
import { PackageModule } from './package/package.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { EventModule } from './event/event.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('database.default.uri'),
        };
      },
    }),
    EventEmitterModule.forRoot(),
    MailModule,
    UserModule,
    AuthModule,
    CaslModule,
    AssociationModule,
    ResourceModule,
    PackageModule,
    PostModule,
    CommentModule,
    EventModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
