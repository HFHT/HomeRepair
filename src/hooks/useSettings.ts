import { useEffect, useMemo, useState } from "react"
import { getMongoItem } from "../services"
import { CONST_DB, CONST_VISITS } from "../constants"

export function useSettings() {
    const [webUsage, setWebUsage] = useState<any | undefined>(undefined)
    const webhits = async () => {
        setWebUsage(await getMongoItem({ db: CONST_DB, collection: CONST_VISITS }))
    }

    useEffect(() => {
        webhits()
    }, [])

    const webcsv = useMemo(() => {
        let csv = [['Address', 'Trys']]
        if (webUsage) {
            const rows = webUsage.map((um: any) => [um._id, um.visits.length])
            csv = [...csv, ...rows]
        }
        return csv

    }, [webUsage])


    return { webUsage, webcsv }
}
