
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class CreateCacheRequest {
    @IsNotEmpty()
    @IsAlphanumeric()
    key: string;

    @IsNotEmpty()
    value: object;
}
