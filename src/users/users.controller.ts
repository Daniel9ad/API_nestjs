import { Body, Controller, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
    GET /users -> index
    GET /users/:id -> show
    POST /users -> create
    PATCH /users/:id -> update
    DELETE /users/:id -> delete
    */

    @Get() // GET /users -> index
    findAll(){
        return []
    }

    @Get('query') // GET /users/query?role=ad
    query(@Query('role') role?: 'ad' | 'us'){
        return []
    }

    @Get(':id') // GET /users/:id -> show
    findOne(@Param('id') id: string){
        return {id}
    }

    @Post() // POST /users -> create
    create(@Body() user: []){
        return user
    }

    @Patch(':id') // PATCH /users/:id -> update
    update(@Param('id') id: string, @Body() userUpdate: {}){
        return {id, ...userUpdate}
    }

    @Delete(':id') // Delete /users/:id -> delete
    delete(@Param('id') id: string){
        return {id}
    }
}
