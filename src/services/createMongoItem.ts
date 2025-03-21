import { fetchJson } from "."

export type saveMongoType = {
    db: string
    collection: string
    data: any,
    noSave?: boolean
}

export async function createMongoItem({ db, collection, data, noSave = true }: saveMongoType) {
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ db: db, collection: collection, data: { ...data } })
    if (noSave) { console.log(header); return null }
    return await fetchJson(import.meta.env.VITE_MONGOCREATE_URL, header)
}
