import { Controller, Post, Get, Param, ParseIntPipe, Body } from "@nestjs/common";
import { JogoService } from "./jogo.service";

@Controller("jogo")
export class JogoController{
    constructor(
        private readonly jogosService: JogoService
    ){}

    @Get("all")
    async findAll(){
        return await this.jogosService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number){
        return await this.jogosService.findById(id);
    }
        
    @Post("criar")
    async create(@Body() duracao:number ){
        return this.jogosService.create(duracao);
    }

}