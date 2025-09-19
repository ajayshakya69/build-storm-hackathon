import { User } from '@supabase/supabase-js';
import { UserDetailsDto } from '../constants/user.constants';

export class RequestDto extends Request {
  public user: UserDetailsDto;
  public session: User;
}
