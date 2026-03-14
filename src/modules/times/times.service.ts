import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from './entities/Time';
import { ItimeService } from './interface/times-service-interface';

@Injectable()
export class Timeservice implements ItimeService {
    constructor(
        @InjectRepository(Time)
        private readonly timeRepository: Repository<Time>,
    ) { }

    async findFullTime(timeId: number): Promise<Time> {
        const time = await this.timeRepository.findOne({
            where: {
                id: timeId,
            },
            relations: ['jogadors'],
        });


        if (!time) {
            throw new NotFoundException(`Time com ID ${timeId} não encontrado.`);
        }

        return time;
    }

    async findAll(): Promise<Time[]> {
        return this.timeRepository.find();


    }
}