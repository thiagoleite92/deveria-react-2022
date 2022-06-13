export class LoadingService {
  static exibir() {
    document.querySelector('.logoContainer')?.classList.remove('oculto');
  }

  static ocultar() {
    setTimeout(() => {
      document.querySelector('.logoContainer')?.classList.add('oculto');
    }, 500);
  }
}
