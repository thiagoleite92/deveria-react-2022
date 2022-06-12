import { useRef, useEffect } from 'react';

export default function UploadImagem({
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

  const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImagem({
        arquivo,
        preview: fileReader.result,
      });
    };
  };

  const aoAlterarImagem = async () => {
    if (!referenciaInput?.current?.files?.length) {
      return;
    }

    const arquivo = referenciaInput?.current?.files[0];
    obterUrlDaImagemEAtualizarEstado(arquivo);
  };

  const aoSoltarImagem = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const arquivo = e.dataTransfer.files[0];
      obterUrlDaImagemEAtualizarEstado(arquivo);
    }
  };

  return (
    <div
      className={`uploadImagemContainer ${className} `}
      onClick={abrirSeletorDeArquivos}
      onDragOver={(e) => e.preventDefault()}
      onDrop={aoSoltarImagem}
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
