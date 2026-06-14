class ApiResponse<T> {

    success: boolean;
    statusCode: number;
    message: string;
    data?: T | null;

    constructor(statusCode: number, message: string, data?: T, success?: boolean) {
        this.success = success ?? (statusCode >= 200 && statusCode < 300);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

}


export default ApiResponse;
