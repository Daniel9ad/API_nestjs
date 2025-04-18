import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {
            'id':1,
            'name':'daniel',
            'email':'daniel@usfx.bo',
            'role':'ad'
        },
        {
            'id':2,
            'name':'daniel2',
            'email':'daniel@usfx.bo',
            'role':'us'
        },
        {
            'id':3,
            'name':'daniel3',
            'email':'daniel@usfx.bo',
            'role':'us'
        },
        {
            'id':4,
            'name':'daniel4',
            'email':'daniel@usfx.bo',
            'role':'us'
        }
    ]

    findAll(role?: 'ad' | 'us'){
        if (role){
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Fund')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.filter(user => user.id === id)
        if (user.length === 0) throw new NotFoundException('User Not Fund')
        return user
    }

    create(createUserDto: CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id){
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
