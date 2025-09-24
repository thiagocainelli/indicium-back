import { UsersService } from '../users/users.service';
import { SragService } from '../srag/srag.service';

export async function initModules() {
  await UsersService.initSuperAdmin();
  await SragService.initIngestionIfEmpty();
}
