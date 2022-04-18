type Ipayment = {
  id: number;
  data: Date;
  valor: number;
  tipo: "debito" | "credito";
};

type Ilocaldata = {
  valor: number;
  data: Date;
};

type Irequest = {
  id: number;
  valor: number;
  tipo: "debito" | "credito";
};
