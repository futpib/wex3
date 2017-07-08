import { generateSign } from "./util";
it("generateSign", () => {
    const data = "datatestvalue1g5g6m56";
    const key = "e5h67854uotcf46n854h67";
    // tslint:disable-next-line:max-line-length
    expect(generateSign(data, key)).toBe("99b343ce6d3c0fa89ab7d94f5f97bedb92b46ea9dfd2a9b2b05e86b5f23a6b0963e5d7ae493d1978d5100c2b86a18730feaceb8ac653b9fc6980700185acb36d");
});
