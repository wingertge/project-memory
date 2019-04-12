export const randomElement = <T>(arr: T[]) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : undefined
