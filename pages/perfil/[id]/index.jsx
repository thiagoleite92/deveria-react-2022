import React, { useState, useEffect } from 'react';
import comAutorizacao from '../../../hoc/comAutorizacao';
import Feed from '../../../componentes/feed';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../../componentes/cabecalhoPerfil';

function Perfil() {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  useEffect(() => {
    setUsuario({
      nome: 'douglas oliveira',
    });
  }, [router.query.id]);

  return (
    <div className="paginaPerfil">
      <CabecalhoPerfil titulo={usuario} />
      <Feed />
    </div>
  );
}

export default comAutorizacao(Perfil);
