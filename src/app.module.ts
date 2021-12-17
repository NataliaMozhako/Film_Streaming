import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GenresModule } from './genres/genres.module';
import { RolesModule } from './roles/roles.module';
import { YearsModule } from './years/years.module';
import { DescriptionsModule } from './descriptions/descriptions.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Natalia_Mozhako:mongodb@cluster0.jswpq.mongodb.net/MoviDatabase?retryWrites=true&w=majority'
    ),
    MoviesModule,
    UsersModule,
    ProfilesModule,
    GenresModule,
    RolesModule,
    YearsModule,
    DescriptionsModule,
    CommentsModule,
    AuthModule,
    StripeModule.forRoot({
      apiKey: 'my_secret_key',
      apiVersion: '2020-08-27'
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

