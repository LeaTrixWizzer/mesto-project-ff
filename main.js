(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"761d427c-7ccd-4fcb-a018-2d0ebc758ca4","Content-Type":"application/json"}},t=function(e){if(!e.ok)throw new Error("Ошибка ".concat(e.status," - ").concat(e.message));return e.json()},n=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},o=function(e,t,n,r,o,a,i,u){var l=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),s=l.querySelector(".card__title"),d=l.querySelector(".card__image"),f=l.querySelector(".card__delete-button"),p=l.querySelector(".card__like-button"),m=l.querySelector(".card__like-counter");return s.textContent=e,d.src=t,d.alt=e,m.textContent=n.length,r!==a&&(f.disabled=!0,f.style.display="none"),n.some((function(e){return e._id===a}))&&p.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(e){i(l,o)})),p.addEventListener("click",(function(e){c(p,o,m)})),d.addEventListener("click",(function(){u({name:e,link:t})})),l},c=function(e,t,o){(e.classList.contains("card__like-button_is-active")?r:n)(t).then((function(t){o.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))},a=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)},i=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)},u=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");i(t)}},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)},f=function(e,t){t.querySelector("button[type='submit']").textContent=e?"Сохранение...":"Сохранить"},p=function(e,t){t.querySelector("button[type='submit']").textContent=e?"Удаление...":"Да"},m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _,v,h,b=document.querySelector(".places__list"),S=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__avatar-button"),E=document.querySelector(".popup_type_avatar_edit"),C=document.querySelector(".popup_type_image"),L=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_confirm_delete"),A=document.forms["edit-avatar"],w=document.forms["edit-profile"],U=document.forms["new-place"],T=U["place-name"],O=document.forms["delete-card"],j=w.name,B=w.description,D=U.link,P=A.avatar,I=document.querySelector(".popup__image"),M=document.querySelector(".popup__caption"),N=document.querySelector(".profile__title"),J=document.querySelector(".profile__description"),H=document.querySelector(".profile__title"),V=document.querySelector(".profile__image"),z=document.querySelector(".profile__description");S.addEventListener("click",(function(){a(g),d(U,m)})),q.addEventListener("click",(function(){a(L),j.value=N.textContent,B.value=J.textContent,d(w,m)})),k.addEventListener("click",(function(){a(E),A.reset(),d(A,m)}));var $=function(e){a(C),I.src=e.link,I.alt=e.name,M.textContent=e.name};w.addEventListener("submit",(function(n){var r,o,c;n.preventDefault(),f(!0,L),(r={name:j.value,about:B.value},o=r.name,c=r.about,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:c})}).then(t)).then((function(){N.textContent=j.value,J.textContent=B.value,i(L)})).catch((function(e){console.error("Ошибка при редактировании профиля:",e)})).finally((function(){f(!1,L)}))})),U.addEventListener("submit",(function(n){var r,c,a;n.preventDefault(),f(!0,g),(r={name:T.value,link:D.value},c=r.name,a=r.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:a})}).then(t)).then((function(e){b.prepend(o(e.name,e.link,e.likes,e.owner._id,e._id,_,F,$))})).then((function(){i(g),U.reset()})).catch((function(e){console.error("Ошибка при добавлении новой карточки:",e)})).finally((function(){f(!1,g)}))})),A.addEventListener("submit",(function(n){var r;n.preventDefault(),f(!0,E),(r=P.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){V.style.backgroundImage="url('".concat(e.avatar,"')"),i(E)})).catch((function(e){console.error("Ошибка при редактировании аватара:",e)})).finally((function(){f(!1,E)}))})),O.addEventListener("submit",(function(e){e.preventDefault(),G(v,h)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",function(e){return function(t){(t.target.classList.contains("popup__close")||t.target===e)&&i(e)}}(e))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,n,t.validationMessage)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(m);var F=function(e,t){a(x),v=e,h=t},G=function(n,r){p(!0,x),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(){n.remove(),i(x)})).catch((function(e){console.error("Произошла ошибка:",e)})).finally((function(){p(!1,x)}))};Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];z.textContent=c.about,H.textContent=c.name,V.style="background-image: url('".concat(c.avatar,"')"),_=c._id,a.forEach((function(e){b.append(o(e.name,e.link,e.likes,e.owner._id,e._id,_,F,$))}))})).catch((function(e){console.error("Ошибка при загрузке профиля и карточек:",e)}))})();