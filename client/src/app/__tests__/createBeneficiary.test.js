import createBeneficiary from "../createBeneficiary";

describe("Create Beneficiary", () => {
  const callbacks = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };
  describe("when beneficiary bank is BANCO DO BRASIL", () => {
    describe("when given valid beneficiary", () => {
      const validBeneficiary = {};
      it("calls onSuccess with new beneficiary", () => {
        createBeneficiary(validBeneficiary, callbacks);
        expect(callbacks.onSuccess).toHaveBeenCalledWith();
      });
    });

    describe("when give invalid beneficiary", () => {
      const invalidBeneficiary = {};
      it("calls onError with object containing invalid fields", () => {
        createBeneficiary(invalidBeneficiary, callbacks);
        expect(callbacks.onError).toHaveBeenCalledWith();
      });
    });
  });

  describe("when beneficiary bank is not from BANCO DO BRASIL", () => {
    describe("when given valid beneficiary", () => {
      const validBeneficiary = {};
      it("calls onSuccess with new beneficiary", () => {
        createBeneficiary(validBeneficiary, callbacks);
        expect(callbacks.onSuccess).toHaveBeenCalledWith();
      });
    });

    describe("when give invalid beneficiary", () => {
      const invalidBeneficiary = {};
      it("calls onError with object containing invalid fields", () => {
        createBeneficiary(invalidBeneficiary, callbacks);
        expect(callbacks.onError).toHaveBeenCalledWith();
      });
    });
  });
});
