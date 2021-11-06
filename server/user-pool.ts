import { generateUsername as usernameGenerator } from 'unique-username-generator';
import { generate as passwordGenerator } from 'generate-password';
import colorGenerator from '../utils/color_generator';
import User from '~/types/user';

const users: User[] = [];

export const newUser = () => {
    const username = usernameGenerator('_');
    const password = passwordGenerator({
        length: 32,
        uppercase: true,
        numbers: true,
        lowercase: true,
        symbols: true,
    });
    const color = colorGenerator(username);

    const user: User = {
        username,
        password,
        color,
        tokens: [],
    };

    users.push(user);

    return user;
};

export const getUser = (data: {
    username?: string;
    password?: string;
    token?: string;
}) => {
    const user = users.find(
        (u) =>
            (u.username == data.username?.trim() &&
                u.password == data.password?.trim()) ||
            u.tokens.some((token: string) => token == data.token?.trim())
    );
    return user ?? null;
};
