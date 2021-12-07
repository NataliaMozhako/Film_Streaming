import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { Role } from './schema/role.schema';

@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService){}

    @Get()
    getAll(): Promise<Role[]> {
      return this.rolesService.getAll();
    }
  
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Role> {
      return this.rolesService.getById(id)
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
      return this.rolesService.create(createRoleDto)
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Role> {
      return this.rolesService.remove(id)
    }
  
    @Put(':id')
    update(@Body() updateRoleDto: UpdateRoleDto, @Param('id') id: string): Promise<Role> {
      return this.rolesService.update(id, updateRoleDto)
    }
}
