export function randomMessage(messages: string[]): string {
    const random = Math.floor(Math.random() * messages.length);
    return messages[random];
}