export function getUserIdFromAccessToken() {
    const jwt = localStorage.getItem('access-token')
    if(jwt != null) {
        const splits = jwt.split('.')
        const payload = JSON.parse(atob(splits[1]))
        const userId = payload['userId']
        console.log(userId)
        return userId
    }
    return null
}