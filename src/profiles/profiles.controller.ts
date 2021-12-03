import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { Profile } from './schema/profile.schema';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService){}

    @Get()
  getAll(): Promise<Profile[]> {
    return this.profilesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.getById(id)
  }

  // @Post()
  // create(@Body() createUserDto: CreateProfileDto): Promise<Profile> {
  //   return this.profilesService.create(createUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<Profile> {
  //   return this.profilesService.remove(id)
  // }

  @Put(':id')
  update(@Body() updateProfileDto: UpdateProfileDto, @Param('id') id: string): Promise<Profile> {
    return this.profilesService.update(id, updateProfileDto)
  }
}
