
function settingsSubtitle() {

  //дефолтные настройки субтитров. В каждый плеер передавать свои. 
  //  из этих параметров рисуются стили и к ним же сбарfсываются параметры субтитров при нажатии на кнопку СБРОСИТЬ
  const defaultSubtitleSettings = {
    fontSize: '150%',
    color: '#ffffff',
    backgroundColor: '#000000',
    opacity: '100%',
  };

  // Назначаем  дефолтные стили в тег style
  function createStyleTag(objectStyle) {
    console.log('objectStyle: ', objectStyle);
    const styleTag = document.createElement('style');
    styleTag.classList.add('fp-subtitle__styles');
    styleTag.innerHTML = 
    `.fp-captions p{
      font-size:${objectStyle.fontSize};
      color:${objectStyle.color}; 
      background-color:${objectStyle.backgroundColor}; 
      opacity:${objectStyle.opacity}; }`;
    
    document.body.appendChild(styleTag);
  }

  //назначение параметров из ls || дефолтных
  function setSettingsSubtitle(objectStyle) {
    //получаем данные из ls
    const settingsString = localStorage.getItem('settingsSubtitle');

    // если есть, то рендерим style используя параметры из LS
    if (settingsString) {
      const objectSTyleFromLocalStorage = JSON.parse(settingsString);
      createStyleTag(objectSTyleFromLocalStorage);
    } else {
    // если нет, используем дефолтные параметры 
      createStyleTag(objectStyle);
    }
  };
  setSettingsSubtitle(defaultSubtitleSettings);
  //
  const configBtn = document.querySelector('.fp-config-btn'); 
  const config = document.querySelector('.fp-config');

  // показ кнопки настройка при нажатии на конфиг плеера
  function showSettingsSubtitleButton() {
    const parent = document.querySelector('.fp-subtitle-menu').parentNode;
    const strong = document.querySelector('.fp-subtitle-menu > strong');
    const settingsBtn = document.querySelector('.fp-config__subtitle-btn');

    //временно для показа субтитров в конфиге для разработки. 
    parent.classList.remove('fp-hidden');

    function showSettingsBtn() {
      settingsBtn.classList.add('active');
    }
    function hideSettingsBtn() {
      settingsBtn.classList.remove('active');
    }

    document.querySelector('.fp-config-but.fp-cc').addEventListener('click', showSettingsBtn)
    strong.addEventListener('click', hideSettingsBtn)
    hideSettingsBtn();

  };
  configBtn.addEventListener('click', showSettingsSubtitleButton)


  // создание кнопки "Настройки" внутри меню субтитров
  function createSettingsButton() {
    const config = document.querySelector('.fp-config');
    const settingsButton = document.createElement('div');
    settingsButton.textContent = 'Настройки';
    settingsButton.classList.add('fp-config__subtitle-btn');
    config.appendChild(settingsButton);

    
  };

  createSettingsButton();

  const settingsSubtitleBtn = document.querySelector('.fp-config__subtitle-btn');
  settingsSubtitleBtn.addEventListener('click',(event) => {
    config.classList.remove('fp-active');
    config.classList.remove('active');
    settingsSubtitleBtn.classList.remove('active');

    document.querySelectorAll('.fp-config-item').forEach( (item)=> {
      item.classList.remove('active');
    })
    event.stopPropagation();
  });


  //создание всей разметки.
  function createSettingsListDesktop(parent) {
    const list = document.createElement('ul');
    list.classList.add('fp-config__subtitle-list');
    parent.prepend(list);
    const title = document.createElement('div');
    title.textContent = 'Настройки';
    title.classList.add('fp-config__subtitle-back')
    list.appendChild(title);

    const items = ['Размер текста', 'Цвет текста', 'Цвет фона', 'Прозрачность фона'];

    items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('fp-config__subtitle-item')

      const sutitleButton = document.createElement('div');
      sutitleButton.classList.add('subtitle-item__but', 'fp-config-but');

      const subtitleLabel = document.createElement('div');
      const subtitleValue = document.createElement('div');
      subtitleLabel.classList.add('subtitle-item__label', 'fp-config-label')
      subtitleValue.classList.add('subtitle-item__value', 'fp-config-value')
      subtitleLabel.textContent = item;
      
      const objectSTyleFromLocalStorage = JSON.parse(localStorage.getItem('settingsSubtitle'));


      // для каждого значение подставляем значение из localStorage (если есть)  или дефолтные параметры
      if (item === 'Размер текста') {
        objectSTyleFromLocalStorage ? subtitleValue.textContent = objectSTyleFromLocalStorage.fontSize 
        : subtitleValue.textContent = defaultSubtitleSettings.fontSize;
                
        subtitleValue.classList.add('fp-subtitle__value--font-size');
      } else if(item === 'Цвет текста') {
        objectSTyleFromLocalStorage ? subtitleValue.style.backgroundColor = objectSTyleFromLocalStorage.color 
        : subtitleValue.style.backgroundColor = defaultSubtitleSettings.color;

        subtitleValue.classList.add('fp-subtitle__value--color');
      } else if(item === 'Цвет фона') {
        objectSTyleFromLocalStorage ? subtitleValue.style.backgroundColor = objectSTyleFromLocalStorage.backgroundColor 
        : subtitleValue.style.backgroundColor = defaultSubtitleSettings.backgroundColor;

        subtitleValue.classList.add('fp-subtitle__value--bg-color');
      } else if(item === 'Прозрачность фона') {
        objectSTyleFromLocalStorage ? subtitleValue.textContent = objectSTyleFromLocalStorage.opacity
        : subtitleValue.textContent = defaultSubtitleSettings.opacity;

        subtitleValue.classList.add('fp-subtitle__value--opacity');
      }

      sutitleButton.appendChild(subtitleLabel);
      sutitleButton.appendChild(subtitleValue);

      listItem.appendChild(sutitleButton);
      list.appendChild(listItem);

      const subList = document.createElement('div');
      subList.classList.add('subtitle-item__menu', 'fp-menu')

      listItem.appendChild(subList);

      if (item === 'Размер текста') {
        const subItems = ['Размер', '75%', '100%', '125%', '150%', '175%', '200%'];
        subItems.forEach((subItem, index) => {
          if (index === 0) {
            const backItem = document.createElement('strong');
            backItem.classList.add('subtitle-item__back', 'fp-config-toBack');
            backItem.textContent = subItem;
            subList.appendChild(backItem);
          }
          if(index !== 0 ) {
            const subListItem = document.createElement('a');
            subListItem.classList.add('subtitle-item__subitem');
            subListItem.dataset.fontSize = subItem;
            subListItem.textContent = subItem;
            subList.appendChild(subListItem);
          }
          
        });
      }else if (item === 'Цвет текста') {
        const subItems = ['Цвет текста', 'Черный', 'Белый', 'Красный', 'Жёлтый', 'Зеленый', 'Синий'];
        subItems.forEach((subItem, index) => {
          if (index === 0) {
            const backItem = document.createElement('strong');
            backItem.classList.add('subtitle-item__back', 'fp-config-toBack');
            backItem.textContent = subItem;
            subList.appendChild(backItem);
          }
          if(index !== 0 ) {
            const subListItem = document.createElement('a');
            const innerColorBlock = document.createElement('div');
            
            innerColorBlock.classList.add('subtitle-item__inner-color');
            subListItem.classList.add('subtitle-item__subitem');
            subListItem.style.paddingLeft = '30px';
            
            subListItem.textContent = subItem;
            subListItem.append(innerColorBlock);

            // прописываем данные и стили для разных цветов.
            const colors = {
              'Черный': '#000000',
              'Белый': '#ffffff',
              'Красный': '#C6291C',
              'Жёлтый': '#FFFF54',
              'Зеленый': '#86DB64',
              'Синий': '#1A3D9B',
            };
            
            if (colors[subItem]) {
              subListItem.dataset.fontColor = colors[subItem];
              subListItem.lastChild.style.backgroundColor = colors[subItem];
            }
            //вставляем готовый item в список
            subList.appendChild(subListItem);
            
          }
        });
      } else if (item === 'Цвет фона') {
        const subItems = ['Цвет фона', 'Черный', 'Белый', 'Красный', 'Жёлтый', 'Зеленый', 'Синий'];
        subItems.forEach((subItem, index) => {
          if (index === 0) {
            const backItem = document.createElement('strong');
            backItem.classList.add('subtitle-item__back', 'fp-config-toBack');
            backItem.textContent = subItem;
            subList.appendChild(backItem);
          }
          if(index !== 0 ) {
            const subListItem = document.createElement('a');
            const innerColorBlock = document.createElement('div');
            
            innerColorBlock.classList.add('subtitle-item__inner-color');
            subListItem.classList.add('subtitle-item__subitem');
            subListItem.style.paddingLeft = '30px';
            subListItem.textContent = subItem;
            subListItem.append(innerColorBlock);

            // прописываем данные и стили для разных цветов.
            const colors = {
              'Черный': '#000000',
              'Белый': '#ffffff',
              'Красный': '#C6291C',
              'Жёлтый': '#FFFF54',
              'Зеленый': '#86DB64',
              'Синий': '#1A3D9B',
            };
            
            if (colors[subItem]) {
              subListItem.dataset.backgroundColor = colors[subItem];
              subListItem.lastChild.style.backgroundColor = colors[subItem];
            }
            //вставляем готовый item в список
            subList.appendChild(subListItem);

          }
        });
      } else if (item === 'Прозрачность фона') {
        const subItems = ['Прозрачность', '100%', '80%', '60%', '40%', '20%', '0%'];
        subItems.forEach((subItem, index) => {
          if (index === 0) {
            const backItem = document.createElement('strong');
            backItem.classList.add('subtitle-item__back', 'fp-config-toBack');
            backItem.textContent = subItem;
            subList.appendChild(backItem);
          }
          if(index !== 0 ) {
            const subListItem = document.createElement('a');
            subListItem.classList.add('subtitle-item__subitem');
            subListItem.dataset.opacity = subItem;
            subListItem.textContent = subItem;
            subList.appendChild(subListItem);
          }
        });
      }
    });
    //reset
    const resetButton = document.createElement('div');
    resetButton.textContent = 'Сбросить';
    resetButton.classList.add('fp-config__subtitle-reset');
    list.appendChild(resetButton);

    //при нажатии на СБРОСИТЬ обновляем стили в теге style на дефолтные, удаляем данные из LS
    // и обновляем значение в меню на дефолтные
    resetButton.addEventListener('click', (event) => {
      event.stopPropagation();
      createStyleTag(defaultSubtitleSettings);
      localStorage.removeItem('settingsSubtitle');

      const valueItems = document.querySelectorAll('.subtitle-item__value');
      valueItems.forEach((item)=>{
        console.log('item: ', item);
        
        if (item.classList.contains('fp-subtitle__value--font-size')) {
          item.textContent = defaultSubtitleSettings.fontSize;
        } else if (item.classList.contains('fp-subtitle__value--color')) {
          item.style.backgroundColor = defaultSubtitleSettings.color;
        } else if (item.classList.contains('fp-subtitle__value--bg-color')) {
          item.style.backgroundColor = defaultSubtitleSettings.backgroundColor;
        } else if (item.classList.contains('fp-subtitle__value--opacity')) {
          item.textContent = defaultSubtitleSettings.opacity;
        }
      });
    });

    //клик за пределами setting subtitle
    document.addEventListener('click', event => {
      if (!list.contains(event.target)) {
        //если нажали вне спика - скрывать всё.
      }
    });

    //клик на элемент для входа во внутреннее меню
    const subtitleItemBut = document.querySelectorAll('.subtitle-item__but');
    const subtitleItemBack = document.querySelector('.fp-config__subtitle-back');
    const subtitleItemReset = document.querySelector('.fp-config__subtitle-reset');

    //при входе в подменю скрываем "настройки" и "сбросить" добавлением класса hidden
    subtitleItemBut.forEach((item) => {
      item.addEventListener('click', () => {
        
        subtitleItemBack.classList.add('hidden');
        subtitleItemReset.classList.add('hidden');

      });
    });
    

    //клик на заголовок во внутреннем меню для выхода на уровень выше
    const strongSubtitleItemBack = document.querySelectorAll('.subtitle-item__back');

    //при выходе на уровень выше показываем "настройки" и "сбросить" удалением класса hidden
    // у элемента li удаляем active для скрытия списка
    strongSubtitleItemBack.forEach((item) => {
      item.addEventListener('click', (event) => {
        
        subtitleItemBack.classList.remove('hidden');
        subtitleItemReset.classList.remove('hidden');
        item.parentNode.parentNode.classList.remove('active');

        setConfigHeight('.fp-menu');
      });
    });

    //клик на любой элемент со значением во внутреннем меню
    const subtitleItem = document.querySelectorAll('.subtitle-item__subitem');

    //при выходе на уровень выше показываем "настройки" и "сбросить" удалением класса hidden
    // у элемента li удаляем active для скрытия списка
    subtitleItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        subtitleItemBack.classList.remove('hidden');
        subtitleItemReset.classList.remove('hidden');
        item.parentNode.parentNode.classList.remove('active');
        config.classList.remove('active');
      });
    });
    
  }

  createSettingsListDesktop(document.querySelector('.fp-config'));

  

  // Отрисовка мобильных элементов настроек.
  function createSettingsListMobile() {
    const list = document.querySelector('.fp-config-mobile .fp-config-list');
    const subtitleItemFontSize = document.createElement('li')
    subtitleItemFontSize.classList.add('fp-config-list__item--font-size');

    const fontSizeLabel = document.createElement('div');
    fontSizeLabel.classList.add('fp-config-label');
    fontSizeLabel.textContent = 'Размер Субтитров';

    const fontSizeSelect = document.createElement('select');
    fontSizeSelect.classList.add('fp-font-size-select-menu');

    const objectSTyleFromLocalStorage = JSON.parse(localStorage.getItem('settingsSubtitle'));

    // Отрисовка option
    const subItems = ['75%', '100%', '125%', '150%', '175%', '200%'];
    subItems.forEach((subItem, index) => {
        const subListItem = document.createElement('option');
        subListItem.dataset.fontSize = subItem;
        subListItem.text = subItem;
        
        // Моб настройки. Если данные есть в LS берем их оттуда
        if (objectSTyleFromLocalStorage) {
          
          if (subListItem.getAttribute('data-font-size') === objectSTyleFromLocalStorage.fontSize) {
            subListItem.selected = true
          }
        //Если нет берем из дефолтных
        } else {
          if (subListItem.getAttribute('data-font-size') === defaultSubtitleSettings.fontSize) {
            subListItem.selected = true
          }
        }

        fontSizeSelect.appendChild(subListItem);
      });
    
    subtitleItemFontSize.appendChild(fontSizeLabel);
    subtitleItemFontSize.appendChild(fontSizeSelect);

    list.appendChild(subtitleItemFontSize);
  };

  createSettingsListMobile();

  // Обработка выбора элементов и зпись их в LS, customSubtitleSettings - с последющим изменение стилей в теге style
  const settingsSubitemsMobileSelect = document.querySelector('.fp-font-size-select-menu');
  console.log('settingsSubitemsMobileSelect: ', settingsSubitemsMobileSelect);

  settingsSubitemsMobileSelect.addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    console.log("Выбран элемент с значением " + selectedOption.value);
    customSubtitleSettings.fontSize = selectedOption.value;

    // при любом изменении  сохраняем объект с найстроками в ls
    saveSettingsSubtitle(customSubtitleSettings);
    // перерисовываем стили
    changeStyle(customSubtitleSettings);
  })


  // функция назначение высоты конфигу в зависимости от высоты потомков
  function setConfigHeight(selector) {
    const config = document.querySelector('.fp-config');
    const parent = document.querySelector(selector);
    console.log('document.querySelector(selector);: ', document.querySelector('.fp-menu').children);

    // children - HTMLcollection из всех дочерних элементов
    const children = parent.children;
    console.log('children: ', children);
    let totalHeight = 0;
    
    
    //суммируем высоту всех элементов
    for (let i = 0; i < children.length; i++) {
      totalHeight += children[i].clientHeight;
      console.log('children[i]: ', children[i]);
    }
    console.log('totalHeight: ', totalHeight);
    //адаптируем конфиг по повысоте
    config.style.height = totalHeight + "px";
  }


  const backFromSettingsSubtitleButton = document.querySelector('.fp-config__subtitle-back');
  const settingsOpenBtn = document.querySelector('.fp-config__subtitle-btn');
  const settingsList = document.querySelector('.fp-config__subtitle-list');

  //нажатие на элемент настройки в списке настроек возвращает в основное меню.
  backFromSettingsSubtitleButton.addEventListener('click', (event) => {
    settingsList.classList.remove('active');
    setConfigHeight('.fp-config-list');
    event.stopPropagation();
  });

  //нажатие на кнопку "настройки"  - вход в настрйоки субтитров.
  settingsOpenBtn.addEventListener('click', () => {
    settingsList.classList.toggle('active');
    config.classList.toggle('fp-active')

    setConfigHeight('.fp-config__subtitle-list');
  });

  //клик на элемент для входа во внутреннее меню
  // const subtitleItemBut = document.querySelectorAll('.subtitle-item__but');

  
  // subtitleItemBut.forEach((item) => {
  //   item.addEventListener('click', () => {
  //     console.log('item: ', item);
      
  //     // setTimeout(() => {
  //     //   setConfigHeight('.fp-menu');
  //     // }, 0)
      
  //   });
  // });

  // сохранение объекта с параметрами субтитров в ls
  function saveSettingsSubtitle(settings) {
    const settingsString = JSON.stringify(settings);
    localStorage.setItem('settingsSubtitle', settingsString);
  }


  
  
  // Кастомные настройки субтитров
  // изначально в них записаны дефолтные параметры. 
  // При любом изменении параметров происходит перезапись параметров в объект customSubtitleSettings
  // и далее вызывается функция saveSettingsSubtitle(customSubtitleSettings); - чтобы кастомные параметры сохранить в LS 
  // и вызывается changeStyle(customSubtitleSettings); - чтобы переписать новые параметры в тег style
  const customSubtitleSettings = {
    fontSize: defaultSubtitleSettings.fontSize,
    color: defaultSubtitleSettings.color,
    backgroundColor: defaultSubtitleSettings.backgroundColor,
    opacity: defaultSubtitleSettings.opacity,
  };

  //все элементы параметров
  const settingsSubitems = document.querySelectorAll('.subtitle-item__subitem');

  settingsSubitems.forEach((item, index) => {
    item.addEventListener('click', function () {

      //проверяем на какой элемент клик  -  переписываем кастомные стили на новые и обновляем значение\цвет.
      if (item.hasAttribute('data-font-size')) {
        customSubtitleSettings.fontSize = item.getAttribute('data-font-size');
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').textContent = item.getAttribute('data-font-size');
      } else if (item.hasAttribute('data-font-color')) {
        customSubtitleSettings.color = item.getAttribute('data-font-color');
        console.log(item.getAttribute('data-font-color'));
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').style.backgroundColor = item.getAttribute('data-font-color');
      } else if (item.hasAttribute('data-background-color')) {
        customSubtitleSettings.backgroundColor = item.getAttribute('data-background-color');
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').style.backgroundColor = item.getAttribute('data-background-color');
      } else if (item.hasAttribute('data-opacity')) {
        customSubtitleSettings.opacity = item.getAttribute('data-opacity');
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').textContent = item.getAttribute('data-opacity');
      }
      

      // при любом изменении  сохраняем объект с найстроками в ls
      saveSettingsSubtitle(customSubtitleSettings);
      // перерисовываем стили
      changeStyle(customSubtitleSettings);
    })
  });

    // изменение стилей при выборе парамтеров
    function changeStyle(objectStyle) {
      console.log('objectStyle: ', objectStyle);
      const styleTag = document.querySelector('.fp-subtitle__styles');
      styleTag.innerHTML = 
      `.fp-captions p{
        font-size:${objectStyle.fontSize};
        color:${objectStyle.color}; 
        background-color:${objectStyle.backgroundColor}; 
        opacity:${objectStyle.opacity}; }`;
      
      document.body.appendChild(styleTag);
    }; 


  

    
  
}

console.log('settingsSubtitle start');

module.exports = settingsSubtitle;

// ---------------------------------------------------

