import { useRef, useEffect } from 'react';

export function UploadImagem({
  className = '',
  setImagem,
  imagemPreview,
  imagemPreviewClassName = '',
  aoSetarAReferencia,
}) {
  const referenciaInput = useRef(null);

  useEffect(() => {
    if (!aoSetarAReferencia) {
      return;
    }

    aoSetarAReferencia(referenciaInput?.current);
  }, [referenciaInput?.current]);

  const abrirSeletorDeArquivos = () => {
    referenciaInput?.current?.click();
  };

  const aoAlterarImagem = () => {
    if (!referenciaInput?.current?.files?.length) {
      return;
    }

    const arquivo = referenciaInput?.current?.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImagem({
        arquivo,
        preview: fileReader.result,
      });
    };
  };

  return (
    <div
      className={`uploadImagemContainer ${className} `}
      onClick={abrirSeletorDeArquivos}
    >
      {imagemPreview && (
        <div className="imagemPreviewContainer">
          <img
            src={imagemPreview}
            alt="imagem preview"
            className={imagemPreviewClassName}
          ></img>
        </div>
      )}
      <input
        type="file"
        className="oculto"
        accept="image/*"
        ref={referenciaInput}
        onChange={aoAlterarImagem}
      />
    </div>
  );
}
