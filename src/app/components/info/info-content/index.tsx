import React from "react";

// styles
import style from "./style.module.scss";

const email = "hydrock@yandex.ru";
const text = [
  "Hey there! I’m Alex, a full-time web-developer who is passionate about creating efficient user-friendly websites and apps.",
  "If you have any comments or suggestions just drop me an email to ",
  " or contact me on Github ",
  "."
];

export default function InfoContent() {
  return (
    <div className={style.container}>
        <div className={style.info}>
            <img
                src="https://avatars2.githubusercontent.com/u/20814779?s=460&v=4"
                alt="avatar"
                className={style.avatar}
            />
            <div>
                <div className={style.row}>
                    {text[0]}
                </div>
                <div className={style.row}>
                    {text[1]}
                    <a href={`mailto:${email}`}>
                        hydrochk@yandex.ru
                    </a>
                    {text[2]}
                    <a
                        href="https://github.com/Hydrock/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/Hydrock/
                    </a>
                    {text[3]}
                </div>
            </div>
        </div>
    </div>
  );
}
