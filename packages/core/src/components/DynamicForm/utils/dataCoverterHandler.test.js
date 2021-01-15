import { dataCoverterHandler } from "./dataCoverterHandler";


describe("Components", () => {
    describe("FactoryComponent", () => {
        describe("utils", () => {
            describe("dataCoverterHandler", () => {

                it("given a data without a dataManipulatorIn, data is not converted", () => {
                    expect(dataCoverterHandler("10")).toEqual("10");
                });

                it("given a data with a dataManipulatorIn, data is converted", () => {
                    expect(dataCoverterHandler("10", {dataManipulatorIn: (data) => { return parseInt(data); }})).toEqual(10);
                });

            });
        });
    });
});