/**
 * Export all controllers here
 */

import { register, login } from './authentication.controllers';
import { getUsers, getUser } from './user.controllers';

// list controllers
export default { register, login, getUsers, getUser };