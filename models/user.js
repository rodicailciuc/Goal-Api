import { v4 as Id } from 'uuid';

const users = [
    {
        id: Id(),
        email: 'rodica@gmail.com',
        password: '$2b$10$TCH/1Uv/jSwtyG9KWPzFzeJMGvK.WuOe0wtmhTBkfcHL7ytHC9QzS'
    }
];

class User {
    static getUserByEmail(email) {
        return users.find((user) => user.email === email);
    }

    static add(user) {
        const newUser = { id: Id(), ...user };
        users.push(newUser);
        return newUser;
    }
}

export default User;
