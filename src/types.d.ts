export interface UsuarioDef{
    nombre: string;
    apellido: string;
    celular: string;
    email: string;
    password: string;
    google: boolean;
    rol: number
}

export interface VerifyAccountDef{
    id: number;
    verified: boolean;
}