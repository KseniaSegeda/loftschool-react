import {pendingSetCard, successSetCard, errorCard} from "./actions";
import {serverSetCard} from "../../api/card";

export const payMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case pendingSetCard.toString():
            const responseSetCard = await serverSetCard({...action.payload, token: store.auth.token});

            if (responseSetCard.success) {
                store.dispatch(successSetCard(action.payload))
            } else {
                console.log(responseSetCard)
                store.dispatch(errorCard(responseSetCard.error))
            }
            break;
        default:
            next(action);
            break;
    }
}
