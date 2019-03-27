export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer Q>
    ? ReadonlyArray<DeepPartial<Q>>
    : DeepPartial<T[P]>
}
