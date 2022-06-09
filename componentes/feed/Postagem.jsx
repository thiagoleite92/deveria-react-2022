import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import imgCurtir from '../../public/imagens/curtir.svg';
import imgCurtido from '../../public/imagens/curtido.svg';
import imgAtivo from '../../public/imagens/comentarioAtivo.svg';
import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg';
import Avatar from '../avatar';
import FazerComentario from './FazerComentario';

const tamanhoLimiteDescricao = 93;

const usuario = {
  id: '1',
  avatar: '',
  fotoDoPost:
    'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
  descricao:
    'um texto muito grande com mais de 93 caracteres para ser usado na aula da deveria :), falta pouco para alcancar',
  comentarios: [{ nome: 'thiago', mensagem: 'meu nome' }],
  id: '1',
};

export default function Postagem() {
  const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
    tamanhoLimiteDescricao
  );

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
            src={imgCurtir}
            alt="icone curtir"
            width={20}
            height={20}
            onClick={() => console.log('curtir')}
          />

          <Image
            src={imgComentarioCinza}
            alt="icone comentar"
            width={20}
            height={20}
            onClick={() =>
              setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)
            }
          />

          <span className="quantidadeDeCurtidas">
            Curtido por <strong>32pessoas</strong>
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
          {usuario.comentarios.map((comentario, i) => (
            <div className="comentario" key={i}>
              <strong className="nomeUsuario">{comentario.nome}</strong>
              <p className="descricao">{comentario.mensagem}</p>
            </div>
          ))}
        </div>
      </div>

      {deveExibirSecaoParaComentar && (
        <FazerComentario /* usuarioLogado={usuarioLogado} */ />
      )}
    </div>
  );
}
