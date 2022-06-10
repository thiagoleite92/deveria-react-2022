import React, { useState } from 'react';
import Avatar from '../avatar';

export default function FazerComentario({ usuarioLogado, comentar }) {
  const [linhas, setLinhas] = useState(1);
  const [comentario, setComentario] = useState('');

  const aoDigitarComentario = (e) => {
    const valorInput = e.target.value;

    setComentario(valorInput);
    setLinhas(valorInput.length > 0 ? 2 : 1);
  };

  const aoPressionarQualquerTecla = (e) => {
    if (e.key === 'Enter') {
      fazerComentario();
    }
  };

  const fazerComentario = () => {
    if (comentario.trim().length === 0 || !comentar) {
      return;
    }
    comentar(comentario);
  };

  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado?.avatar || ''} />
      <textarea
        onKeyDown={aoPressionarQualquerTecla}
        onChange={aoDigitarComentario}
        value={comentario}
        rows={linhas}
        placeholder="Adicione um comentário..."
        autoFocus={true}
      ></textarea>
      <button
        onClick={fazerComentario}
        type="button"
        className="btnPublicacao desktop"
      >
        Publicar
      </button>
    </div>
  );
}
