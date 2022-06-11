import React, { useEffect, useState } from 'react';
import FeedService from '../../services/FeedService';
import Postagem from './Postagem';

const feedService = new FeedService();

export default function Feed({ usuarioLogado, usuarioPerfil }) {
  const [listaDePostagens, setListaDePostagens] = useState([]);

  // useEffect(() => {
  //   const fetchPostagens = async () => {
  //     const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);
  //     const postagensFormatadas = data.map((postagem) => ({
  //       id: postagem._id,
  //       usuario: {
  //         id: postagem.userId,
  //         nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
  //         avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar,
  //       },
  //       fotoDoPost: postagem.foto,
  //       descricao: postagem.descricao,
  //       curtidas: postagem.likes,
  //       comentarios: postagem.comentarios.map((c) => ({
  //         nome: c.nome,
  //         mensagem: c.comentario,
  //       })),
  //     }));

  //     setListaDePostagens(postagensFormatadas);
  //   };
  //   fetchPostagens();
  // }, [usuarioLogado, usuarioPerfil]);

  return (
    // <div className="feedContainer largura30pctDesktop">
    //   {listaDePostagens.length ? (
    //     listaDePostagens.map((dadosPostagem) => (
    //       <Postagem {...dadosPostagem} usuarioLogado={usuarioLogado} />
    //     ))
    //   ) : (
    //     <span>Nenhuma postagem ainda</span>
    //   )}
    // </div>
    <>
      <Postagem />
      <Postagem />
    </>
  );
}
