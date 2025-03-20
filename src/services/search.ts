import { fetchJson } from "."

export type searchMongoType = {
    db: string
    collection: string
    searchTerm: string,
    index: string,
    fuzzy?: boolean
}

export async function search({ db, collection, searchTerm, index, fuzzy = false }: searchMongoType) {
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ db: db, collection: collection, index: index, searchTerm: searchTerm, fuzzy: fuzzy })
    return await fetchJson(`${import.meta.env.VITE_HOMEREPAIR_API}search`, header)
}
