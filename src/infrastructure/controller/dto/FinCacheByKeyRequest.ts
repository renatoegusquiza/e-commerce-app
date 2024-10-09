
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsNumber } from 'class-validator';

export class FinCacheByKeyRequest {
    @IsNotEmpty()
    @IsAlphanumeric()
    @ApiProperty({
        description: 'Key del caché',
        example: 'Key123',
    })
    key: string;
}
