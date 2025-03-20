import { Address, Downloads, Eligibility, HomeInfo, Income, Inquiries, MilitarySenior, New, NotEligible, RepairForm, Repairs, Settings, Start, ThankYou, WebHits } from ".";
import { Home } from "./Home";

export function Main() {
    return (
        <>
            <Home />
            <Inquiries />
            <New />
            <Settings />
            <WebHits />

            <Address />
            <HomeInfo />
            <Income />
            <MilitarySenior />
            <Repairs />
            <Eligibility />
            <RepairForm />
            <Downloads />
            <NotEligible />
            <ThankYou />
        </>
    )
}
