import React, { useState, useEffect } from 'react';
import comAutorizacao from '../../hoc/comAutorizacao';
import Feed from '../../componentes/feed';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

function Perfil() {
  const [usuario, setUsuario] = useState({});
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: 'thiago',
  });
  const router = useRouter();

  // useEffect(() => {
  //   if (!router.query.id) {
  //     return;
  //   }

  //   const obterPerfil = async (idUsuario) => {
  //     try {
  //       const { data } = await usuarioService.obterPerfil(idUsuario);
  //       estaNoPerfilPessoal() ? usuarioLogado.id : idUsuario;
  //       return data;
  //     } catch (error) {
  //       alert(`Erro ao obter perfil do usuário`);
  //     }
  //   };
  //   obterPerfil(router.query.id);
  // }, [router.query.id]);

  const estaNoPerfilPessoal = () => {
    return router.query.id === 'eu';
  };

  return (
    <div className="paginaPerfil">
      <CabecalhoPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
        estaNoPerfilPessoal={estaNoPerfilPessoal()}
      />
      <Feed usuarioLogado={usuarioLogado} usuarioPerfil={usuario} />
    </div>
  );
}

export default comAutorizacao(Perfil);
