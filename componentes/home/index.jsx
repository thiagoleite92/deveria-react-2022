import ComAutorizacao from '../../hoc/comAutorizacao';
import Feed from '../feed';

function Home({ usuarioLogado }) {
  return <Feed usuarioLogado={usuarioLogado} />;
}

export default ComAutorizacao(Home);
