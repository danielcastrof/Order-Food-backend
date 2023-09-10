import { PartialType } from '@nestjs/swagger';
import { CreateGptDto } from './create-gpt.dto';

export class UpdateGptDto extends PartialType(CreateGptDto) {}
