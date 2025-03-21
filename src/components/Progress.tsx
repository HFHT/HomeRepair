import { Progress as ManTineProgress } from "@mantine/core";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";

type ProgressType = {
    steps: { label: string, color: string, size: number }[]
}
export function Progress({ steps }: ProgressType) {
    const { state } = useContext(MainContext)
    return (
        <ManTineProgress.Root mr='xs' ml='xs' mt={2} size='xl'>
            {state.progressSteps.map((s: { label: string, color: string, size: number }, idx: number) => (
                <ManTineProgress.Section value={s.size} color={s.color} key={`${s}${idx.toString()}`}>
                    <ManTineProgress.Label>{s.label}</ManTineProgress.Label>
                </ManTineProgress.Section >
            ))}
        </ManTineProgress.Root >
    )
}
