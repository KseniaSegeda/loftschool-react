import {serverGetCard, serverSetCard} from "../../api/card";
import {recordSaga} from "../../recordSaga";
import {pendingGetCard, pendingSetCard, successSetCard} from "./actions";
import { getCardSaga, setCardSaga} from "./saga"
const FAKE_CARD = {
    "cardNumber":"1222 2222 2222 2222",
    "expiryDate":"2022-08-21T05:03:38.730Z",
    "cardName":"USER NAME",
    "cvc":"233"
}

jest.mock("../../api/card", () => ({
    serverSetCard: jest.fn(() => ({success: true})),
    serverGetCard: jest.fn(() => (FAKE_CARD))
}));

describe('payments saga', ()=> {
    it("get card in through api", async () => {
        serverGetCard.mockImplementation(async () => (FAKE_CARD));
        global.localStorage.getItem.mockReturnValueOnce('{"isLoggedIn":true,"token":"recxy0WizXJohJ0RW"}')
        const dispatched = await recordSaga(
            getCardSaga,
            pendingGetCard,
        );
        expect(dispatched).toEqual([
            successSetCard(FAKE_CARD)
        ]);
    })

    it("set card in through api", async () => {
        serverSetCard.mockImplementation(async () => ({success: true}));
        global.localStorage.getItem.mockReturnValueOnce('{"isLoggedIn":true,"token":"recxy0WizXJohJ0RW"}')
        const dispatched = await recordSaga(
            setCardSaga,
            pendingSetCard(FAKE_CARD),
        );
        expect(dispatched).toEqual([
            successSetCard(FAKE_CARD)
        ]);
    })
})
