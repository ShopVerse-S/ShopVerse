
export interface User {
    id: number;               // Assuming 'id' is of type number
    username: string;        // Username of the user
    email: string;           // Email address of the user
    role: string;            // User role (e.g., 'USER', 'ADMIN')
    password?: string;       // Optional, if you need to handle password during registration

}
