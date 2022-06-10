import React, { useEffect, useState } from 'react';
import FeedService from '../../services/FeedService';
import Postagem from './Postagem';

const feedService = new FeedService();

export default function Feed({ usuarioLogado }) {
  const [listaDePostagens, setListaDePostagens] = useState([]);

  // useEffect(() => {
  //   const fetchPostagens = async () => {
  //     const { data } = await feedService.carregarPostagens();
  //     const postagensFormatadas = data.map((postagem) => ({
  //       id: postagem._id,
  //       usuario: {
  //         id: postagem.userId,
  //         nome: postagem.usuario.nome,
  //         avatar: postagem.usuario.avatar,
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
  // }, []);

  return (
    // <div className="feedContainer largura30pctDesktop">
    //   {listaDePostagens.map((dadosPostagem) => (
    //     <Postagem {...dadosPostagem} usuarioLogado={usuarioLogado} />
    //   ))}
    // </div>
    <>
      <Postagem />
      <Postagem />
      <Postagem />
      <Postagem />
      <Postagem />
    </>
  );
}
