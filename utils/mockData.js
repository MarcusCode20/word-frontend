export function fakeUserScores(number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        users.push({
            user: 'User' + i,
            score: 100 - i
        });
    }
    return users;
}
