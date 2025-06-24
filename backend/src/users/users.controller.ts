import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    index(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post('create')    
    async create(@Body() userData: any): Promise<any> {
        // Validate required fields
        if (!userData.login || !userData.password || !userData.role) {
            throw new BadRequestException('Login, password, and role are required');
        }

        // Create user object with required fields
        const user: Partial<User> = {
            login: userData.login,
            password: userData.password,
            role: userData.role,
            name: userData.name || null
        };

        return this.usersService.create(user as User);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() userData: User): Promise<any> {
        userData.id = Number(id);
        return this.usersService.update(userData);
    }
    
    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.usersService.delete(id);
    }

    @Get(':id/get')
    async getOne(@Param('id') id:number): Promise<any> {
        return this.usersService.findOne(id)
    }

    @Get(':login/getByLogin')
    async getByLogin(@Param('login') login:string): Promise<any> {
        return this.usersService.findByLogin(login)
    }

    @Post('auth')
    async auth(@Body() userData: any): Promise<any> {
        return this.usersService.auth(userData)
    }
}
