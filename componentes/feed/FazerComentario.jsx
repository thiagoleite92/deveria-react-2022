import React from 'react';
import Avatar from '../avatar';

export default function FazerComentario({ usuarioLogado }) {
  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado?.avatar || ''} />
      <textarea placeholder="Adicione um comentário..."></textarea>
    </div>
  );
}
