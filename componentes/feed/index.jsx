import React, { useEffect, useState } from 'react';
import Postagem from './Postagem';

export default function Feed({ usuarioLogado }) {
  const [listaDePostagens, setListaDePostagens] = useState([]);

  useEffect(() => {
    setListaDePostagens([
      {
        id: 'oi',
      },
      { id: 'tchau' },
    ]);
  }, [usuarioLogado]);

  return (
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map((dadosPostagem) => (
        <Postagem {...dadosPostagem} usuarioLogado={usuarioLogado} />
      ))}
    </div>
  );
}
