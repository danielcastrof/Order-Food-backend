import { PartialType } from '@nestjs/mapped-types';
import { CreateEnterpriseDto } from './create-employee.dto';

export class UpdateEnterpriseDto extends PartialType(CreateEnterpriseDto) {}