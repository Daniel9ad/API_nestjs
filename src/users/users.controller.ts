import { Body, Controller, Get, Param, Post, Patch, Delete, Query,
    ParseIntPipe, ValidationPipe
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    // Injectando un servicio al controlador
    constructor(private readonly userService: UsersService){}

    /*
    GET /users -> index
    GET /users/:id -> show
    POST /users -> create
    PATCH /users/:id -> update
    DELETE /users/:id -> delete
    */

    @Get() // GET /users -> index
    findAll(){
        return this.userService.findAll()
    }

    @Get('query') // GET /users/query?role=ad
    query(@Query('role') role?: 'ad' | 'us'){
        return this.userService.findAll(role)
    }

    @Get(':id') // GET /users/:id -> show
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id)
    }

    @Post() // POST /users -> create
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Patch(':id') // PATCH /users/:id -> update
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id') // Delete /users/:id -> delete
    delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id)
    }
}
