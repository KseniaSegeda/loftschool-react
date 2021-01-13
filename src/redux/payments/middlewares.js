import {pendingSetCard, successSetCard, errorCard} from "./actions";
import {serverSetCard} from "../../api/card";

export const payMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case pendingSetCard.toString():
            const token = JSON.parse(window.localStorage.getItem('state')).token;
            const responseSetCard = await serverSetCard({...action.payload, token});

            if (responseSetCard.success) {
                store.dispatch(successSetCard(action.payload))
            } else {
                store.dispatch(errorCard(responseSetCard.error))
            }
            break;
        default:
            next(action);
    }
}
