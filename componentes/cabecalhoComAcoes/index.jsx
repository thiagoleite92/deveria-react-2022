import Image from 'next/image';

export default function CabecalhoComAcoes({
  className,
  iconeEsquerda,
  textoEsquerda = null,
  aoClicarElementoEsquerda,
  titulo,
  elementoDireita,
  aoClicarElementoDireita,
}) {
  return (
    <div className={`cabecalhoComAcoes ${className}`}>
      {iconeEsquerda ? (
        <Image
          src={iconeEsquerda}
          alt="seta para esquerda"
          onClick={aoClicarElementoEsquerda}
          width={25}
          height={25}
        />
      ) : (
        textoEsquerda !== null && (
          <span
            onClick={aoClicarElementoEsquerda}
            className="cabecalhoComAcoesTextoEsquerda"
          >
            {textoEsquerda}
          </span>
        )
      )}
      <h3>{titulo}</h3>

      {elementoDireita && (
        <button
          onClick={aoClicarElementoDireita}
          className="btnAcaoDireita"
          type="button"
        >
          {elementoDireita}
        </button>
      )}
    </div>
  );
}
