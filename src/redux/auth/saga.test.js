import { authenticateSaga, registrationSaga } from "./saga";
import { authenticate, logIn, registration } from "./actions";
import { recordSaga } from "../../recordSaga";
import { serverLogIn } from '../../api/auth';
import { serverLogUp } from '../../api/regstraton';

jest.mock("../../api/auth", () => ({
    serverLogIn: jest.fn(() => ({success: true}))
}));

jest.mock("../../api/regstraton", () => ({
    serverLogUp: jest.fn(() => ({success: true}))
}));

describe('auth.saga', ()=>{
    it("login through api", async () => {
        serverLogIn.mockImplementation(async () => ({success: true}));
        const dispatched = await recordSaga(
            authenticateSaga,
            authenticate({email: "testlogin", password:"testpassword"})
        );

        expect(dispatched).toEqual([
            logIn({success: true})
        ]);
    })
    it("registration through api", async () => {
        serverLogUp.mockImplementation(async () => ({success: true}));
        const dispatched = await recordSaga(
            registrationSaga,
            registration({email: "testlogin"})
        );

        expect(dispatched).toEqual([
            logIn({success: true})
        ]);
    })
})

