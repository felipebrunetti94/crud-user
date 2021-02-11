// @ts-check

import searchBeneficiary from "../searchBeneficiary";
import { NoBeneficiaryFoundError } from "../../domain/beneficiary/Beneficiary";

const beneficiaryMock = {
  documentID: "02193523912",
  name: "admin",
  agency: "08140",
  account: "010027139",
};

const notFoundBenefiary = {
  documentID: "010101010101",
  name: "not found",
  agency: "00000",
  account: "010010101",
};

describe("Search Beneficiary", () => {
  const callbacks = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  describe("When given cpf", () => {
    it("calls onSucess callback with filtered result", () => {
      const beneficiaries = [beneficiaryMock, notFoundBenefiary];
      const searchValue = "02193523912";
      searchBeneficiary(searchValue, beneficiaries, callbacks);
      expect(callbacks.onSuccess).toHaveBeenCalledWith([beneficiaryMock]);
    });
  });

  describe("When given partial cpf", () => {
    it("calls onSucess callback with filtered result", () => {
      const beneficiaries = [beneficiaryMock, notFoundBenefiary];
      const searchValue = "0219352";
      searchBeneficiary(searchValue, beneficiaries, callbacks);
      expect(callbacks.onSuccess).toHaveBeenCalledWith([beneficiaryMock]);
    });
  });

  describe("When given invalid value", () => {
    it("calls onError with an error", () => {
      const beneficiaries = [beneficiaryMock];
      const searchValue = "impossible to find value";
      searchBeneficiary(searchValue, beneficiaries, callbacks);
      expect(callbacks.onError).toHaveBeenCalledWith(
        new NoBeneficiaryFoundError(searchValue)
      );
    });
  });
});
