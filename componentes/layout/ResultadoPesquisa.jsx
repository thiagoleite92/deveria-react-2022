import React from 'react';
import Avatar from '../avatar';

export default function ResultadoPesquisa({
  onClick,
  id,
  nome,
  email,
  avatar,
}) {
  return (
    <div className="resultadoPesquisa" onClick={() => onClick(id)}>
      <Avatar src={avatar} />
      <div className="informacoesUsuario">
        <strong>{nome}</strong>
        <span>{email}</span>
      </div>
    </div>
  );
}
