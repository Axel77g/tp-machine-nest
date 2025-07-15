import { SetMetadata } from '@nestjs/common';

export const IS_PRIVATE = 'isPrivate';
export const Private = () => SetMetadata(IS_PRIVATE, true);
