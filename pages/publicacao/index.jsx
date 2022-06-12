import React, { useState, useEffect } from 'react';

import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import UploadImagem from '../../componentes/uploadImagem';
import Botao from '../../componentes/botao';
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg';
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg';

function Publicacao() {
  const [imagem, setImagem] = useState(null);
  const [inputImagem, setInputImagem] = useState(null);
  const [etapaAtual, setEtapaAtual] = useState(1);

  const estaNaEtapaUm = () => etapaAtual === 1;

  const aoClicarAcaoEsquerda = () => {
    if (estaNaEtapaUm()) {
      inputImagem.value = null;
      setImagem(null);
      return;
    }

    setEtapaAtual(1);
  };

  const aoClicarAcaoDireita = () => {
    console.log('oi');
    setEtapaAtual(2);
  };

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda.src}
        aoClicarElementoEsquerda={aoClicarAcaoEsquerda}
        aoClicarElementoDireita={aoClicarAcaoDireita}
        textoEsquerda={estaNaEtapaUm() && imagem ? 'Cancelar' : ''}
        elementoDireita={
          !imagem
            ? ''
            : imagem && estaNaEtapaUm()
            ? 'Avançar'
            : imagem && !estaNaEtapaUm()
            ? 'Compartilhar'
            : ''
        }
        titulo="Nova publicação"
      />

      <hr className="linhaDivisoria" />
      <div className="conteudoPaginaPublicacao">
        {estaNaEtapaUm() ? (
          <div className="primeiraEtapa">
            <UploadImagem
              setImagem={setImagem}
              aoSetarAReferencia={setInputImagem}
              imagemPreviewClassName={
                !imagem ? 'previewImagemPublicao' : 'previewImagemSelecionada'
              }
              imagemPreview={imagem?.preview || imagemPublicacao.src}
            />

            <span className="desktop textoDragAndDrop">
              Arraste sua foto aqui
            </span>

            <Botao
              texto="Selecionar imagem"
              manipularClique={() => inputImagem?.click()}
            />
          </div>
        ) : (
          <div className="segundaEtapa">etapa dois</div>
        )}
      </div>
    </div>
  );
}

export default comAutorizacao(Publicacao);
