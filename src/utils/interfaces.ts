namespace I {
    export interface Data {
        ext: string
        code: string
    }

    export interface File extends Data {
        name: string
    }
}
