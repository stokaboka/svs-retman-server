const times = {
    second: 1,
    minute: 60,
    hour: 60 * 60,
    metronom: 1,
};

const phases = [
    {
        step: 1,
        num: 1,
        title: 'Тестирование звука',
        scope: '',
        text: 'Вы можете проверить, правильно ли воспроизводится звук, нажав клавишу "звуковой тест"',
        sounds: 'audiocheck.net_L.ogg#audiocheck.net_R.ogg',
        mode: 'CYCLE',
        time: 0,
        next: 1,
        stages: 0,
        pages: 0,
        component: 'TestSoundComponent',
    },

    // ----------
    {
        num: 1,
        stepId: 2,
        title: 'Описание методики тестирования',
        scope: '',
        briefText: '<p><strong>Проверка начального лексического запаса на английском, французском и немецком языках.</strong></p> ' +
            '<p>Определение лингвистических способностей к усвоению иностранного языка в режиме автоматизированного обучения.' +
            'Процедура тестирования занимает около 2-х часов.</p>' +
            '<p>Приступайте к работе только в том случае, если Вы уверены, что ничто не будет Вам мешать. ' +
            'Отключите телефон, устраните все другие отвлекающие моменты.</p> ' +
            '<p>Это необходимо сделать потому, что некоторые задания выполняются с контролем затраченного на их выполнение времени.</p>',
        briefSounds: 'cy-inst2fm1.mp3',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

// =======
    {
        num: 1,
        stepId: 3,
        title: 'Мнемонический тест',
        scope: 'mnemic',
        briefText: '<p>Сейчас Вы увидите на экране список из 50-ти пар слов на русском языке. Ваша задача в течении 3-х минут запомнить как можно больше пар.</p>' +
            '<p>Просматривайте список под звук метронома, стараясь мысленно связать ассоциативными связями слова в каждой паре.</p>' +
            '<p>Отмечайте мышкой запомненные пары слов, щелкнув на квадрате между словами одной пары.</p>' +
            '<p>Старайтесь просматривать список в ритме метронома.</p>' +
            '<p>Успехов Вам!</p>',
        briefSounds: 'cy-inst5_1.mp3#cy-inst5_1fm.mp3',
        briefModeSounds: 'RANDOM',
        briefTime: 0,
        testText: '',
        testSounds: 'metronom.mp3',
        testModeSounds: 'CYCLE',
        testNextBtn: 0,
        testTime: times.minute * 3,
        stages: 0,
        pages: 0,
    },

    {
        num: 2,
        stepId: 3,
        title: 'Контроль - мнемонический тест',
        scope: 'mnemic',
        briefText: '<p>Просмотрите список еще раз.</p>' +
            '<p>Восстановите правую часть списка (дополните пары), перетаскивая нужные слова с помощью мыши.</p>' +
            '<p>Если вы ошиблись очистите перенесенное слово кликнув Х</p>' +
            '<p>На это Вам отводится 10 мин. - если закончите раньше, нажмите кнопку "Продолжить".</p>',
        briefSounds: '',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: 'metronom.mp3',
        testModeSounds: 'CYCLE',
        testNextBtn: 1,
        testTime: times.minute * 10,
        stages: 0,
        pages: 0,
    },

    /**
     * TODO прописать количество запомненных пар слов
     */
    {
        num: 3,
        stepId: 3,
        title: 'Предъявление/интерпретация результатов - мнемонический тест',
        scope: 'Приложение 2',
        briefText: '<p>Из 50 предъявленных пар слов вы отметили  <strong>{{CHECKED}}</strong> и запомнили  <strong>{{REMEMBERED}}</strong> пар</p>  <p><strong>{{RECOMMENDATION}}</strong></p>',
        briefSounds: '',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 1,
        stepId: 4, // Определение языка пробного обучения
        title: 'Самооценка речевых навыков в общенении на английском, немецком и французском языках',
        scope: 'Приложении 3',
        briefText: '<p>Вы видите пример шкалы самооценки речевых навыков общения на иностранном языке.</p> ' +
            '<p>Нас интересует, как Вы сами оцениваете свои возможности по общению, то есть, пониманию речи на слух и выражению своих мыслей в беседе.</p> ' +
            '<p>На следующей странице Вам надо выбрать тот уровень, которым Вы владеете в данный момент. ' +
            'Можете указать несколько уровней.</p> ',
        briefSounds: 'cy-inst6_1fm.mp3#cy-inst6_1.mp3',
        briefModeSounds: 'RANDOM',
        briefTime: 0,
        testText: 'Тестируемый должен оценить свои навыки общения для трех языков (английский/ немецкий/ французский)',
        testSounds: '',
        testModeSounds: 'CYCLE',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 2,
        stepId: 4, // Определение языка пробного обучения
        title: 'Контроль – оценка начального лексического запаса',
        scope: 'vocabulary',
        briefText: '<p>Сейчас Вам будет предъявлено по 25 слов на английском, немецком и французском языках. ' +
            'Постарайтесь перевести на русский язык все известные вам слова.</p> ' +
            '<p>Внимательно просмотрите списки на всех трех языках, даже если какие либо из них Вы не изучали. В тестах есть такие интернациональные слова, которые Вам наверняка знакомы.</p> ' +
            '<p>Ваша задача - выбрать правильный перевод каждого слова и переместить его на прямоугольник справа от иностранного слова.</p>  ' +
            '<p>Если Вы сомневаетесь в правильности подставленного значения слова, щелкните мышкой по знаку вопроса слева от иностранного слова.</p> ' +
            '<p>По результатам этого теста мы определим язык пробного обучения.</p> ',
        briefSounds: 'cy-inst7_1fm.mp3#cy-inst7_1.mp3',
        briefModeSounds: 'RANDOM',
        briefTime: 0,
        testText: '<p>Слова из правого столбца перетаскиваются в левый столбец.</p>' +
            '<p>Если вы ошиблись очистите перенесенное слово кликнув Х</p>',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 3,
        stepId: 4, // Определение языка пробного обучения
        title: 'Предъявление/интерпретация результатов',
        scope: 'vocabulary',
        briefText:  'Результаты не объявляются -  сразу объявляется язык обучения.  ' +
            '<p><strong>{{LANGUAGE_NAME_1}}</strong></p> ' +
            'Последовательность выбора языка тестирования при одинаковых значениях : английский, немецкий, французский  ',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 1,
        stepId: 5, // Входной тест знания лексики языка пробного обучения
        title: 'Самооценка',
        scope: 'vocabulary::learn',
        briefText:  '<p>Сейчас Вам будут предъявлены 100 слов <strong>{{LANGUAGE_NAME_2}}</strong> языка.</p> ' +
            '<p>Показ будет сопровождаться звуками метронома.  ' +
            'Вам нужно будет внимательно просмотреть весь список, стараясь просматривать слова в ритме метронома. ' +
            'Отмечайте каждое иностранное слово, значение которого вы знаете, нажатием на клавишу "ПРОБЕЛ"</p> ',
        briefSounds: '',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: 'metronom.mp3',
        testModeSounds: 'CYCLE',
        testNextBtn: 0,
        testTime: times.second * times.metronom * 100,
        stages: 0,
        pages: 0,
    },

    {
        num: 2,
        stepId: 5, // Входной тест знания лексики языка пробного обучения
        title: 'Контроль',
        scope: 'vocabulary::learn',
        briefText:
            '<p>Вам предстоит вновь просмотреть список из 100 слов.</p> ' +
            '<p>Из колонок слов на русском языке, расположенных справа, последовательно  ' +
            'выбирайте соответствующие значения для <strong>{{LANGUAGE_NAME_3}}</strong> слов (слева) и, с помощью мыши, перетаскивайте их на прямоугольники.</p> ' +
            '<p>Одним словом, расположите слово и его перевод напротив друг друга. ' +
            'Работать нужно быстро, так как время на перевод ограничено (10 мин + 10 мин).</p> ',
        briefSounds: '',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: times.minute * 10,
        stages: 0,
        pages: 2,
    },

    {
        num: 3,
        stepId: 5, // Входной тест знания лексики языка пробного обучения
        title: 'Контроль',
        scope: 'vocabulary::learn',
        briefText:
            '<p>Вам предстоит вновь просмотреть список из 100 слов.</p> ' +
            '<p>Из колонок слов на русском языке, расположенных справа, последовательно  ' +
            'выбирайте соответствующие значения для <strong>{{LANGUAGE_NAME_3}}</strong> слов (слева) и, с помощью мыши, перетаскивайте их на прямоугольники.</p> ' +
            '<p>Одним словом, расположите слово и его перевод напротив друг друга. ' +
            'Работать нужно быстро, так как время на перевод ограничено (10 мин + 10 мин).</p> ',
        briefSounds: '',
        briefModeSounds: 'ONCE',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: times.minute * 10,
        stages: 0,
        pages: 2,
    },

    {
        num: 4,
        stepId: 5, // Входной тест знания лексики языка пробного обучения
        title: 'Предъявление/интерпретация результатов',
        scope: '',
        briefText: '<p>Из 100 предъявленных пар слов вы отметили <strong>{{CHECKED}}</strong> и запомнили <strong>{{REMEMBERED}}</strong> пар</p>',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 1,
        stepId: 6, // Влияние аутотренинга на интенсивность обучения
        title: 'Самооценка 1',
        scope: '',
        briefText:
            'Подумайте и оцените следующие параметры Вашего состояния: самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: 'Тестирование совмещено с инструкцией (находятся на одной странице) ' +
            'Тестируемый должен оценить свое состояние на текущий момент (самочуствие, активность, натроение), двигая полозки по трем шкалам. ' +
            'Серидина – норма (нужно пояснение – что такое норма) ' +
            'Нужно пояснение для левых и правых отметок ',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 2,
        stepId: 6, // Влияние аутотренинга на интенсивность обучения
        title: 'Аутотренинг',
        scope: '',
        briefText:
            'Для того чтобы настроиться на эффективную работу во время пробного обучения, ' +
            'предлагаем Вам самостоятельно проделать упражнения по аутогенной тренировке (АТ). ' +
            'Устройтесь поудобнее, устраните все отвлекающие факторы. ' +
            'Внимательно слушайте инструкции, с полной самоотдачей выполняйте упражнения. ' +
            'Длительность АТ- 6 мин 20 сек',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: '',
        testSounds: 'видео ролик ауто тренинга',
        testModeSounds: '',
        testNextBtn: 0,
        testTime: 6 * times.minute + 20 * times.second,
        stages: 0,
        pages: 0,
    },

    {
        num: 3,
        stepId: 6, // Влияние аутотренинга на интенсивность обучения
        title: 'Самооценка 2',
        scope: '',
        briefText:
            'Оцените еще раз параметры вашего состояния: самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: 'Тестирование совмещено с инструкцией (находятся на одной странице) ' +
            'Тестируемый должен оценить свое состояние на текущий момент (самочуствие, активность, натроение), двигая полозки по трем шкалам. ' +
            'Середина – норма (нужно пояснение – что такое норма) ' +
            'Нужно пояснение для левых и правых отметок ',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    {
        num: 4,
        stepId: 6, // Влияние аутотренинга на интенсивность обучения
        title: 'Предъявление/интерпретация результатов',
        scope: '',
        briefText:
            'Тестируемому предъявляюся результаты изменения его самооценки состояния САН ' +
            '( Самочуствие, Активность, Настроение) до и после прохождения типового аутотренинга. ' +
            'Выдаются рекомендации/ заключение?',
        briefSounds: '',
        briefModeSounds: '',
        briefTime: 0,
        testText: '',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

    /**
     * TODO time = -1 время равно длительности всех вложенных уроков
     */
    {
        num: 1,
        stepId: 7, // Пробное обучение – Пассив
        title: 'Самооценка',
        scope: '',
        briefText:
            'Приступаем к пробному обучению. Вам будут предъявлены озвученные тексты на {{LANGUAGE_NAME}} языке с параллельным переводом. ' +
            'Вы должны будете слушать в левом наушнике тексты на {{LANGUAGE_NAME}} языке, а в правом наушнике их перевод. ' +
            'Старайтесь читать текст вместе с диктором вслух или громко повторять за ним. ' +
            'Всего тексты уроков будут предъявлены 4 раза подряд. ' +
            'Общая длительность уроков -  {{STEP_7_TIME}}',
        briefSounds: 'cy-inst10_2fm.mp3#cy-inst10_2.mp3',
        briefModeSounds: 'RANDOM',
        briefTime: 0,
        testText: 'Для английского языка - 45 мин. 39 сек. ' +
            'Для немецкого языка – 20 мин. 06 сек. ' +
            'Для французского языка - 25 мин. 41 сек. ',
        testSounds: '',
        testModeSounds: '',
        testNextBtn: 1,
        testTime: 0,
        stages: 0,
        pages: 0,
    },

];

let out = []

let cNum = 0
let cStep = 0
let cResult = 0

for(let i=0; i < phases.length; i++){
    const phase = phases[i]

    if(i === phases.length-1){
        cResult = 1
    }else{
        cResult = (phases[i+1].stepId === cStep) ? 0 : 1
    }

    if(cStep !== phase.stepId){
        cNum = 0
        cStep = phase.stepId
    }

    if(phase.num === 1 && phase.step === 1){
        out.push(Object.assign({},  phase,
            {
                phase: phase.num,
                num: ++cNum,
                action: 'BRIEF',
                result: 0
                }
            ))
    }else{
        out.push({
            step: phase.stepId,
            phase: phase.num,
            num: ++cNum,
            action: 'BRIEF',
            result: cResult,
            title: phase.title,
            scope: phase.scope,
            text: phase.briefText,
            sounds: phase.briefSounds,
            mode: phase.briefModeSounds,
            time: phase.briefTime,
            next: 1,
            stages: phase.stages,
            pages: phase.pages,
            component: 'InfoComponent',
        })
        if(phase.testText || phase.testSounds || phase.testTime) {
            out.push({
                step: phase.stepId,
                phase: phase.num,
                num: ++cNum,
                action: 'TEST',
                result: cResult,
                title: phase.title,
                scope: phase.scope,
                text: phase.testText,
                sounds: phase.testSounds,
                mode: phase.testModeSounds,
                time: phase.testTime,
                next: phase.testNextBtn,
                stages: phase.stages,
                pages: phase.pages,
                component: '',
            })
        }
    }
}

console.log('private phases =', out)
