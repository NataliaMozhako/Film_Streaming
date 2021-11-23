import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionsController } from './descriptions.controller';
import { DescriptionsService } from './descriptions.service';
import { Description, DescriptionSchema } from './schema/description.schema';

@Module({
  providers: [DescriptionsService],
  controllers: [DescriptionsController], 
  imports: [MongooseModule.forFeature([
      {name: Description.name, schema: DescriptionSchema}
    ])]
})
export class DescriptionsModule {}
