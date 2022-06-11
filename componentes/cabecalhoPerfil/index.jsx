import React, { useState, useEffect } from 'react';
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';

import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Botao from '../../componentes/botao';
import Avatar from '../avatar';
import UsuarioService from '../../services/UsuarioService';
import { useRouter } from 'next/router';
import Image from 'next/image';

const usuarioService = new UsuarioService();

const usuario = {
  nome: 'douglas',
  publicacoes: '15',
  seguidores: '8',
  seguindo: '7',
  segueEsseUsuario: true,
};

export default function CabecalhoPerfil({ estaNoPerfilPessoal }) {
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
  const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(1);

  const router = useRouter();

  // useEffect(() => {
  //   if (!usuario) {
  //     return;
  //   }
  //   setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
  // }, [usuario]);

  const obterTextoBotaoPrincipal = () => {
    if (estaNoPerfilPessoal) {
      return 'Editar Perfil';
    }

    if (estaSeguindoOUsuario) {
      return 'Deixar de seguir';
    }

    return 'Seguir';
  };

  const obterCorBotaoPrincipal = () => {
    if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
      return 'invertido';
    }

    return 'primaria';
  };

  const manipularCliqueBotaoPrincipal = async () => {
    if (estaNoPerfilPessoal) {
      return router.push('/perfil/editar');
    }

    try {
      await usuarioService.alternarSeguir(usuario._id);
      setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
      setQuantidadeSeguidores(
        estaSeguindoOUsuario
          ? quantidadeSeguidores - 1
          : quantidadeSeguidores + 1
      );
    } catch (error) {
      alert('Error ao seguir/deixar de seguir!');
    }
  };

  const aoClicarSetaEsquerda = () => {
    router.back();
  };

  const logout = () => {
    usuarioService.logout();
    router.replace('/');
  };

  const obterElementoDaDireitaCabecalho = () => {
    if (estaNoPerfilPessoal) {
      return (
        <Image
          src={imgLogout}
          alt="icone logout"
          onClick={logout}
          width={23}
          height={23}
        />
      );
    }
    return null;
  };

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
        titulo={usuario.nome}
        elementoDireita={obterElementoDaDireitaCabecalho()}
      />

      <hr className="bordaCabecalhoPerfil" />

      <div className="statusPerfil">
        <Avatar src={usuario.avatar} />
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>{usuario.publicacoes}</strong>
              <span>Publicações</span>
            </div>

            <div className="status">
              <strong>{quantidadeSeguidores}</strong>
              <span>Seguidores</span>
            </div>

            <div className="status">
              <strong>{usuario.seguindo}</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <Botao
            texto={obterTextoBotaoPrincipal()}
            cor={obterCorBotaoPrincipal()}
            manipularClique={manipularCliqueBotaoPrincipal}
          />
        </div>
      </div>
    </div>
  );
}
