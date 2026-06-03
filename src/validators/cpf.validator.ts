import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    if (!value) {
                        return true;
                    }

                    const cpf = value.replace(/[^\d]/g, '');

                    if (cpf.length !== 11) {
                        return false;
                    }

                    if (/^(\d)\1+$/.test(cpf)) {
                        return false;
                    }

                    let sum = 0;

                    for (let i = 0; i < 9; i++) {
                        sum += parseInt(cpf[i]) * (10 - i);
                    }

                    let remainder = (sum * 10) % 11;

                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }

                    if (remainder !== parseInt(cpf[9])) {
                        return false;
                    }

                    sum = 0;

                    for (let i = 0; i < 10; i++) {
                        sum += parseInt(cpf[i]) * (11 - i);
                    }

                    remainder = (sum * 10) % 11;

                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }
                    
                    if (remainder !== parseInt(cpf[10])) {
                        return false;
                    }

                    return true;
                },
                defaultMessage() {
                    return 'CPF inválido!';
                },
            },
        });
    };
}