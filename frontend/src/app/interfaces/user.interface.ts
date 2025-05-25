export interface User {
    _id: string;
    email: string;
    role: string;
    managedSalons?: string[];
}

export interface AuthResponse {
    success: boolean;
    data: {
        token: string;
        user: User;
    };
}
