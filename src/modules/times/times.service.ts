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

    async create(nome: string): Promise<Time> {
        const time = this.timeRepository.create({ nome });
        return this.timeRepository.save(time);
    }

    async update(id: number, nome: string): Promise<Time> {
        const time = await this.findFullTime(id);
        time.nome = nome;
        return this.timeRepository.save(time);
    }

    async remove(id: number): Promise<void> {
        const time = await this.findFullTime(id);
        await this.timeRepository.remove(time);
    }
}