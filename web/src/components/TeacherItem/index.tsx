import React from "react";

import "./styles.css";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

export interface Class {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface TeacherItemProps {
  class: Class;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  async function createNewConnection() {
    const response = await api.post("/connections", {
      user_id: props.class.user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={props.class.avatar} alt={props.class.name} />
        <div>
          <strong>{props.class.name}</strong>
          <span>{props.class.subject}</span>
        </div>
      </header>

      <p>{props.class.bio}</p>

      <footer>
        <p>
          Preço/hora<strong>R$ {props.class.cost}</strong>
        </p>
        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${props.class.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
