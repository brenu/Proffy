import React from "react";

import "./styles.css";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

interface TeacherItemProps {}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/31571238?s=460&u=297e8e8f460b352280cf957ea67026f25255a5f0&v=4"
          alt="Breno Vitório"
        />
        <div>
          <strong>Breno Vitório</strong>
          <span>Biologia</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de biologia avançada.
        <br />
        <br />
        Apaixonado por cultivar bactérias em laboratório e por mudar
        negativamente a vida das pessoas através de experiências. Mais de
        200.000 pessoas já passaram por uma das minhas infecções.
      </p>

      <footer>
        <p>
          Preço/hora<strong>R$ 90,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
