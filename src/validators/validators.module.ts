import { Global, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { UniqueEmailValidator } from './unique-email.validator';

@Global()
@Module({
  imports: [UserModule],
  exports: [UniqueEmailValidator],
  providers: [UniqueEmailValidator],
})
export class ValidatorsModule {}
