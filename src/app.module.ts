import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { ItemOrdersModule } from './item-orders/item-orders.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [AuthModule, PrismaModule, ItemsModule, OrdersModule, ItemOrdersModule, GptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
