import React from 'react';
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';

import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import Botao from '../../componentes/botao';
import Avatar from '../avatar';

const usuario = { nome: 'douglas' };

export default function CabecalhoPerfil() {
  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={imgSetaEsquerda}
        titulo={usuario.nome}
      />

      <div className="statusPerfil">
        <Avatar src={usuario.avatar} />
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>15</strong>
              <span>Publicações</span>
            </div>

            <div className="status">
              <strong>12</strong>
              <span>Seguidores</span>
            </div>

            <div className="status">
              <strong>32</strong>
              <span>Publicacoes</span>
            </div>
          </div>
          <Botao texto="seguir" cor="primaria" />
        </div>
      </div>
    </div>
  );
}
