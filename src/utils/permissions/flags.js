export const PermissionFLAGS = {
    VIEW_CHANNEL: Math.pow(2, 1), // 2^1 = 2
    SEND_MESSAGES: Math.pow(2, 2), // 4
    MANAGE_MESSAGES: Math.pow(2, 3), // 8
    ADMINISTRATOR: Math.pow(2, 4), // 16
    DELETE_MESSAGES: Math.pow(2, 5), // 32
    BAN_USERS: Math.pow(2, 6), // 64
};