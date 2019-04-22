export const enterHandler = (fun: (event: any) => void) => event => {
    if(event.key === "Enter") {
        event.preventDefault()
        fun(event)
    }
}
