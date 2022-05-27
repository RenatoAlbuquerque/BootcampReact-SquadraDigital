import { BairroProvider } from "./bairroContext";
import { MunicipioProvider } from "./municipioContext";
import { PessoaProvider } from "./pessoasContext";
import { UfProvider } from "./ufContext";

const composeProviders =
  (...providers) =>
  (props) =>
    providers.reduceRight(
      (children, Provider) => <Provider {...props}>{children}</Provider>,
      props.children
    );

export const AllProviders = composeProviders(
  BairroProvider,
  UfProvider,
  MunicipioProvider,
  PessoaProvider
);
