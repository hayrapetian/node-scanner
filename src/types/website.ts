export type WebsitesArr = Website[]

interface Website {
    _website: string[]
}

export type Output = OutputObject[]

interface OutputObject {
    _website: string[]
    _link: (string | undefined)[]
    _statusCode: number[]
}