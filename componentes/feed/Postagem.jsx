import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import FeedService from '../../services/FeedService';

import imagemCurtir from '../../public/imagens/curtir.svg';
import imagemCurtido from '../../public/imagens/curtido.svg';
import imagemComentarioAtivo from '../../public/imagens/comentarioAtivo.svg';
import imagemComentarioCinza from '../../public/imagens/comentarioCinza.svg';
import Avatar from '../avatar';
import FazerComentario from './FazerComentario';

const feedService = new FeedService();

const tamanhoLimiteDescricao = 93;

const usuarioLogado = { id: '1' };

const usuario = {
  id: '1',
  avatar: '',
  fotoDoPost:
    'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
  descricao:
    'um texto muito grande com mais de 93 caracteres para ser usado na aula da deveria :), falta pouco para alcancar',
  comentarios: [{ nome: 'thiago', mensagem: 'mensagem' }],
  curtidas: ['1', '2', '3', '4', '5', '6'],
};

export default function Postagem() {
  const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
    tamanhoLimiteDescricao
  );

  const [comentariosPostagem, setComentariosPostagem] = useState(
    usuario.comentarios
  );

  const [curtidasPostagem, setCurtidasPostagem] = useState(usuario.curtidas);

  const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] =
    useState(false);

  const exibirDescricaoCompleta = () => {
    setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
  };

  const descricaoMaiorQueLimite = () =>
    usuario.descricao.length > tamanhoAtualDaDescricao;

  const obterDescricao = () => {
    let mensagem = usuario.descricao.substring(0, tamanhoAtualDaDescricao);
    if (descricaoMaiorQueLimite()) {
      mensagem += '...';
    }
    return mensagem;
  };

  const obterImagemComentario = () => {
    return deveExibirSecaoParaComentar
      ? imagemComentarioAtivo
      : imagemComentarioCinza;
  };

  const obterImagemCurtida = () => {
    return usuarioLogadoCurtiu() ? imagemCurtido : imagemCurtir;
  };

  const comentar = async (comentario) => {
    try {
      await feedService.adicionarComentario(usuario.id, comentario);
      setDeveExibirSecaoParaComentar(false);
      setComentariosPostagem([
        ...comentariosPostagem,
        {
          nome: usuarioLogado.nome,
          mensagem: comentario,
        },
      ]);
    } catch (error) {
      alert('Erro ao fazer comentário' + (error?.response?.data?.erro || ''));
    }
  };

  const usuarioLogadoCurtiu = () => {
    return curtidasPostagem.includes(usuarioLogado.id);
  };

  const alterarCurtida = async () => {
    try {
      // await feedService.alterarCurtida(usuario.id);
      const estaCurtido = usuarioLogadoCurtiu();
      if (estaCurtido) {
        setCurtidasPostagem(
          curtidasPostagem.filter(
            (idUsuarioQueCurtiu) => idUsuarioQueCurtiu !== usuarioLogado.id
          )
        );
      } else {
        setCurtidasPostagem([...curtidasPostagem, usuarioLogado.id]);
      }
    } catch (error) {
      alert('Erro ao alterar a curtida' + (error?.response?.data?.erro || ''));
    }
  };

  return (
    <div>
      <Link href={`/perfil/${usuario.id}`}>
        <section className="cabecalhoPostagem">
          <Avatar src={usuario.avatar} />
          <strong>{usuario.nome}</strong>
        </section>
      </Link>

      <div className="fotoDaPostagem">
        <img src={usuario.fotoDoPost} alt="Postagem" />
      </div>

      <div className="rodapePostagem">
        <div className="acoesDaPostagem">
          <Image
            src={obterImagemCurtida()}
            alt="icone curtir"
            width={20}
            height={20}
            onClick={alterarCurtida}
          />

          <Image
            src={obterImagemComentario()}
            alt="icone comentar"
            width={20}
            height={20}
            onClick={() =>
              setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)
            }
          />

          <span className="quantidadeDeCurtidas">
            Curtido por <strong>{curtidasPostagem.length} pessoas</strong>
          </span>
        </div>

        <div className="descricacaoDaPostagem">
          <strong className="nomeUsuario">{usuario.nome}</strong>
          <p className="descricao">
            {obterDescricao()}
            {descricaoMaiorQueLimite() && (
              <span
                onClick={exibirDescricaoCompleta}
                className="exibirDescricaoCompleta"
              >
                mais
              </span>
            )}
          </p>
        </div>

        <div className="comentariosDaPublicacao">
          {comentariosPostagem.map((comentario, i) => (
            <div className="comentario" key={i}>
              <strong className="nomeUsuario">{comentario.nome}</strong>
              <p className="descricao">{comentario.mensagem}</p>
            </div>
          ))}
        </div>
      </div>

      {deveExibirSecaoParaComentar && (
        <FazerComentario
          comentar={comentar} /* usuarioLogado={usuarioLogado} */
        />
      )}
    </div>
  );
}
