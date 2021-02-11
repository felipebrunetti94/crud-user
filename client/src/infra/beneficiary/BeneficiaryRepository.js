import { IBeneficiary } from "../../domain/beneficiary/Beneficiary";
import BeneficiaryMapper from "./BeneficiaryMapper";
import Api, { ServerResponseError } from "../Api";

/**
 * @description Register new beneficiary
 * @param {IBenefiary} beneficiary
 *
 */
const register = async (beneficiary) => {
  alert("registrando");
  try {
    const endpoint = "/api/beneficiary/create";
    const beneficiaryApi = BeneficiaryMapper.toApi(beneficiary);
    const { status, data } = Api.post(endpoint, beneficiaryApi);

    if (status === 201) {
      return data;
    }

    throw new ServerResponseError(endpoint);
  } catch (error) {
    throw error;
  }
};

/**
 * @description Delete one or more beneficiary
 * @param {IBenefiary[]} beneficiaries
 *
 */
const remove = async (beneficiary) => {
  try {
    const endpoint = `/api/beneficiary/delete/${beneficiary.documentID}`;
    const { data, status } = await Api.delete(endpoint);

    if (status === 201) {
      return data;
    }

    throw new ServerResponseError(endpoint);
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    const endpoint = "/api/beneficiary/";
    const { data, status } = await Api.get(endpoint);

    if (status === 201) {
      return data.map(BeneficiaryMapper.toEntity);
    }

    throw new ServerResponseError(endpoint);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const BeneficiaryRepository = { register, remove, findAll };

export default BeneficiaryRepository;
