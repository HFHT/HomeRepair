import { useContext, useEffect, useState } from "react"
import { useFingerPrint } from "."
import { useErrorBoundary } from "react-error-boundary"
import { getMongoItem, putMongoItem } from "../services"
import { CONST_DB, CONST_DB_VISITS, CONST_DB_WEBHITS, uniqueKey } from "../utils"
import { MainContext } from "../context/MainContext"
import { WebHitsType, WebVisitsType } from "../types"

type VisitsType = {
    _id: string,
    visits: VisitType[]
}
type VisitType = {
    key: number | string,
    date?: string | undefined,
    answers: {},
    eligiblePrograms: any,
    notEligibleReason: any,
    program: any
}
export function useVisits() {
    const { state } = useContext(MainContext)
    const { fingerPrint } = useFingerPrint()
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()
    const [visit, setVisit] = useState<VisitsType | undefined>(undefined)
    const [visits, setVisits] = useState<WebVisitsType[] | undefined>(undefined)
    const [webHits, setWebHits] = useState<WebHitsType[] | undefined>(undefined)
    const [sessionKey, setSessionKey] = useState<string | number | undefined>(uniqueKey())

    const getVisits = async () => {
        try {
            setIsBusy(true)
            let allVisits: WebVisitsType[] = await getMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS })
            console.log(allVisits)
            setVisits(allVisits)
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    const getVisit = async (_id: string) => {
        // if (!sessionKey) { console.warn('useVisits-no-fingerprint', sessionKey); return }
        try {
            setIsBusy(true)
            let thisVisit: VisitsType[] = await getMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS, query: { _id: _id } })
            console.log(thisVisit)
            // thisVisit = (!thisVisit || thisVisit.length === 0) ? [{ _id: _id, visits: [{ key: sessionKey, answers: { ...state.answers }, eligiblePrograms: state.eligiblePrograms, notEligibleReason: state.notEligibleReason, program: state.program }] }] : thisVisit
            setVisit(thisVisit[0])
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    const putVisit = async (theState: any) => {
        console.log('putVisit')
        if (!theState || !theState.address || !theState.address.formatted || !sessionKey) { console.warn('putVisits-invalid', theState, sessionKey); return }
        let thisVisit = undefined
        let newSession = {
            key: sessionKey,
            answers: theState.answers,
            eligiblePrograms: theState.eligiblePrograms.map((em: any) => em._id),
            notEligibleReason: theState.notEligibleReason,
            program: theState.program
        }
        if (!visit) {
            thisVisit = {
                _id: theState.address.formatted,
                visits: [{ ...newSession }]
            }
        } else {
            thisVisit = { ...visit }
            let thisSessionIdx = thisVisit.visits.findIndex((vf) => vf.key === sessionKey)
            console.log(thisSessionIdx)
            if (thisSessionIdx < 0) {
                thisVisit = {
                    ...thisVisit, visits: [...thisVisit.visits, newSession]
                }
                thisSessionIdx = thisVisit.visits.findIndex((vf) => vf.key === sessionKey)
            }
            // const thisSession = { ...thisVisit.visits[thisSessionIdx] }
            thisVisit.visits[thisSessionIdx] = { ...newSession }
        }
        setVisit(thisVisit)
        putMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS, _id: thisVisit._id, data: { ...thisVisit } })
    }

    const getWebHits = async () => {
        try {
            setIsBusy(true)
            let allWebHits: WebHitsType[] = await getMongoItem({ db: CONST_DB, collection: CONST_DB_WEBHITS })
            console.log(allWebHits)
            setWebHits(allWebHits)
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    // useEffect(() => {
    //     if (!fingerPrint) return
    //     getVisit()
    // }, [fingerPrint])

    return { visit, visits, webHits, fingerPrint, getVisit, getVisits, putVisit, getWebHits, isBusy } as const
}
