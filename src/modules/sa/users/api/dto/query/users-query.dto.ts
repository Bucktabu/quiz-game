import { QueryDto } from '../../../../../../common/pagination/query-parameters/query.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BanStatus } from './ban-status';

export class UsersQueryDto extends QueryDto {
  @IsEnum(BanStatus)
  @IsOptional()
  banStatus: BanStatus = BanStatus.All;

  @IsString()
  @IsOptional()
  searchLoginTerm: string | null;

  @IsString()
  @IsOptional()
  searchEmailTerm: string | null;
}
