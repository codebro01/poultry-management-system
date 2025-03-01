export const tokenUser = (user) => {
    return {
        username: user.username,
        email: user.email,
        role: user.role,
        uid: user.uid
    }
}