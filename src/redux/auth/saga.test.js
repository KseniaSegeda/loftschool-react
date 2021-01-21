import { authenticateSaga } from "./saga";
import { authenticate, logIn } from "./actions";
import { recordSaga } from "../../recordSaga";

jest.mock("../../api/auth", () => ({
    serverLogIn: jest.fn(() => ({success: true}))
}));

it("authenticates through api", async () => {
    const dispatched = await recordSaga(
        authenticateSaga,
        authenticate({email: "testlogin", password:"testpassword"})
    );

    expect(dispatched).toEqual([logIn()]);
})
