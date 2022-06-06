import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Botao from '../../componentes/botao';
import InputPublico from '../../componentes/inputPublico';
import UploadImagem from '../../componentes/uploadImagem';
import {
  validarEmail,
  validarSenha,
  validarNome,
  validarConfirmacaoSenha,
} from '../../utils/validadores';
import UsuarioService from '../../services/UsuarioService';

import imagemLogo from '../../public/imagens/logo.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemAvatar from '../../public/imagens/avatar.svg';

const usuarioService = new UsuarioService();

export default function Cadastro() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);

  const validarFormulario = () => {
    return (
      validarEmail(email) &&
      validarNome(nome) &&
      validarSenha(senha) &&
      validarConfirmacaoSenha(senha, confirmacaoSenha)
    );
  };

  const aoSubmeter = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEstaSubmetendo(true);

    try {
      const corpoReqCadastro = new FormData();
      corpoReqCadastro.append('nome', nome);
      corpoReqCadastro.append('email', email);
      corpoReqCadastro.append('senha', senha);

      if (imagem?.arquivo) {
        corpoReqCadastro.append('file', imagem.arquivo);
      }

      await usuarioService.cadastro(corpoReqCadastro);

      alert('Sucesso!');
    } catch (error) {
      alert('error ao cadastrar usuário. ' + error?.response?.data?.error);
    }

    setEstaSubmetendo(false);
  };

  return (
    <section className={`paginaCadastro paginaPublica `}>
      <div className="logoContainer desktop">
        <Image className="logo" src={imagemLogo} alt="logotipo" layout="fill" />
      </div>

      <div className="conteudoPaginaPublica">
        <form onSubmit={(e) => aoSubmeter(e)}>
          <UploadImagem
            imagemPreviewClassName="avatar avatarPreview"
            imagemPreview={imagem?.preview || imagemAvatar.src}
            setImagem={setImagem}
          />
          <InputPublico
            imagem={imagemUsuarioAtivo}
            texto="Nome Completo"
            tipo="text"
            aoAlterarValor={(e) => setNome(e.target.value)}
            valor={nome}
            mensagemValidacao="O nome precisa ter pelo menos 2 caracteres"
            exibirMensagemValidacao={nome && !validarNome(nome)}
          />
          <InputPublico
            imagem={imagemEnvelope}
            texto="E-mail"
            tipo="email"
            aoAlterarValor={(e) => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao="O endereço informado é inválido"
            exibirMensagemValidacao={email && !validarEmail(email)}
          />
          <InputPublico
            imagem={imagemChave}
            texto="Senha"
            tipo="password"
            aoAlterarValor={(e) => setSenha(e.target.value)}
            valor={senha}
            mensagemValidacao="A senha precisa ter pelo menos 4 caracteres"
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <InputPublico
            imagem={imagemChave}
            texto="Confirmar senha"
            tipo="password"
            aoAlterarValor={(e) => setConfirmacaoSenha(e.target.value)}
            valor={confirmacaoSenha}
            mensagemValidacao="As senhas precisam ser iguais"
            exibirMensagemValidacao={
              confirmacaoSenha &&
              !validarConfirmacaoSenha(senha, confirmacaoSenha)
            }
          />
          <Botao
            texto="Cadastrar"
            tipo="submit"
            desabilitado={!validarFormulario() || estaSubmetendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Já possui uma conta?</p>
          <Link href="/">Faça seu login agora!</Link>
        </div>
      </div>
    </section>
  );
}
