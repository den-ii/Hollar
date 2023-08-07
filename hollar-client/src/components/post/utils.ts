export function dp(fullName) {
    console.log(fullName)
    const names = fullName?.split(' ')
    console.log(names)
    return names[0]?.charAt(0)?.toUpperCase() + names[1]?.charAt(0)?.toUpperCase()
}
