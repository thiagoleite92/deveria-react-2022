import React, { useState, useEffect } from 'react';

import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import UploadImagem from '../../componentes/uploadImagem';
import Botao from '../../componentes/botao';
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg';
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import FeedService from '../../services/FeedService';
import { useRouter } from 'next/router';

const limiteDescricao = 35;
const descricaoMinima = 3;

const feedService = new FeedService();

function Publicacao() {
  const [imagem, setImagem] = useState(null);
  const [inputImagem, setInputImagem] = useState(null);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [descricao, setDescricao] = useState('');
  const router = useRouter();

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
    if (estaNaEtapaUm()) {
      setEtapaAtual(2);
      return;
    }

    publicar();
  };

  const escreverDescricao = ({ target: { value } }) => {
    const valorAtual = value;

    if (value.length >= limiteDescricao) {
      return;
    }

    setDescricao(valorAtual);
  };

  const obterClassNameCabecalho = () =>
    estaNaEtapaUm() ? 'primeiraEtapa' : 'segundaEtapa';

  const publicar = async () => {
    try {
      if (!validarFormulario()) {
        alert('A descrição precisa ter pelo menos 3 caracteres.');
        return;
      }
      console.log('publicou, confia');

      const corpoPublicacao = new FormData();
      corpoPublicacao.append('descricao', descricao);
      corpoPublicacao.append('file', imagem.arquivo);

      await feedService.fazerPublicacao(corpoPublicacao);

      router.push('/');
    } catch (error) {
      alert('Erro ao salvar publicacao');
    }
  };

  const validarFormulario = () => {
    return descricao.length >= descricaoMinima && imagem?.arquivo;
  };

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <CabecalhoComAcoes
        className={obterClassNameCabecalho()}
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
              {!imagem ? 'Arraste sua imagem aqui' : null}
            </span>

            <Botao
              texto="Selecionar imagem"
              manipularClique={() => inputImagem?.click()}
            />
          </div>
        ) : (
          <>
            <div className="segundaEtapa">
              <UploadImagem
                setImagem={setImagem}
                imagemPreview={imagem?.preview}
              />

              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => escreverDescricao(e)}
                placeholder={'Escreva uma legenda...'}
              />
            </div>
            <hr className="linhaDivisoria" />
          </>
        )}
      </div>
    </div>
  );
}

export default comAutorizacao(Publicacao);
