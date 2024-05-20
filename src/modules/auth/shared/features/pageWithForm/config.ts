import { FormOptions, FormInputs } from '@shared';

type InputUnion = FormInputs;

interface InputElements {
  [name: string]: InputUnion;
}

type UnionInputOptions = FormOptions['inputsOptions'];

interface FormPageOptions extends FormOptions {
  subGroups?: {
    id: string;
    inputOptions: NonNullable<UnionInputOptions>;
    legend: string;
  }[];
}

interface AddLinkOptions {
  textBeforeLink: string;
  textAfterLink: string;
  linkText: string;
}

export { InputUnion, InputElements, UnionInputOptions, FormPageOptions, AddLinkOptions };
