export type formDetails = {
  id: string;
  placeholder: string;
  tpye: string;
  cssType: string;
};

export type CardDetails = {
  title: string;
  subTitle: string;
  form1: formDetails;
  form2: formDetails;
  btnText: string;
  btnCss: string;
  userUpdated?: (userDetails: object) => void;
};
