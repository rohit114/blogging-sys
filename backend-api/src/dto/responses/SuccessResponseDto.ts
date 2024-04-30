export class SuccessResponseDto {
    success: boolean = true;
    message: string;
    data: Object;

    constructor(data: Object, message?:string) {
        this.message = message ?? 'success';
        this.data = data;
    }
}
