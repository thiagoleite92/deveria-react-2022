import React, { useState, useEffect } from 'react';
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';

import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Botao from '../../componentes/botao';
import Avatar from '../avatar';
import UsuarioService from '../../services/UsuarioService';
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

const usuario = {
  nome: 'douglas',
  publicacoes: '15',
  seguidores: '8',
  seguindo: '7',
  segueEsseUsuario: true,
};

export default function CabecalhoPerfil() {
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
  const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      return;
    }
    setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
  }, [usuario]);

  const obterTextoBotaoBotaoSeguir = () => {
    if (estaSeguindoOUsuario) {
      return 'Deixar de seguir';
    }

    return 'Seguir';
  };

  const obterCorBotaoSeguir = () => {
    if (estaSeguindoOUsuario) {
      return 'invertido';
    }

    return 'primaria';
  };

  const manipularCliqueBotaoSeguir = async () => {
    try {
      // await usuarioService.alternarSeguir(usuario._id);
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

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
        titulo={usuario.nome}
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
            texto={obterTextoBotaoBotaoSeguir()}
            cor={obterCorBotaoSeguir()}
            manipularClique={manipularCliqueBotaoSeguir}
          />
        </div>
      </div>
    </div>
  );
}
