import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from './entities/Time';
import { Timeservice } from './times.service';
import { TimesController } from './times.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Time])],
    providers: [Timeservice],
    controllers: [TimesController],
    exports: [Timeservice]
})
export class TimesModule { }