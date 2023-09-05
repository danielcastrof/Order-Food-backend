import { Module } from '@nestjs/common';
import { ItemOrdersService } from './item-orders.service';
import { ItemOrdersController } from './item-orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItemOrdersController],
  providers: [ItemOrdersService]
})
export class ItemOrdersModule {}
