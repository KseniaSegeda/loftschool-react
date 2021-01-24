import {serverGetRoute, serverGetAddress} from "../../api/address";
import {recordSaga} from "../../recordSaga";
import {getRouteSaga, getAddressSaga} from "./saga";
import {
    pendingGetListAddress,
    pendingGetRouter,
    successGetRouter,
    successGetListAddress
} from "./actions";


jest.mock("../../api/address", () => ({
    serverGetRoute: jest.fn(),
    serverGetAddress: jest.fn()
}));

describe('address saga', ()=> {
    it("get router in through api", async () => {
        const FAKE_ROUTE = [[1,2],[3,4]];
        serverGetRoute.mockImplementation(async () => (FAKE_ROUTE));
        global.localStorage.getItem.mockReturnValueOnce('{"isLoggedIn":true,"token":"recxy0WizXJohJ0RW"}')
        const dispatched = await recordSaga(
            getRouteSaga,
            pendingGetRouter('fake1', 'fake2'),
        );
        expect(dispatched).toEqual([
            successGetRouter(FAKE_ROUTE)
        ]);
    })

    it("get list address in through api", async () => {
        const FAKE_ADDRESS = ['address1', 'address2'];
        serverGetAddress.mockImplementation(async () => ({addresses: FAKE_ADDRESS}));
        const dispatched = await recordSaga(
            getAddressSaga,
            pendingGetListAddress,
        );
        expect(dispatched).toEqual([
            successGetListAddress({addresses: FAKE_ADDRESS})
        ]);
    })
});
