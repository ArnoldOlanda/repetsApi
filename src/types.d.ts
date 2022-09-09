export interface UsuarioDef{
    nombre: string;
    apellido: string;
    celular: string;
    correo: string;
    password: string;
    google: boolean;
    rol: number
}

export interface VerifyAccountDef{
    id: number;
    verified: boolean;
}