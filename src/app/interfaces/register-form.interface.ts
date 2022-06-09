/* Interface creada para definir la forma del Objeto Usuario del Registro*/

export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
}