import { useEffect, useMemo, useState } from "react"
import { getMongoItem } from "../services"
import { CONST_DB, CONST_VISITS } from "../constants"
import { WebVisitsType } from "../types"

export function useSettings() {
    const [webVisits, setWebVisits] = useState<WebVisitsType[] | undefined>(undefined)
    const webhits = async () => {
        setWebVisits(await getMongoItem({ db: CONST_DB, collection: CONST_VISITS }))
    }

    useEffect(() => {
        webhits()
    }, [])

    const webcsv = useMemo(() => {
        let csv = [['Address', 'Try', 'Program', 'Eligibility', 'Answers']]
        if (webVisits) {
            let rows: any = []
            webVisits.forEach((vs) => {
                const row = vs.visits.map((vm, idx) => [
                    vs._id,
                    idx + 1,
                    vm.program,
                    vm.eligiblePrograms.join(', ') || vm.notEligibleReason.map((em) => em.title).join(', '),
                    Object.entries(vm.answers).map(([key, value]) => `${key}: ${value}`).join(', ')
                ])
                rows = [...rows, ...row]
            })
            csv = [...csv, ...rows]
        }
        return csv

    }, [webVisits])


    return { webVisits, webcsv }
}
