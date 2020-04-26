import {menuBtn, menuPanel, message, form, statusMessage} from './js/main.js';

import {menuCollapse} from'./js/script.js';
import {postRequest} from'./js/post.js';

import './scss/base.scss';

import './img/1.jpg';
import './img/2.jpg';
import './img/3.jpg';
import './img/chanel.png';
import './img/guerlain.png';
import './img/lacoste.png';
import './img/lancome.png';
import './img/zara.png';
import './img/dribbble.png';
import './img/facebook.png';
import './img/google.png';
import './img/linkdn.png';
import './img/twitter.png';
import './img/mac.png';
import './img/mark.png';
import './img/marketing.png';
import './img/mobile_app.png';
import './img/photography.png';
import './img/web_design.png';

menuCollapse(menuBtn, menuPanel);
postRequest(message, form, statusMessage);






