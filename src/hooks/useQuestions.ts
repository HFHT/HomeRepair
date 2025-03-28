import { useContext, useEffect, useState } from "react"
import { getMongoItem } from "../services"
import { CONST_DB, CONST_DB_QUESTIONS } from "../utils"
import { useErrorBoundary } from "react-error-boundary"
import { MainContext } from "../context/MainContext"

export type QuestionsType = {
    pass?: string | undefined,
    key: string,
    altPgm?: string | undefined,
    q: { en: string, es: string },
    d: { en: string, es: string },
    r: { en: string, es: string }
}
export type PhrasesType = {
    en: PhraseType,
    es: PhrasesType
}
export type PhraseType = {
    title: string
}
export type IncomeType = {
    IncomeDesc: { en: string, es: string },
    Values: IncomeValueType[]
}
export type IncomeValueType = {
    size: string,
    maxIncome: string
}

export type RepairsType = {
    Documents: DocumentsType[],
    RepairDesc: { en: string, es: string },
    Programs: RepairType[],
    Values: RepairType[]
}
export type DocumentsType = {
    title: string,
    inc: string[],
    exc: string[]
}
export type RepairType = {
    [key: string]: any
}

export function useQuestions() {
    const [questions, setQuestions] = useState<QuestionsType[] | undefined>()
    const [phrases, setPhrases] = useState<PhrasesType | undefined>()
    const [income, setIncome] = useState<IncomeType | undefined>()
    const [otherResouceURL, setOtherResouceURL] = useState<string | undefined>(undefined)

    const [repairList, setRepairList] = useState<RepairsType | undefined>()
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()
    const { language } = useContext(MainContext);

    useEffect(() => {
        console.log(language)
    }, [])

    async function fetchMongo(_id?: string | null | undefined) {
        try {
            setIsBusy(true)
            const response = (await getMongoItem({ db: CONST_DB, collection: CONST_DB_QUESTIONS, query: {} }))[0]
            setQuestions(response.Questions)
            setPhrases(response.PhrasesN)
            setIncome(response.Income)
            setRepairList(response.RepairList)
            setOtherResouceURL(response.OtherResourceURL)
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    return [questions, phrases, income, repairList, otherResouceURL, fetchMongo, isBusy] as const

}
