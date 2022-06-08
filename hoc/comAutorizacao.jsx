import { useRouter } from 'next/router';
import Cabecalho from '../componentes/layout/Cabecalho';
import UsuarioService from '../services/UsuarioService';

const usuarioService = new UsuarioService();

export default function ComAutorizacao(Componente) {
  return (props) => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (!usuarioService.estaAutenticado()) {
        router.replace('/');
        return null;
      }
      return (
        <>
          <Cabecalho />
          <Componente {...props} />;
          <Rodape />
        </>
      );
    }
    return null;
  };
}
