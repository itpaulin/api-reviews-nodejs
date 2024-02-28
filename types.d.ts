// types.d.ts

import { User } from '@prisma/client'; // Importe o tipo do seu modelo de usuário
import { Request } from 'express';
/**
 * Interface extendida de Request que inclui uma propriedade user para representar o usuário autenticado.
 */
export interface AuthenticatedRequest extends Request {
  user?: User;
}
