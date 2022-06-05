import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Avatar from '../componentes/avatar';
import Botao from '../componentes/botao';
import { UploadImagem } from '../componentes/uploadImagem';

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <h1>Olá mundo</h1>
      <button onClick={() => referenciaInput?.current?.click()}>
        abrir seletor de arquivos
      </button>

      <UploadImagem
        setImagem={setImagem}
        imagemPreview={imagem?.preview}
        aoSetarAReferencia={(ref) => (referenciaInput.current = ref)}
      />
      <Avatar />
      <Botao texto={'Login'} manipularClique={() => console.log('oi')} />
    </>
  );
}
