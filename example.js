
function settingsSubtitle() {

  //дефолтные настройки субтитров. В каждый плеер передавать свои. 
  //  из этих параметров рисуются стили и к ним же сбартсываются параметры субтитров при нажатии на кнопку СБРОСИТЬ
  //получаем данные из ls
  
  let settingsString = '';
  let objectSTyleFromLocalStorage = {};
  if (navigator.cookieEnabled) {
    console.log("Куки разблокированы");
    settingsString = localStorage.getItem('settingsSubtitle');
    objectSTyleFromLocalStorage = JSON.parse(localStorage.getItem('settingsSubtitle'));
  } else {
    console.log("Куки заблокированы");
  }

  const defaultSubtitleSettings = {
    fontSize: '100%',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(0, 0, 0, 100%)',
    backgroundColorOpacity: '100%',
  };

  //проверка на пустоту объекта, чтобы использовать его в условиях
  function isEmpty(obj) {
    if (!obj) {
      return false;
    }
    return Object.keys(obj).length !== 0;
  }
  const customSubtitleSettings = {
    fontSize: isEmpty(objectSTyleFromLocalStorage) ? objectSTyleFromLocalStorage.fontSize : defaultSubtitleSettings.fontSize,
    color: isEmpty(objectSTyleFromLocalStorage) ? objectSTyleFromLocalStorage.color : defaultSubtitleSettings.color,
    backgroundColor: isEmpty(objectSTyleFromLocalStorage) ? objectSTyleFromLocalStorage.backgroundColor : defaultSubtitleSettings.backgroundColor,
    backgroundColorOpacity: isEmpty(objectSTyleFromLocalStorage) ? objectSTyleFromLocalStorage.backgroundColorOpacity : defaultSubtitleSettings.backgroundColorOpacity,
  };

  // Назначаем  дефолтные стили в тег style
  function createStyleTag(objectStyle) {
    const styleTag = document.createElement('style');
    styleTag.classList.add('fp-subtitle__styles');
    styleTag.innerHTML = 
    `.fp-captions p{
      font-size:${objectStyle.fontSize};
      color:${objectStyle.color}; 
      background-color:${objectStyle.backgroundColor};}`;
    
    document.body.appendChild(styleTag);
  }

  //назначение параметров из ls || дефолтных
  function setSettingsSubtitle(objectStyle) {
    // если есть, то рендерим style используя параметры из LS
    if (isEmpty(objectSTyleFromLocalStorage)) {
      objectSTyleFromLocalStorage = JSON.parse(settingsString);
      createStyleTag(objectSTyleFromLocalStorage);
    } else {
    // если нет, используем дефолтные параметры 
      createStyleTag(objectStyle);
    }
  };
  setSettingsSubtitle(defaultSubtitleSettings);

  const configBtn = document.querySelector('.fp-config-btn'); 
  const config = document.querySelector('.fp-config');
  // показ кнопки настройка при нажатии на конфиг плеера
  function showSettingsSubtitleButton() {
    const strong = document.querySelector('.fp-subtitle-menu > strong');
    const settingsBtn = document.querySelector('.fp-config__subtitle-btn');
    // при нажатии на конфиг, если меню выбора субтитров уже открыто, так же показываем кнопку Настройки
    if (document.querySelector('.fp-cc').parentNode.classList.contains('active')) {
      settingsBtn.classList.add('active');
    }
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
    });
    config.style.width = '199px';
    event.stopPropagation();
  });


  //создание всей разметки.
  function createSettingsListDesktop(parent) {
    const list = document.createElement('ul');
    list.classList.add('fp-config__subtitle-list');
    parent.prepend(list);
    const title = document.createElement('div');
    title.textContent = 'Настройки субтитров';
    title.classList.add('fp-config__subtitle-back')
    list.appendChild(title);

    const items = ['Размер текста', 'Цвет текста', 'Цвет фона', 'Прозрачность фона'];

    items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('fp-config__subtitle-item')
      const subtitleButton = document.createElement('div');
      
      if (item === 'Размер текста') {
        subtitleButton.classList.add('subtitle-item__but', 'fp-config-but', 'fp-config-but__font-size');
      } else if (item === 'Цвет текста') {
        subtitleButton.classList.add('subtitle-item__but', 'fp-config-but', 'fp-config-but__font-color');
      } else  if (item === 'Цвет фона') {
        subtitleButton.classList.add('subtitle-item__but', 'fp-config-but', 'fp-config-but__background-color');
      } else {
        subtitleButton.classList.add('subtitle-item__but', 'fp-config-but',  'fp-config-but__background-opacity');
      }

      const subtitleLabel = document.createElement('div');
      const subtitleValue = document.createElement('div');
      subtitleLabel.classList.add('subtitle-item__label', 'fp-config-label')
      subtitleValue.classList.add('subtitle-item__value', 'fp-config-value')
      subtitleLabel.textContent = item;
      
      let objectSTyleFromLocalStorage = {};
      if (navigator.cookieEnabled) {
        settingsString = localStorage.getItem('settingsSubtitle');
        objectSTyleFromLocalStorage = JSON.parse(localStorage.getItem('settingsSubtitle'));
      } else {
        objectSTyleFromLocalStorage = defaultSubtitleSettings;
      }
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

        if (isEmpty(objectSTyleFromLocalStorage)) {
          const valueColor = objectSTyleFromLocalStorage.backgroundColor;
          const rgbaArray = valueColor.split(",");
          rgbaArray[3] = `100%)`;
          
          const newBG = rgbaArray.join(',');
          subtitleValue.style.backgroundColor = newBG;
        } else {
          subtitleValue.style.backgroundColor = defaultSubtitleSettings.backgroundColor;
        }

        subtitleValue.classList.add('fp-subtitle__value--bg-color');
      } else if(item === 'Прозрачность фона') {
        if (objectSTyleFromLocalStorage) {
          let value = objectSTyleFromLocalStorage.backgroundColorOpacity;

          if (value === '100%') {
            subtitleValue.textContent = '0%'; 
          } else if(value === '80%') {
            subtitleValue.textContent = '20%';
          } else if(value === '60%') {
            subtitleValue.textContent = '40%';
          } else if(value === '40%') {
            subtitleValue.textContent = '60%';
          } else if(value === '20%') {
            subtitleValue.textContent = '80%';
          } else if(value === '0%') {
            subtitleValue.textContent = '100%';
          }
          
        } else {
          subtitleValue.textContent = '0%';
        }
        
        subtitleValue.classList.add('fp-subtitle__value--opacity');
      }

      subtitleButton.appendChild(subtitleLabel);
      subtitleButton.appendChild(subtitleValue);

      listItem.appendChild(subtitleButton);
      list.appendChild(listItem);

      const subList = document.createElement('div');
      subList.classList.add('subtitle-item__menu', 'fp-menu')

      listItem.appendChild(subList);

      if (item === 'Размер текста') {
        const subItems = ['Размер', '75%', '100%', '125%', '175%', '200%'];
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
              'Черный': 'rgba(0, 0, 0, 100%)',
              'Белый': 'rgba(255, 255, 255, 100%)',
              'Красный': 'rgba(198, 41, 28, 100%)',
              'Жёлтый': 'rgba(255, 255, 84, 100%)',
              'Зеленый': 'rgba(134, 219, 100, 100%)',
              'Синий': 'rgba(26, 61, 155, 100%)',
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
              'Черный': 'rgba(0, 0, 0, 100%)',
              'Белый': 'rgba(255, 255, 255, 100%)',
              'Красный': 'rgba(198, 41, 28, 100%)',
              'Жёлтый': 'rgba(255, 255, 84, 100%)',
              'Зеленый': 'rgba(134, 219, 100, 100%)',
              'Синий': 'rgba(26, 61, 155, 100%)',
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
            if (subItem === '100%') {
              subListItem.dataset.opacity = '0%';
            } else if(subItem === '80%') {
              subListItem.dataset.opacity = '20%';
            } else if(subItem === '60%') {
              subListItem.dataset.opacity = '40%';
            } else if(subItem === '40%') {
              subListItem.dataset.opacity = '60%';
            } else if(subItem === '20%') {
              subListItem.dataset.opacity = '80%';
            } else if(subItem === '0%') {
              subListItem.dataset.opacity = '100%';
            }
            
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

      let subtitleStyleItems = document.querySelectorAll('.fp-subtitle__styles');
      for (let i = 0; i < subtitleStyleItems.length; i++) {
        subtitleStyleItems[i].remove();
      }
      defaultSubtitleSettings.backgroundColorOpacity = '100%';
      customSubtitleSettings.fontSize = defaultSubtitleSettings.fontSize;
      customSubtitleSettings.color = defaultSubtitleSettings.color;
      customSubtitleSettings.backgroundColor = defaultSubtitleSettings.backgroundColor;
      customSubtitleSettings.backgroundColorOpacity  = defaultSubtitleSettings.backgroundColorOpacity;
      
      
      createStyleTag(defaultSubtitleSettings);
      saveSettingsSubtitle(defaultSubtitleSettings);

      const valueItems = document.querySelectorAll('.subtitle-item__value');
      valueItems.forEach((item)=>{
        
        if (item.classList.contains('fp-subtitle__value--font-size')) {
          item.textContent = defaultSubtitleSettings.fontSize;
        } else if (item.classList.contains('fp-subtitle__value--color')) {
          item.style.backgroundColor = defaultSubtitleSettings.color;
        } else if (item.classList.contains('fp-subtitle__value--bg-color')) {
          item.style.backgroundColor = defaultSubtitleSettings.backgroundColor;
        } else if (item.classList.contains('fp-subtitle__value--opacity')) {
          item.textContent = '0%';
        }
      });

      const allValueItems = document.querySelectorAll('.subtitle-item__subitem');
      allValueItems.forEach((item) => {
        item.classList.remove('selected');
      });

      allValueItems.forEach(item => {
        if(item.hasAttribute('data-font-size') && item.getAttribute('data-font-size') === defaultSubtitleSettings.fontSize) {
          item.classList.add('selected');
        } else if(item.hasAttribute('data-font-color') && item.getAttribute('data-font-color') === defaultSubtitleSettings.color) {
          item.classList.add('selected');
        } else if(item.hasAttribute('data-background-color') && item.getAttribute('data-background-color') === defaultSubtitleSettings.backgroundColor) {
          item.classList.add('selected');
        }  else if(item.hasAttribute('data-opacity') && item.getAttribute('data-opacity') === '100%') {
          item.classList.add('selected');
        }      
      });
    });


    //клик на элемент для входа во внутреннее меню
    const subtitleItemsBut = document.querySelectorAll('.subtitle-item__but');
    const subtitleItemBack = document.querySelector('.fp-config__subtitle-back');
    const subtitleItemReset = document.querySelector('.fp-config__subtitle-reset');

    //при входе в подменю скрываем "настройки" и "сбросить" добавлением класса hidden
    subtitleItemsBut.forEach((item) => {
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

        setTimeout(() => {
          setConfigHeight('.fp-config__subtitle-list');
          config.style.width = '199px';
        }, 0)
      });
    });

    //клик на любой элемент со значением во внутреннем меню
    const subtitleItems = document.querySelectorAll('.subtitle-item__subitem');

    //при выходе на уровень выше показываем "настройки" и "сбросить" удалением класса hidden
    // у элемента li удаляем active для скрытия списка
    subtitleItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        subtitleItemBack.classList.remove('hidden');
        subtitleItemReset.classList.remove('hidden');
        item.parentNode.parentNode.classList.remove('active');
        config.classList.remove('active');


        const selectedElement = item;
        //удаление класса selected ДО и ПОСЛЕ без перехода на другие уровни и элементы
        // Удаляем класс у всех предыдущих элементов до выбранного
        let prevElement = selectedElement.previousElementSibling;
        while (prevElement) {
          prevElement.classList.remove('selected');
          prevElement = prevElement.previousElementSibling;
        }
        // Удаляем класс у всех следующих элементов после выбранного
        let nextElement = selectedElement.nextElementSibling;
        while (nextElement) {
          nextElement.classList.remove('selected');
          nextElement = nextElement.nextElementSibling;
        }
        // добавляем класс нажатому
        item.classList.add('selected');

        //подстраиваем размеры родителя и конфига
        setTimeout(() => {
          setConfigHeight('.fp-config__subtitle-list');
          config.style.width = '199px';
        }, 0)
      });
    });
    
  }

  createSettingsListDesktop(document.querySelector('.fp-config'));

  //добавление выбранным настройкам selected
  const settingsSubitems = document.querySelectorAll('.subtitle-item__subitem');
  if (objectSTyleFromLocalStorage) {
    settingsSubitems.forEach(item => {
      if(item.hasAttribute('data-font-size') && item.getAttribute('data-font-size') === objectSTyleFromLocalStorage.fontSize) {
        item.classList.add('selected');
      } else if(item.hasAttribute('data-font-color') && item.getAttribute('data-font-color') === objectSTyleFromLocalStorage.color) {
        item.classList.add('selected');
      } else if(item.hasAttribute('data-background-color') && item.getAttribute('data-background-color') === objectSTyleFromLocalStorage.backgroundColor) {
        item.classList.add('selected');
      }  else if(item.hasAttribute('data-opacity') && item.getAttribute('data-opacity') === objectSTyleFromLocalStorage.backgroundColorOpacity) {
        item.classList.add('selected');
      }      
    });
  } else {
    settingsSubitems.forEach(item => {
      if(item.hasAttribute('data-font-size') && item.getAttribute('data-font-size') === defaultSubtitleSettings.fontSize) {
        item.classList.add('selected');
      } else if(item.hasAttribute('data-font-color') && item.getAttribute('data-font-color') === defaultSubtitleSettings.color) {
        item.classList.add('selected');
      } else if(item.hasAttribute('data-background-color') && item.getAttribute('data-background-color') === defaultSubtitleSettings.backgroundColor) {
        item.classList.add('selected');
      }  else if(item.hasAttribute('data-opacity') && item.getAttribute('data-opacity') === defaultSubtitleSettings.backgroundColorOpacity) {
        item.classList.add('selected');
      }      
    });
  }
  

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

    let objectSTyleFromLocalStorage = {};

      if (navigator.cookieEnabled) {
        objectSTyleFromLocalStorage = JSON.parse(localStorage.getItem('settingsSubtitle'));
      } else {
      }
    

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


  // айфоны имеют нативные субтитры. Отключаем настройки, если айфон
  let isiPhone = /iPhone/i.test(navigator.userAgent);
  if (!isiPhone) {
    createSettingsListMobile();
  }

  if (!flowplayer().video.subtitles || !flowplayer().video.subtitles.length) {
    document.querySelector('.fp-config-list__item--font-size').classList.add('fp-hidden');
  }

  // Обработка выбора элементов и зпись их в LS и в customSubtitleSettings - с последющим изменение стилей в теге style
  const settingsSubitemsMobileSelect = document.querySelector('.fp-font-size-select-menu');

  settingsSubitemsMobileSelect.addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
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

    // children - HTMLcollection из всех дочерних элементов
    const children = parent.children;
    let totalHeight = 0;
    
    //суммируем высоту всех элементов
    for (let i = 0; i < children.length; i++) {
      totalHeight += children[i].clientHeight;
    }
    //адаптируем конфиг по повысоте
    config.style.height = totalHeight + "px";
  }

  // функция назначение ширины конфигу в зависимости от ширины потомков
  function setConfigWidth(selector) {
    const config = document.querySelector('.fp-config');
    const parent = document.querySelector(selector);

    // children - HTMLcollection из всех дочерних элементов
    const children = parent.children;
    let maxWidth = 0;
    
    //суммируем высоту всех элементов
    for (let i = 0; i < children.length; i++) {
      if(maxWidth < children[i].clientWidth) {
        maxWidth = children[i].clientWidth;
      }    
    }
    //адаптируем конфиг по повысоте
    config.style.width = maxWidth + "px";
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

  // нажатие на "Размер текста" задает размер внутреннему подменю
  const configButfontSize = document.querySelector('.fp-config-but__font-size');
  configButfontSize.addEventListener('click', () => {
    configButfontSize.nextElementSibling.style.width = '101px';
    
    setTimeout(() => {
      config.style.height = "162px";
      setConfigWidth('.fp-menu');
    }, 0)
  });
  //нажатие на "Цвет текста"
  const configButfontColor = document.querySelector('.fp-config-but__font-color');
  configButfontColor.addEventListener('click', () => {
    configButfontColor.nextElementSibling.style.width = '108px';
    setTimeout(() => {
      config.style.height = "186px";
      config.style.width = "108px";
    }, 0)
  });
  //нажатие на "Цвет фона"
  const configButBackgroundColor = document.querySelector('.fp-config-but__background-color');
  configButBackgroundColor.addEventListener('click', () => {
    configButBackgroundColor.nextElementSibling.style.width = '108px';
    
    setTimeout(() => {
      config.style.height = "186px";
      config.style.width = "108px";
    }, 0)
  });
  //нажатие на "Прозрачность"
  const configButBackgroundOpacity = document.querySelector('.fp-config-but__background-opacity');
  configButBackgroundOpacity.addEventListener('click', () => {
    configButBackgroundOpacity.nextElementSibling.style.width = '121px';
    
    setTimeout(() => {
      config.style.height = "186px";
      config.style.width = "121px";
    }, 0)
  });

  // сохранение объекта с параметрами субтитров в ls
  function saveSettingsSubtitle(settings) {

    if (navigator.cookieEnabled) {
      const settingsString = JSON.stringify(settings);
      localStorage.setItem('settingsSubtitle', settingsString);
    } else {
    }
  }

  // Кастомные настройки субтитров
  // изначально в них записаны дефолтные параметры. 
  // При любом изменении параметров происходит перезапись параметров в объект customSubtitleSettings
  // и далее вызывается функция saveSettingsSubtitle(customSubtitleSettings); - чтобы кастомные параметры сохранить в LS 
  // и вызывается changeStyle(customSubtitleSettings); - чтобы переписать новые параметры в тег style

  //функция получения цвета, изменения прозрачности и присваивания
  function changeBackgroundColor(opacityElement) {
    
    const backgroundColorRGBA = customSubtitleSettings.backgroundColor;
    const opacity = opacityElement.getAttribute('data-opacity')
    const rgbaArray = backgroundColorRGBA.split(",");
    rgbaArray[3] = `${opacity})`;
    
    const newBG = rgbaArray.join(',');
    customSubtitleSettings.backgroundColor = newBG,
    customSubtitleSettings.backgroundColorOpacity = opacity;
    
    

    // при любом изменении  сохраняем объект с найстроками в ls
    saveSettingsSubtitle(customSubtitleSettings);
    // перерисовываем стили
    changeStyle(customSubtitleSettings);
  }

  //все элементы параметров
  settingsSubitems.forEach((item, index) => {
    item.addEventListener('click', function () {

      //проверяем на какой элемент клик  -  переписываем кастомные стили на новые и обновляем значение\цвет.
      if (item.hasAttribute('data-font-size')) {
        customSubtitleSettings.fontSize = item.getAttribute('data-font-size');
        
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').textContent = item.getAttribute('data-font-size');
      } else if (item.hasAttribute('data-font-color')) {
        customSubtitleSettings.color = item.getAttribute('data-font-color');
        
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').style.backgroundColor = item.getAttribute('data-font-color');
      } else if (item.hasAttribute('data-background-color')) {

        if (isEmpty(objectSTyleFromLocalStorage)) {
          let valueColor = item.getAttribute('data-background-color');
          const x = localStorage.getItem('settingsSubtitle');
          let y = JSON.parse(x);
          let opacity2 = y.backgroundColorOpacity; 
          let rgbaArray = valueColor.split(",");
          rgbaArray[3] = `${opacity2})`;
          const newBG = rgbaArray.join(',');
          customSubtitleSettings.backgroundColor = newBG;
        } else {
          customSubtitleSettings.backgroundColor = item.getAttribute('data-background-color');
          let valueColor = item.getAttribute('data-background-color');
          let opacity2 = customSubtitleSettings.backgroundColorOpacity;
          let rgbaArray = valueColor.split(",");
          rgbaArray[3] = `${opacity2})`;
          const newBG = rgbaArray.join(',');
          customSubtitleSettings.backgroundColor = newBG;
        }        
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').style.backgroundColor = item.getAttribute('data-background-color');
      } else if (item.hasAttribute('data-opacity')) {
        
        item.parentNode.parentNode.querySelector('.subtitle-item__but .subtitle-item__value').textContent = item.textContent;

        changeBackgroundColor(item);
      }
      
      // при любом изменении  сохраняем объект с настройками в ls
      saveSettingsSubtitle(customSubtitleSettings);
      // перерисовываем стили
      changeStyle(customSubtitleSettings);
    })
  });

    // изменение стилей при выборе парамтеров
    function changeStyle(objectStyle) {
      const styleTag = document.querySelector('.fp-subtitle__styles');
      styleTag.innerHTML = 
      `.fp-captions p{
        font-size:${objectStyle.fontSize};
        color:${objectStyle.color}; 
        background-color:${objectStyle.backgroundColor};}`;
      
      document.body.appendChild(styleTag);
    }; 
}
console.log('script settingsSubtitle is start');
module.exports = settingsSubtitle;
// ---------------------------------------------------

