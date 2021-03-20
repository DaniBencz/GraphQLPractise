'use strict';

const friendDatabase = {}; // an in-memory mock-db
class Friend {
    constructor(id, { firstName, lastName, age, isFriend, gender }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.isFriend = isFriend;
        this.gender = gender;
    }
}

// resolver map, to be used in schema
export const resolvers = {
    Query: {
        getFriend: (_, { id }) => {
            // return friendDatabase[id]
            return new Friend(id, friendDatabase[id]);
        },
    },
    Mutation: {
        createFriend: async (_, { input }) => { // _, !!!
            const { default: crypto } = await import('crypto');
            let id = crypto.randomBytes(10).toString('hex');
            friendDatabase[id] = input;
            return new Friend(id, input);
        },
    },
};
