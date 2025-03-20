import { useContext, useEffect, useState } from "react";
import { GoogleAddressType, WebVisitsType } from "../types";
import { getMongoItem } from "../services";
import { TableData } from "@mantine/core";
import { CONST_DB } from "../utils";
import { CONST_VISITS } from "../constants";
import { MainContext } from "../context/MainContext";

export function useWebVisits() {
    const { destination } = useContext(MainContext)
    const [address, setTheAddress] = useState<GoogleAddressType | undefined>()
    const [webVisits, setWebVisits] = useState<WebVisitsType[] | undefined>(undefined)

    const setAddress = async (addr: GoogleAddressType | undefined) => {
        setTheAddress(addr)
        if (!addr) { console.warn('search-with-invalid-address', addr); return }
        if (!addr.place) {
            setWebVisits(undefined)
            setTheAddress(undefined)
            return
        }
        setWebVisits(await getMongoItem({ db: CONST_DB, collection: CONST_VISITS, query: { _id: addr.formatted } }))
    }

    //Clear the Web Visits when the user clicks to another page
    useEffect(() => {
        if (destination !== 'WebHits' && webVisits !== undefined) {
            console.log('clearing web-hits')
            setWebVisits(undefined)
            setTheAddress(undefined)
        }
    }, [destination])

    const theCaption = () => {
        if (!webVisits) return 'No Data'
        if (!webVisits[0]) return 'Not Found'
        return 'Sorted oldest to newest'
    }

    const tableData: TableData = {
        caption: theCaption(),
        head: ['Program', 'Eligibility', 'Answers'],
        body: !webVisits || !webVisits[0] ? [] :
            webVisits[0].visits.map((vm) => [
                vm.program,
                vm.eligiblePrograms.join(', ') || vm.notEligibleReason.map((em) => em.title).join(', '),
                Object.entries(vm.answers).map(([key, value]) => `${key}: ${value}`).join(', ')
            ])
    }

    return { address, destination, setAddress, tableData, webVisits } as const
}
