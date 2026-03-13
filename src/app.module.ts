import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import * as dbConfig from '../configdb.json';
import { TimesModule } from './modules/times/times.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbConfig.url,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RolesModule,
    UsuarioModule,
    TimesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
