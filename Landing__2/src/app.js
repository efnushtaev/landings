import {menuBtn, menuPanel, message, form, statusMessage,modalBtn, modalElement, modalInner} from './js/main.js';

import {menuCollapse} from'./js/menuCollapse.js';
import {postRequest} from'./js/postRequest.js';
import {modalWindow} from'./js/modalWindow.js';

import './scss/style.scss';

import './scss/modalWindow.scss';

import './img/1_ellips.png';
import './img/2_ellips.png';
import './img/3_ellips.png';
import './img/AMZ-TATOO.png';
import './img/banner-1.jpg';
import './img/card_1.jpg';
import './img/card_2.jpg';
import './img/card_3.jpg';
import './img/email.png';
import './img/our__team__1.jpg';
import './img/our__team__2.jpg';
import './img/our__team__3.jpg';
import './img/our_works_bg.png';
import './img/phone.png';
import './img/pic_1.jpg';
import './img/pic_2.jpg';
import './img/pic_3.jpg';
import './img/pic_4.jpg';
import './img/pic_5.jpg';
import './img/pic_6.jpg';

menuCollapse(menuBtn, menuPanel);
postRequest(message, form, statusMessage);

modalWindow(modalBtn, modalElement, modalInner);






