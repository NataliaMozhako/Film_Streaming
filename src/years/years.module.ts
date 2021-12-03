import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Year, YearSchema } from './schema/year.schema';
import { YearsController } from './years.controller';
import { YearsService } from './years.service';

@Module({
  providers: [YearsService],
  controllers: [YearsController],
  imports: [MongooseModule.forFeature([
    { name: Year.name, schema: YearSchema }
  ])],
  exports: [YearsService]
})
export class YearsModule { }
