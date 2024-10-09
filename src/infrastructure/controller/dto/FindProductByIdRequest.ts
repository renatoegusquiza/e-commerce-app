import { IsNotEmpty, IsNumber } from "class-validator";

export class FindProductByIdRequest{
    @IsNotEmpty()
    //@IsNumber()
    id: number;
}