export default {
    Mutation: {
        updateNow: (a, b, {cache: clientCache}) => {
            const now = new Date().toISOString()
            clientCache.writeData({data: {now}})
            return now
        }
    }
}
