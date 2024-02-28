// custom.d.ts

import { User } from '@prisma/client'; // Importe o tipo do seu modelo de usuário

declare module 'express' {
  interface Request {
    user?: User; // Adicione a definição da propriedade user
  }
}
