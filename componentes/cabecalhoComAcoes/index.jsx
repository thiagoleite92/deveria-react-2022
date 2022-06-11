import Image from 'next/image';

export default function CabecalhoComAcoes({
  className,
  iconeEsquerda,
  textoEsquerda = null,
  aoClicarAcaoEsquerda,
  titulo,
  elementoDireita,
}) {
  return (
    <div className={`cabecalhoComAcoes ${className}`}>
      {iconeEsquerda ? (
        <Image
          src={iconeEsquerda}
          alt="seta para esquerda"
          onClick={aoClicarAcaoEsquerda}
          width={25}
          height={25}
        />
      ) : (
        textoEsquerda !== null && (
          <span
            onClick={aoClicarAcaoEsquerda}
            className="cabecalhoComAcoesTextoEsquerda"
          >
            {textoEsquerda}
          </span>
        )
      )}
      <h3>{titulo}</h3>

      {elementoDireita && (
        <button className="btnAcaoDireita" type="button">
          {elementoDireita}
        </button>
      )}
    </div>
  );
}
