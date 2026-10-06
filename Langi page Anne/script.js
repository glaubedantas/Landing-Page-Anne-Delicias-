/* =========================================================
   ANNE DELÍCIAS — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CONFIGURAÇÕES
     ======================================================= */

  // WhatsApp da Anne Delícias
  // Formato: código do Brasil + DDD + número
  const WHATSAPP_NUMBER = "5512988082706";

  // Instagram da Anne Delícias
  // TROQUE pelo @/link correto quando tiver.
  const INSTAGRAM_URL = "https://www.instagram.com/anne.delicias/";

  /* =======================================================
     WHATSAPP
     ======================================================= */

  const whatsappLinks = document.querySelectorAll("[data-wa]");

  whatsappLinks.forEach((link) => {

    const tipo = link.dataset.wa;

    let mensagem = "Olá! Vim pelo site da Anne Delícias e gostaria de fazer um pedido. 🍰";

    if (tipo === "Fatias de bolo") {
      mensagem =
        "Olá! Vim pelo site da Anne Delícias e gostaria de pedir informações sobre as fatias de bolo. 🍰";
    }

    if (tipo === "Bolos especiais") {
      mensagem =
        "Olá! Vim pelo site da Anne Delícias e gostaria de saber mais sobre os bolos especiais. 🎂";
    }

    if (tipo === "Doces & sobremesas") {
      mensagem =
        "Olá! Vim pelo site da Anne Delícias e gostaria de saber mais sobre os doces e sobremesas. 🍮";
    }

    if (tipo === "encomenda") {
      mensagem =
        "Olá! Vim pelo site da Anne Delícias e gostaria de fazer uma encomenda. Gostaria de saber os sabores e opções disponíveis. ❤️";
    }

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  /* =======================================================
     INSTAGRAM
     ======================================================= */

  const instagramLinks = document.querySelectorAll("[data-insta]");

  instagramLinks.forEach((link) => {
    link.href = INSTAGRAM_URL;

    if (link.tagName.toLowerCase() === "a") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  /* =======================================================
     MENU MOBILE
     ======================================================= */

  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (burger && menu) {

    burger.addEventListener("click", () => {

      const aberto = burger.classList.toggle("active");

      menu.classList.toggle("active", aberto);

      burger.setAttribute(
        "aria-expanded",
        aberto ? "true" : "false"
      );

      burger.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
      );

    });

    // Fecha o menu quando clicar em um link
    const menuLinks = menu.querySelectorAll("a");

    menuLinks.forEach((link) => {

      link.addEventListener("click", () => {

        burger.classList.remove("active");
        menu.classList.remove("active");

        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Abrir menu");

      });

    });
  }

  /* =======================================================
     ANIMAÇÃO AO ROLAR
     ======================================================= */

  const elementosFade = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  elementosFade.forEach((elemento) => {
    observer.observe(elemento);
  });

  /* =======================================================
     VERIFICAR IMAGENS
     ======================================================= */

  const imagens = document.querySelectorAll("img");

  imagens.forEach((img) => {

    img.addEventListener("error", () => {

      const container = img.closest(".ph");

      if (!container) return;

      container.classList.add("is-missing");

      img.style.display = "none";

    });

    // Caso a imagem já tenha falhado antes do JS carregar
    if (img.complete && img.naturalWidth === 0) {

      const container = img.closest(".ph");

      if (container) {

        container.classList.add("is-missing");
        img.style.display = "none";

      }

    }

  });

  /* =======================================================
     MODAL DA GALERIA
     ======================================================= */

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  const imagensGaleria = document.querySelectorAll(
    ".gallery img, .insta img"
  );

  if (modal && modalImg) {

    imagensGaleria.forEach((img) => {

      img.addEventListener("click", () => {

        if (!img.src || img.style.display === "none") {
          return;
        }

        modalImg.src = img.src;
        modalImg.alt = img.alt || "Imagem ampliada";

        modal.hidden = false;

        document.body.style.overflow = "hidden";

      });

    });

  }

  /* =======================================================
     FECHAR MODAL
     ======================================================= */

  function fecharModal() {

    if (!modal) return;

    modal.hidden = true;

    document.body.style.overflow = "";

    if (modalImg) {
      modalImg.src = "";
    }

  }

  if (modalClose) {
    modalClose.addEventListener("click", fecharModal);
  }

  if (modal) {

    modal.addEventListener("click", (event) => {

      if (event.target === modal) {
        fecharModal();
      }

    });

  }

  /* =======================================================
     TECLA ESC
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      // Fecha modal
      fecharModal();

      // Fecha menu
      if (burger && menu) {

        burger.classList.remove("active");
        menu.classList.remove("active");

        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Abrir menu");

      }

    }

  });

  /* =======================================================
     ANIMAÇÃO DOS CARDS
     ======================================================= */

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

  });

  /* =======================================================
     ANO AUTOMÁTICO DO FOOTER
     ======================================================= */

  const footerCopy = document.querySelector(".footer__copy");

  if (footerCopy) {

    const ano = new Date().getFullYear();

    footerCopy.textContent =
      `© ${ano} Anne Delícias`;

  }

});