const toEntity = ({
  name,
  account,
  agency,
  documentID,
  accountType,
  status,
  bank,
}) => {
  return {
    name: name || "--",
    accountType,
    account: account && account.number ? account.number : "X",
    accountDigit: account && account.digit ? account.digit : "X",
    agency: agency && agency.number ? agency.number : "X",
    agencyDigit: agency && agency.digit ? agency.digit : "X",
    documentID: documentID || "--",
    bank,
    status,
    checked: false,
  };
};

const toApi = ({
  name,
  accountType,
  account,
  accountDigit,
  agency,
  agencyDigit,
  documentID,
  bank,
  status,
}) => ({
  name,
  account: {
    number: account,
    digit: accountDigit,
  },
  agency: {
    number: agency,
    digit: agencyDigit,
  },
  accountType,
  documentID,
  bank,
  status,
});

const BeneficiaryMapper = {
  toEntity,
  toApi,
};

export default BeneficiaryMapper;
