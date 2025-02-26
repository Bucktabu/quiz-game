import { SortByField } from '../../../src/common/pagination/query-parameters/sort-by-field';
import { SortDirection } from '../../../src/common/pagination/query-parameters/sort-direction';
import { PublishedStatus } from '../../../src/modules/sa/questions/api/dto/query/published-status';
import { BanStatus } from '../../../src/modules/sa/users/api/dto/query/ban-status';

export type TestsPaginationType = Partial<{
  searchLoginTerm: string;
  searchEmailTerm: string;
  bodySearchTerm: string;
  sortBy: SortByField;
  sortDirection: SortDirection;
  publishedStatus: PublishedStatus;
  banStatus: BanStatus;
  pageNumber: number;
  pageSize: number;
}>;
