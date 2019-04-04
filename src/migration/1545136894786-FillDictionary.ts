import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Cue from '../model/entity/Cue';
import Dictionary from '../model/entity/Dictionary';
import LessonStages from '../model/entity/LessonStages';
import Phases from '../model/entity/Phases';
import Steps from '../model/entity/Steps';

export class FillDictionary1545136894786 implements MigrationInterface {

    private times = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        metronom: 1,
    };

    private fields = {
        dictionary: ['word1', 'word2', 'lang1', 'lang2', 'scope'],
        steps: ['title', 'lessons', 'brief', 'test', 'learning', 'briefText'],
        phases: ['step', 'phase', 'num', 'action', 'result', 'title', 'scope', 'text', 'sounds', 'mode', 'time', 'next', 'stages', 'pages', 'component'],
        lessonStages: ['lang', 'title', 'step', 'lesson', 'stage', 'pages', 'scope', 'sound', 'time'],
        cue: ['file', 'pos'],
    };

    private mnemonic = [
        {word1: 'история', word2: 'арка', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'будущее', word2: 'писать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'мех', word2: 'минута', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'цвет', word2: 'зал', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'почва', word2: 'потеря', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'получать', word2: 'сила', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'ответ', word2: 'пищать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'берег', word2: 'рюмка', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'атом', word2: 'власть', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'медь', word2: 'архив', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},

        {word1: 'цветок', word2: 'мир', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'характер', word2: 'характер', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'сердце', word2: 'сад', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'факт', word2: 'конец', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'один', word2: 'смотреть', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'рука', word2: 'пилот', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'ребенок', word2: 'город', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'орган', word2: 'оружие', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'пила', word2: 'писатель', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'класс', word2: 'близко', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},

        {word1: 'спускать', word2: 'осень', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'базар', word2: 'облако', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'малыш', word2: 'пища', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'бак', word2: 'мебель', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'круг', word2: 'рыба', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'большой', word2: 'машина', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'приходить', word2: 'рассматривать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'кровать', word2: 'сарай', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'появляться', word2: 'нравиться', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'спрашивать', word2: 'план', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},

        {word1: 'разбивать', word2: 'мачта', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'сражение', word2: 'мечта', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'обложка', word2: 'отвечать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'разница', word2: 'уметь', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'принимать', word2: 'окоп', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'тяжелый', word2: 'русло', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'складывать', word2: 'арбуз', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'высокий', word2: 'праздник', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'рассказ', word2: 'экран', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'разделять', word2: 'дело', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},

        {word1: 'явление', word2: 'туман', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'действовать', word2: 'озеро', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'сооружение', word2: 'ходить', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'возраст', word2: 'склад', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'правительство', word2: 'земля', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'преследовать', word2: 'аромат', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'воздух', word2: 'сено', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'основа', word2: 'подарок', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'расти', word2: 'день', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
        {word1: 'туловище', word2: 'балет', lang1: 'RU', lang2: 'RU', scope: 'mnemonic::test'},
    ];

    private vocabulary = [
        {word1: 'boundless', word2: 'безграничный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'bright', word2: 'яркий', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'broadcast', word2: 'радиовещание', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to eat', word2: 'кушать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'family', word2: 'семья', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to fly', word2: 'летать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'fury', word2: 'ярость', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'guilt', word2: 'вина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'heart', word2: 'сердце', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to help', word2: 'помогать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to improve', word2: 'улучшать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to knock', word2: 'стучать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'lush', word2: 'сочный, пышный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to mistrust', word2: 'не доверять', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'mother', word2: 'мать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'poll', word2: 'избирательный участок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to remember', word2: 'помнить', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to shrink', word2: 'отпрянуть', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'to suggest', word2: 'предлагать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'table', word2: 'стол', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'wedge', word2: 'клин', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'whiskers', word2: 'бакенбарды', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'wholesale', word2: 'оптовый', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'worthy', word2: 'достойный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'yes', word2: 'да', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test'},

        {word1: 'ausstahlen', word2: '', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'beleidigung', word2: 'оскорбление', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'blume', word2: 'цветок', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'durst', word2: 'жажда', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'ende', word2: 'конец', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'eintracht', word2: 'согласие', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'eindruck', word2: 'впечатление', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'erlebnis', word2: 'опыт', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'färbe', word2: 'краски', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'flach', word2: 'низкий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'gesicht', word2: 'лицо', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'gut', word2: 'хорошо', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'hehrausgabe', word2: 'выпуск', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'keime', word2: 'росток', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'nachgiebing', word2: 'мягкий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'merkmal', word2: 'примета', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'oft', word2: 'часто', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'poltern', word2: 'падать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'schrift', word2: 'шрифт', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'sich stützen', word2: 'опираться', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'überflüssing', word2: 'ненужный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Vergessen', word2: 'забывать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'wissenshaft', word2: 'знания', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Zukunft', word2: 'будущее', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Zumachen', word2: 'закрывать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test'},

        {word1: 'Appeler', word2: 'звать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Brouillard', word2: 'туман', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Consacrer', word2: 'посвящать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'se débarrasser', word2: 'избавиться, отделаться', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'exagération', word2: 'преувеличение', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Goûter', word2: 'пробовать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Habiter', word2: 'жить (проживать)', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'harponner', word2: 'подцепить, схватить', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Jointure', word2: 'сустав', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Mon', word2: 'мой', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Pacifique', word2: 'Тихий (океан), геогр.', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},

        {word1: 'Pardon', word2: 'Извинение', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'perspicacité', word2: 'проницательность', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Prévoyant', word2: 'предусмотрительный', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {
            word1: 'Profiter',
            word2: 'пользоваться, извлекать пользу',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'vocabulary::test',
        },
        {word1: 'Rangée', word2: 'Ряд, строй', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'récrimination', word2: 'упрек, обвинение', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Reculer', word2: 'отодвигать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'Récuser', word2: 'отвергать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'sauver', word2: 'спасать', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'sciemment', word2: 'заведомо, умышленно', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},

        {word1: 'solvable', word2: 'платежеспособный', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'succulent', word2: 'сочный, вкусный', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'se tromper', word2: 'ошибаться', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},
        {word1: 'ville', word2: 'город', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test'},

        {word1: 'again', word2: 'снова', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'airport', word2: 'аэропорт', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'also', word2: 'также', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'animal', word2: 'животное', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'apples', word2: 'яблоки', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'bag', word2: 'сумка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'big', word2: 'большой', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'book', word2: 'книга', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'box', word2: 'коробка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'boy', word2: 'мальчик', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'brother', word2: 'брат', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'building', word2: 'здание', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'bus', word2: ' автобус', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'car', word2: 'машина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'cat', word2: 'кот', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'child', word2: 'ребенок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'cousin', word2: 'Двоюродный брат', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'daughter', word2: 'дочь', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'dog', word2: 'собака', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'family', word2: 'семья', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'father', word2: 'отец', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'field', word2: 'поле', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'figure', word2: 'цифра', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'flower', word2: ' цветок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'friend', word2: ' друг', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'garden', word2: 'сад', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'girl', word2: 'девочка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'glass', word2: 'Стакан,стекло', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'gloves', word2: 'перчатки', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'good', word2: 'хороший', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'guide', word2: 'гид', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'hat', word2: 'шляпа', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'he', word2: 'он', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'her', word2: 'ее', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'his', word2: 'его', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'horse', word2: 'лошадь', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'hospital', word2: 'больница', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'house', word2: 'дом', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'husband', word2: 'муж', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'I', word2: 'я', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'leg', word2: 'нога', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'letters', word2: 'письма', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'line', word2: 'Линия, очередь', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'man', word2: 'мужчина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'master', word2: 'господин', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'metal', word2: 'метал', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'morning', word2: 'утро', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'mother', word2: 'мать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'my', word2: 'мой', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'name', word2: 'имя', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},

        {word1: 'no', word2: 'нет', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'old', word2: 'старый', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'oranges', word2: 'апельсины', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'paper', word2: 'бумага', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'pen', word2: 'ручка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'pencil', word2: 'карандаш', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'person', word2: 'чаловек', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'picture', word2: 'картина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'point', word2: 'Пункт, точка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'right', word2: 'Право, правильно', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'rubber', word2: 'резина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'school', word2: 'школа', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'she', word2: 'она', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ships', word2: 'корабли', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'shoes', word2: 'обувь', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'shops', word2: 'магазины', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'sister', word2: 'сестра', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'sock', word2: 'носок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'son', word2: 'сын', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'stamp', word2: 'марка', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'step', word2: 'шаг', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'stocking', word2: 'чулок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'stone', word2: 'камень', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'student', word2: 'студент', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'table', word2: 'стол', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'tall', word2: 'высокий', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'teacher', word2: 'учитель', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'that', word2: 'тот', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'their', word2: 'их', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'there', word2: 'там', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'thing', word2: 'вещь', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'think', word2: 'думать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'this', word2: 'это', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'those', word2: 'те', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ticket', word2: 'билет', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'too', word2: 'тоже', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'train', word2: 'поезд', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'tram', word2: 'трамвай', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'tree', word2: 'дерево', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'very', word2: 'очень', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'wall', word2: 'стена', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'what', word2: 'что', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'wheels', word2: 'колеса', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'who', word2: 'кто', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'wife', word2: 'жена', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'window', word2: 'окно', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'woman', word2: 'женщина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'yes', word2: 'да', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'you', word2: 'ты', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'your', word2: 'твой', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},

        {word1: 'äugen', word2: 'глаза', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'bank ', word2: 'скамья', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'bäum', word2: 'дерево', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'beine', word2: 'нога', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Beschreibung', word2: 'описание', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Besteck', word2: 'столовые приборы', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Bett', word2: 'кровать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Bitte', word2: 'пожалуйста', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Blaß', word2: 'бледный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Braun', word2: 'коричневый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Brat', word2: 'жарить', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Butter', word2: 'масло', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Danke', word2: 'спасибо', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Das', word2: 'артикль', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Decke', word2: 'одеяло', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Dort', word2: 'там', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Eitern', word2: 'гноиться', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Esel', word2: 'осел', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Essig', word2: 'уксус', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Familie', word2: 'семья', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Fettig', word2: 'жирный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Frau', word2: 'женщина', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Fräulein', word2: 'мисс', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Frisch', word2: 'свежий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Fuße', word2: 'нога', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Gabel', word2: 'вилка', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Garten', word2: 'сад', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Gerade', word2: 'просто', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Glas', word2: 'стекло', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Glatt', word2: 'гладкий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Gleich', word2: 'равный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Haare', word2: 'волосы', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Hände', word2: 'руки', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Haus', word2: 'дом', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Heißen', word2: 'обозначать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Herr', word2: 'мистер', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Hier', word2: 'здесь', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Hund', word2: 'собака', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Ist', word2: 'является', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Katze', word2: 'кошка', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Kennen', word2: 'знать', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Kinder', word2: 'дети', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Klein', word2: 'небольшой', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Kommt', word2: 'приходит', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Lampe', word2: 'лампа', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Lang', word2: 'долго', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Leider', word2: 'к сожалению', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Lernen', word2: 'учиться', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Löffel', word2: 'ложка', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Messer', word2: 'нож', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},

        {word1: 'Mund', word2: 'рот', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Mutter', word2: 'мама', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Nase', word2: 'нос', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Nebenan', word2: 'по соседству', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Nein', word2: 'нет', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Oben', word2: 'наверху', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Ohren', word2: 'уши', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Öl', word2: 'масло', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Pfeffer', word2: 'перец', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Pferd', word2: 'лошадь', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Rasen', word2: 'трава', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Rosig', word2: 'розовый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Rund', word2: 'круглый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Salzig', word2: 'соленый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Sauer', word2: 'кислый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Schlank', word2: 'тонкий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Schmal', word2: 'узкий ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Schrank', word2: 'шкаф', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Schüssel', word2: 'чаша ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Schwarz', word2: 'черный ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Sessel', word2: 'стул', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Sie', word2: 'Вы', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Sohn', word2: 'сон', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Spiegel', word2: 'зеркало', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'stim', word2: '', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Straße', word2: 'улица', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Strauch', word2: 'куст', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Studiert', word2: 'образованный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Stuhl', word2: 'стул', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Süß', word2: 'сладкий', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Lasse', word2: 'позволять', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Teller', word2: 'плита', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Tier', word2: 'животное', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Tisch', word2: 'стол', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Tischdecke', word2: 'скатерть', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Tochter', word2: 'дочь', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Treiben', word2: 'заниматься', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Und', word2: 'и', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Vater', word2: 'отец ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Vogel', word2: 'птица', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Wangen', word2: 'щеки ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Was', word2: 'что', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Weiß', word2: 'белый', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Wieder', word2: 'снова', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Wo', word2: 'где', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Wohnung', word2: 'квартира ', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Zähne', word2: 'зубы', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Zaun', word2: 'забор', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Zierlich', word2: 'изящный', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'Zimmer', word2: 'комната', lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn'},

        {word1: 'absent', word2: 'отсутствующий ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'alors', word2: 'итак, тогда ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'un ami', word2: 'друг ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'assis', word2: 'сидящий ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'autre', word2: 'другой, другая ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'beau', word2: 'красивый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'belle', word2: 'красивая ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la bouche', word2: 'рот ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le cahier', word2: 'тетрадь ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {
            word1: 'la campagne',
            word2: 'Загород, сельская местность ',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'vocabulary::learn',
        },
        {word1: 'carré', word2: 'квадратный, четырехугольный ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ce', word2: 'этот ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ce sont', word2: 'это есть… (для множ числа) ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'c’est', word2: 'это есть… (для ед.ч) ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'cette', word2: 'эта ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {
            word1: 'cet',
            word2: 'этот (для слов начинающихся на гласную букву) ',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'vocabulary::learn',
        },
        {word1: 'la chaise', word2: 'стул ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la chance', word2: 'шанс ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la chambre', word2: 'Комната (спальня) ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'charme', word2: 'шарм ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'chercher', word2: 'искать ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le cheveu', word2: 'волос ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le chien', word2: 'собака ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'content', word2: 'довольный ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la couleur', word2: 'цвет ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le crayon', word2: 'карандаш ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'dans', word2: 'в ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'demain', word2: 'завтра ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'derrière', word2: 'за ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'devant', word2: 'перед ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le disque', word2: 'диск ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'elle', word2: 'она ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'enfant', word2: 'ребенок ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ensemble', word2: 'вместе ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'et', word2: 'и ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {
            word1: 'une étagère',
            word2: 'этажерка, полка, стеллаж ',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'vocabulary::learn',
        },
        {word1: 'faire', word2: 'делать ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'une famille', word2: 'семья ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'une femme', word2: 'женщина, жена ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la fenêtre', word2: 'окно ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le fiancé', word2: 'жених ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'une fille', word2: 'девочка, дочь ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le fils', word2: 'сын ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'fort', word2: 'сильный ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le front', word2: 'лоб, передняя часть ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'gai', word2: 'веселый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'un garçon', word2: 'мальчик ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'gentil', word2: 'милый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'grand', word2: 'большой ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'haut', word2: 'высокий ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},

        {word1: 'un homme', word2: 'мужчина ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {
            word1: 'il y a',
            word2: 'есть, имеется, находится (оборот для обстоятельства места) ',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'vocabulary::learn',
        },
        {word1: 'intelligente', word2: 'умная ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'je', word2: 'я ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'jeune', word2: 'Молодой, молодая ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'joli', word2: 'красивый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'laid', word2: 'уродливый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'a l’école', word2: 'в школе ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le livre', word2: 'книга ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'mais', word2: 'но, а', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la maison', word2: 'дом ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le menton', word2: 'подбородок ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le meuble', word2: 'мебель ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'mon', word2: 'мой ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'monsieur', word2: 'месье ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le mur', word2: 'стена ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le nez', word2: 'нос ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'noir', word2: 'черный ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le nom', word2: 'фамилия', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'oui', word2: 'да ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'où', word2: 'где ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le papier', word2: 'бумага ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'pardon', word2: 'извинение ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'paresseux', word2: 'ленивый ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'parfait', word2: 'замечательный ', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le père', word2: ' отец', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le phono', word2: '?? фонограф', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la photo', word2: 'фотография', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le plafond', word2: 'потолок', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le plancher', word2: 'рол', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'pointu', word2: 'острый, резкий', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la porte', word2: 'дверь', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'pour le moment', word2: 'для…', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'raison', word2: 'причина', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le service', word2: 'услуга', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la soeur', word2: 'сестра', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le sourcil', word2: 'бровь', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'sur', word2: 'на', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la table', word2: 'стол', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le tableau', word2: 'Картина, таблица', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'le tapis', word2: 'ковер', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'très', word2: 'очень', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'tu', word2: 'Ты', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'ce que c\'est?', word2: 'что это?', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'quelques', word2: 'некоторые', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'qui', word2: 'кто, который', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'vieux', word2: 'старый', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'voie', word2: 'дорога, путь', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'la voiture', word2: 'машина, автомобиль', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
        {word1: 'vous', word2: 'вы', lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn'},
    ];

    private lessons = [
        {word1: '- This is a telephone.', word2: '- Это телефон.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a glass.', word2: '- Это стакан.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a dog.', word2: '- Это собака.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a cat.', word2: '- Это кот.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What is this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a telephone.', word2: '- Это телефон.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What is this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a glass.', word2: '- Это стакан.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What’s this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a dog.', word2: '- Это собака.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What’s this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is a cat.', word2: '- Это кот.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What’s this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- This is an animal.', word2: '- Это животное.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What is that?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- That is a park.', word2: '- Это парк.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What is that?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- That is a window.', word2: '- Это окно.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What’s that?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- That’s a tree.', word2: '- Это дерево.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},

        {word1: '- What’s that?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- That’s an office.', word2: '- Это офис.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- These are telephones.',
            word2: '- Это телефоны.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- These are glasses.', word2: '- Это стаканы.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- These are dogs', word2: '- Это собаки.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- These are cats.', word2: '- Это коты.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- These are animals.', word2: '- Это животные.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Those are parks.', word2: '- Это парки.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Those are windows.', word2: '- Это окна.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Those are trees.', word2: '- Это деревья.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Those are cars.',
            word2: '- Это легковые машины.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },

        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Those are offices.', word2: '- Это офисы.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- These are cars and buses.',
            word2: '- Это легковые машины и автобусы.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- What are those?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Those are trees and flowers.',
            word2: '- Это деревья и цветы.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- What are these?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- These are points, lines and figures.',
            word2: '- Это точки, линии и фигуры.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },

        {word1: '- Is this a telephone?', word2: '- Это телефон?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, this is a telephone.',
            word2: '- Да, это телефон.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is this a book?', word2: '- Это книга?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, this is not a book.',
            word2: '- Нет, это не книга.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is this a hospital?', word2: '- Это больница?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, this isn’t a hospital.',
            word2: '- Нет, это не больница.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is that a school?', word2: '- Это школа?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, that’s a school.',
            word2: '- Да, это школа.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is that an airport?', word2: '- Это аэропорт?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, that is not an airport.',
            word2: '- Нет, это не аэропорт.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is that a field?', word2: '- Это поле?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No that isn’t a field.',
            word2: '- Нет, это не поле.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is that a flower?', word2: '- Это цветок?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No that’s not a flower.',
            word2: '- Нет, это не цветок.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Are these ships?', word2: '- Это пароходы?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, these are ships.',
            word2: '- Да, это пароходы.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Are these guides?', word2: '- Это проводники?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, these are not guides.',
            word2: '- Нет, это не проводники.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Are these horses?', word2: '- Это кони?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, these aren’t horses.',
            word2: '- Нет, это не кони.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

        {word1: '- Are those reports?', word2: '- Это отчёты?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, those are reports.',
            word2: '- Да, это отчёты.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Are those shops?', word2: '- Это магазины?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, those are not shops.',
            word2: '- Нет, это не магазины.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Are those stones?', word2: '- Это камни?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, those aren’t stones.',
            word2: '- Нет, это не камни.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is that a book?', word2: '- Это книга?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, that’s not a book.',
            word2: '- Нет, это не книга.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- That’s a box.', word2: '- Это коробка.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Are these letters?', word2: '- Это письма?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, these aren’t letters.',
            word2: '- Нет, это не письма.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- These are tickets.', word2: '- Это билеты.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Are those pictures?', word2: '- Это картины?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, those aren’t pictures.',
            word2: '- Нет, это не картины.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Those are letters.', word2: '- Это письма.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Is this a train?', word2: '- Это поезд?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- No, this isn’t a train.',
            word2: '- Нет, это не поезд.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- This is a tram.', word2: '- Это трамвай.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- What is that?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- That’s a building.', word2: '- Это здание.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},

        {word1: '- And what are those?', word2: '- А это что?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Those are windows.', word2: '- Это окна.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Is that a wall?', word2: '- Это стена?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, that’s, a wall.',
            word2: '- Да, это стена.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Aren’t those steps?',
            word2: '- Разве это не ступеньки?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Yes, those are steps.',
            word2: '- Да, это ступеньки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- What is this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- This is a letter.', word2: '- Это письмо.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- And what are these?', word2: '- А это что?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- These are cards and papers.',
            word2: '- Это карты и газеты.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Is this a book?', word2: '- Это книга?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Yes, this is a book.',
            word2: '- Да, это книга.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Aren’t these stamps?',
            word2: '- А это разве не марки?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- No, these aren’t stamps.',
            word2: '- Нет, это не марки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Is this a pen or a pencil?',
            word2: '- Это ручка или карандаш?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- This is a pencil and that is a pen.',
            word2: '- Это карандаш, а это ручка.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Is that a dog or a cat?   ',
            word2: '- Это собака или кот?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- That is a cat but that is a dog.',
            word2: '- Это кот, а это собака.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

        {
            word1: '- These are apples, but those are oranges.',
            word2: '- Это яблоки, а это апельсины.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Are those socks or stockings?',
            word2: '- Это носки или чулки?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Those are socks and those are stockings.',
            word2: '- Это носки, а это чулки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Is this rubber or metal?',
            word2: '- Это резина или металл?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- This is metal, but that is rubber.',
            word2: '- Это металл, а это резина.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Is that plastic or glass?',
            word2: '- Это пластмасса или стекло?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- That is plastic and this is glass.',
            word2: '- Это пластмасса, а это стекло.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

        {word1: '- What’s this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- This is a thing.', word2: '- Это предмет.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- And what are these?', word2: '- А это что?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- These are things, too.',
            word2: '- Это тоже предметы.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {
            word1: '- But these aren’t things.',
            word2: '- А это не предметы.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- No, these are persons.',
            word2: '- Нет, это люди.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {
            word1: '- And aren’t those persons?',
            word2: '- А разве это не люди?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Yes, those are persons, too.',
            word2: '- Да, это тоже люди.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {word1: '- Who is this?', word2: '- Кто это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This is my cousin.',
            word2: '- Это мой двоюродный брат.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {word1: '- Who is that?', word2: '- Кто это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- That’s his sister.', word2: '- Это его сестра.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},

        {word1: '- And who’s that?', word2: '- А это кто?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- That’s her son.', word2: '- Это её сын.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- Who are those?', word2: '- Кто это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- Those are his brothers.',
            word2: '- Это его братья.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- And who’s this?', word2: '- А это кто?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- This is their father.', word2: '- Это их отец.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- And who’s that?', word2: '- А это кто?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {word1: '- That’s his mother.', word2: '- Это его мать.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},

        {word1: '- Is this your hat?', word2: '- Это ваша шляпа?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- Yes, this is my hat.',
            word2: '- Да, это моя шляпа.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Are these your gloves?',
            word2: '- Это ваши перчатки?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- No, these aren’t my gloves.',
            word2: '- Нет, это не мои перчатки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- These are her gloves.',
            word2: '- Это ее перчатки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Is this her bag or is this your bag?',
            word2: '- Это её сумка или ваша сумка?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- This is her bag.', word2: '- Это её сумка.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This isn’t my bag.',
            word2: '- Это не моя  сумка.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- And what are these?', word2: '- А это что?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- These are my stockings.',
            word2: '- Это мои чулки.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Are these your shoes?',
            word2: '- Это ваши туфли?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- No, these aren’t my shoes.',
            word2: '- Нет, это не мои туфли.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- These are his shoes.',
            word2: '- Это его туфли.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- Who are these?', word2: '- Кто это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- These are our friends.',
            word2: '- Это наши друзья (приятели).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Aren’t those your friends, too?',
            word2: '- А разве это не тоже ваши друзья?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- No, those aren’t my friends.',
            word2: '- Нет, это не мои друзья.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Those are my cousins.',
            word2: '- Это мои двоюродные братья/сестры.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {word1: '- And who’s this?', word2: '- А это кто?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This is my teacher.',
            word2: '- Это мой учитель.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- Who are those?', word2: '- Кто это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- Those are his students.',
            word2: '- Это его студенты.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Aren’t those your colleagues?',
            word2: '- А разве это не ваши коллеги?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Oh, yes, those are my     colleagues.',
            word2: '- О, да, это мои коллеги.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- What is this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This is a table and this is its leg.',
            word2: '- Это стол, а это его ножка.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- And what is that?', word2: '- А это что?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- That’s a dog and that’s its owner.',
            word2: '- Это собака, а это её хозяин.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- What is this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This is a child and this is its father.',
            word2: '- Это ребёнок, а это его отец.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- What’s this?', word2: '- Что это?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- This is a car and these are its wheels.',
            word2: '- Это машина, а это её колёса.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },

        {word1: '- Is this your house?', word2: '- Это ваш дом?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- Yes, this is my house.',
            word2: '- Да, это мой дом.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Isn’t this your garden?',
            word2: '- А разве это не ваш сад?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Yes, this is my garden.',
            word2: '- Да, это мой сад.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- Is this your wife?', word2: '- Это ваша жена?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- Yes, this is my wife.',
            word2: '- Да, это моя жена.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- And who are these girls?',
            word2: '- А кто эти девочки?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- These girls are my daughters.',
            word2: '- Эти девочки мои дочери.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Are those boys your sons?',
            word2: '- Эти мальчики ваши сыновья?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Yes, those boys are my sons.',
            word2: '- Да, эти мальчики мои сыновья.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- And is this your dog?',
            word2: '- А это ваша собака?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {
            word1: '- Yes, this is my dog.',
            word2: '- Да, это моя собака.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- Is this your car?', word2: '- Это ваша машина?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},
        {
            word1: '- No, this isn’t my car.',
            word2: '- Нет, это не моя машина.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::3',
        },
        {word1: '- That is my car.', word2: '- Моя машина та.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3'},

        {
            word1: '- Good morning. I am Mary. Who are you?',
            word2: '- Доброе утро. Я - Мария. А вы кто?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Good morning. I’m Tom. And this is Michael.',
            word2: '- Доброе утро. Я - Том. А это Михаил.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Is Michael your brother?',
            word2: '- Михаил твой брат?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- No, he isn’t my brother. He’s my friend. A very good friend.',
            word2: '- Нет, он не мой брат. Он мой друг. Очень хороший друг.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- I’m a student. Are you also a student, Tom?',
            word2: '- Я - студентка. Ты тоже студент, Том?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- Yes, I am.', word2: '- Да.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- And Michael is also a student, I think?',
            word2: '- А Михаил, наверное, тоже студент?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Yes, he is. What’s your subject, Mary?',
            word2: '- Да, он студент. Что ты изучаешь, Мария?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- My subject is chemistry.',
            word2: '- Я изучаю химию (досл.: Мой предмет - химия).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- And my subject is political economy.',
            word2: '- А я изучаю политическую экономику. (А мой предмет - это политэкономика).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },

        {
            word1: '- And what’s your subject, Michael?',
            word2: '- А ты что изучаешь. Михаил?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- My subject is history.',
            word2: '- Я изучаю историю.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- History is very interesting.',
            word2: '- История - очень интересный предмет.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Isn’t political economy interesting, too?',
            word2: '- Разве политическая экономика не такой же интересный предмет?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Oh, yes, it is.',
            word2: '- О, да (очень интересный).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- What’s your last name, please?',
            word2: '- Ваша фамилия, пожалуйста?  (Как ваша фамилия?).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- My last name’s Compton.',
            word2: '- Моя фамилия Комптон.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- Who is that man?', word2: '- Кто этот мужчина?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- He’s Mr. Hunter.',
            word2: '- Это господин Хантер.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- What’s he?', word2: '- Кто он такой?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {word1: '- He’s an officer.', word2: '- Он - офицер.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- Is that tall woman his wife?',
            word2: '- А эта высокая женщина его жена?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- No, she isn’t. She’s Mrs. Pitman.',
            word2: '- Нет. Это госпожа Питман.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- What’s she?', word2: '- Кто она такая?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- She’s a nurse.',
            word2: '- Она - медицинская сестра.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- What’s her husband?', word2: '- А кто её муж?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- Her husband’s a postman.',
            word2: '- Её муж почтальон.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },

        {
            word1: '- And this is Dr. Brown, I think.',
            word2: '- А это, наверное, доктор Браун.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- That’s right. This lady is Dr. Brown.',
            word2: '- Правильно. Эта женщина - доктор Браун.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Is that old gentleman her husband?',
            word2: '- Этот пожилой мужчина её муж?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- You’re right. He’s also Dr. Brown.',
            word2: '- Правильно. Он также доктор Браун.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- And those girls and boys are their children, aren’t they?',
            word2: '- А эти девочки и мальчики их дети, не так ли?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- You’re right again.',
            word2: '- Вы опять угадали. (Вы снова правы).',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- A big family. Is Dr. Brown a physician?',
            word2: '- Большая семья. Доктор Браун - врач?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- No, he isn’t. His wife is. He’s a lawyer.',
            word2: '- Нет, он не врач. Его жена - врач. Он - юрист.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },

        {
            word1: '- Who are those two people?',
            word2: '- Кто эти два человека?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- They are Mr. and Mrs. Miller.',
            word2: '- Это господин и госпожа Миллер.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- What are they?', word2: '- Кто они?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {word1: '- They are writers.', word2: '- Они писатели.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- Is that young man their son?',
            word2: '- Этот молодой человек их сын?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- Yes, he is.', word2: '- Да.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {word1: '- What is he?', word2: '- Кто он?', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {word1: '- He’s a journalist.', word2: '- Он журналист.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- And who’s that elegant woman?',
            word2: '- А кто эта элегантная женщина?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- She is Miss Miller.',
            word2: '- Это мисс Миллер.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Miss Miller is a painter, I think?',
            word2: '- Мисс Миллер, кажется, художница?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Yes, she is a famous painter. Her pictures are very good.  ',
            word2: '- Да, она известная художница. Её картины очень хорошие.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- This is Mr. Sharp, my friend.',
            word2: '- Это господин Шарп, мой приятель.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- And this is my teacher, Mr. Bell.',
            word2: '- А это мой учитель, господин Бел.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },

        {
            word1: '- How do you do, Mr. Bell?',
            word2: '- Здравствуйте, господин Белл.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- How do you do, Mr. Sharp?',
            word2: '- Здравствуйте, господин Шарп.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Is Mrs. Florence Sharp your wife?',
            word2: '- Госпожа Флоренс Шарп ваша жена (супруга)?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Yes, Mrs. Florence Sharp is my wife.',
            word2: '- Да, госпожа Флоренс Шарп - моя жена.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Is that your school, Mr. Bell?',
            word2: '- Это ваша школа, господин Белл?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- Yes, it is.', word2: '- Да.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},
        {
            word1: '- And those small boys and girls are your pupils, I think.',
            word2: '- А эти маленькие мальчики и девочки, кажется, ваши ученики?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- You’re right. They’re my pupils.',
            word2: '- Вы правы. Это мои ученики.',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {
            word1: '- Are they good pupils?',
            word2: '- Они хорошие ученики?',
            lang1: 'EN',
            lang2: 'RU',
            scope: 'test::lesson::4',
        },
        {word1: '- Yes, they are.   ', word2: '- Да.', lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4'},

// DE L 1
        {word1: '- Das ist ein Zimmer.', word2: '- Это комната.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Tisch.', word2: '- Это стол.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Stuhl.', word2: '- Это стул.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Sessel.', word2: '- Это кресло.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Schrank.', word2: '- Это шкаф.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Bett.', word2: '- Это кровать.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist eine Decke.', word2: '- Это покрывало.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist eine Lampe.', word2: '- Это лампа.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist eine Bank.', word2: '- Это скамья.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Spiegel.', word2: '- Это зеркало.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},

        {word1: '- Was ist das?', word2: '- Что это такое?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist eine Straße.', word2: '- Это улица.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Was ist das?', word2: '- Что это такое?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Haus.', word2: '- Это дом.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Was ist das hier?',
            word2: '- Что это здесь такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist ein Garten.', word2: '- Это сад.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Und das?', word2: '- A это?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Das ist ein Baum, und dort ist ein Strauch.',
            word2: '- Это дерево, а там - куст.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },

        {word1: '- Hier ist ein Rasen.', word2: '- Здесь газон.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das ist ein Zaun.', word2: '- Это забор.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Was für ein Tier ist das?',
            word2: '- Что это за животное?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist ein Hund.', word2: '- Это собака.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Und was für ein Tier ist das?',
            word2: '- А это что за животное?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist eine Katze.', word2: '- Это кошка.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Und was ist das da oben?',
            word2: '- А что это там наверху?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist ein Vogel.', word2: '- Это птица.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Ist das ein Pferd?', word2: '- Это лошадь?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Nein, das ist ein Esel.',
            word2: '- Нет, это осел.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Hier ist eine Wohnung.',
            word2: '- Здесь квартира.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Was ist das, bitte?',
            word2: '- Скажите, пожалуйста, что это такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Das ist eine Tischdecke.',
            word2: '- Это скатерть.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Und was ist das hier?',
            word2: '- А здесь что такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist ein Teller.', word2: '- Это тарелка.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Und das ist ein Glas.',
            word2: '- А это стакан.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Und was ist das, bitte?',
            word2: '- Скажите, пожалуйста, а что это?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist eine Tasse.', word2: '- Это чашка.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},

        {
            word1: '- Hier ist ein Besteck:  ein Messer, eine Gabel und ein Löffel.',
            word2: '- Здесь столовые приборы: нож, вилка и ложка.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Danke. Und was ist das dort?',
            word2: '- Спасибо. А что здесь такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das ist eine Schüssel.', word2: '- Это миска.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Die Schüssel ist rund.',
            word2: '- Миска круглая.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Was ist das hier?', word2: '- Что здесь такое?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Das ist Zucker. Der Zucker ist süß.',
            word2: '- Это сахар. Сахар сладкий.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Was ist das hier?',
            word2: '- А что здесь такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Das ist Salz und Pfeffer.',
            word2: '- Это соль и перец.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Das Salz ist salzig.', word2: '- Соль соленая.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Und das hier?', word2: '- А что здесь?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Das ist Essig und Öl.',
            word2: '- Это уксус и растительное масло.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Der Essig ist sauer.', word2: '- Уксус кислый.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Das Öl ist fettig.', word2: '- Масло жирное.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Und was ist das, bitte?',
            word2: '- А это что такое?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Das ist Brot und Butter.',
            word2: '- Это хлеб и масло.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Das Brot ist schwarz, die Butter is frisch.',
            word2: '- Хлеб черный, масло свежее.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Danke!', word2: '- Спасибо!', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},

        {word1: '- Das ist eine Familie.', word2: '- Это семья.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Das ist der Vater, das ist die Mutter.',
            word2: '- Это отец, это мать.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Das sind die Kinder: das ist der Sohn, das ist die Tochter.',
            word2: '- Это дети: это сын, это дочь.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Vater und Mutter sind die Eltern. Sie sind gut.',
            word2: '- Отец и мать - родители. Они хорошие.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Der Vater heißt Herr Kröger. Die Mutter heißt Frau Kröger. Die Geschwister heißen Fritz und Karin Kröger. Sie lernen gut.',
            word2: '- Отца зовут господин Крегер. Мать зовут госпожa Крегер. Брата и сестру зовут Фритц и Карин Крегер. Они учатся хорошо.',
            lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1',
        },
        {
            word1: '- Karin lernt sehr gut.',
            word2: '- Карин учится очень хорошо.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Sie treiben auch Sport.',
            word2: '- Они также занимаются спортом.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },

        // DE L 2
        {
            word1: '- Guten Tag, Frau Kröger!',
            word2: '- Здравствуйте, госпожа Крегер!',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Guten Tag, Frau Nowak, wieder in Berlin?',
            word2: '- Здравствуйте, госпожа Новак, снова в Берлине?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Ja, wieder in Berlin.',
            word2: '- Да, снова в Берлине.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Wo ist Herr Kröger?',
            word2: '- Где господин Крегер?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Er kommt gleich.', word2: '- Он сейчас придет.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Und wo ist Fritz?', word2: '- А где Фритц?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Fritz ist nebenan.', word2: '- Фритц рядом.', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Und wo ist Fräulein Karin?',
            word2: '- А где барышня Карин?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Karin studiert in Moskau. Kennen Sie Karin?',
            word2: '- Карин учится в Москве. Вы знаете Карин?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Nein, leider nicht. Wie ist sie denn?',
            word2: '- Нет, к сожалению, нет. Какая она (из себя)?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Wollen sie eine Beschreibung?',
            word2: '- Вы хотите (ее) описание?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

        // DE L 2 - ???
        {
            word1: '- Die Haare sind blond und glatt.',
            word2: '- Волосы светло-русые и ровные.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Die Augen sind braun. Der Mund ist klein und schmal, die Nase ist gerade.',
            word2: '- Глаза карие. Рот маленький и узкий, нос прямой.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Wie ist die Stirn, wie sind die Ohren?',
            word2: '- Какой у нее лоб, какие уши?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Die Stirn ist hoch, die Ohren sind zierlich.',
            word2: '- Лоб высокий, уши изящные.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Ist sie blaß?', word2: '- Она бледная?', lang1: 'DE', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Nein, die Wangen sind rosig, die Zähne sind weiß.',
            word2: '- Нет, щеки розовые, зубы белые.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Die Hände sind schmal, und die Füße sind klein.',
            word2: '- Руки узкие, а ступни ног маленькие.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Die Beine sind schlank und lang.',
            word2: '- Ноги стройные и длинные.',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Sie ist also schon von Kopf bis Fuß.',
            word2: '- Значит, она красива с головы до ног?',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Ja, das ist sie!',
            word2: '- Да, она красива!  ',
            lang1: 'DE',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

        // FR
        {word1: 'Une famille', word2: 'Семья', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Voici un homme.', word2: '- Вот мужчина.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- C’est monsieur Jacques Vernet.',
            word2: '- Это господин Жак Верне.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Monsieur Jacques Vernet est un homme.',
            word2: '- Господин Жак Верне - мужчина.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Voici une femme.', word2: '- Вот женщина.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- C’est madame Jeanne Vernet.',
            word2: '- Это госпожа Жанна Верне.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Madame Jeanne Vernet est une femme.',
            word2: '- Госпожа Жанна Верне - это женщина.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Voici un garçon. C’est Pierre.',
            word2: '- Вот мальчик. Это Пьер.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Pierre est un garçon.',
            word2: '- Пьер - это мальчик.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Voici une fille.', word2: '- Вот девушка.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},

        {word1: '- C’est Françoise.', word2: '- Это Франсуаза.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Françoise est une fille.',
            word2: '- Франсуаза - это девушка.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- C’est une famille.', word2: '- Это семья.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
// PAGE
        {
            word1: '- Qui est cet homme?',
            word2: '- Кто этот мужчина?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- C’est monsieur Jacques Vernet.',
            word2: '- Это господин Жак Верне.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Et qui est cette dame?',
            word2: '- A кто эта женщина?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- C’est madame Jeanne Vernet.',
            word2: '- Это госпожа Жанна Верне.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Et ce jeune homme?',
            word2: '- A этот молодой человек?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- C’est Jean.', word2: '- Это Жан.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Qui est Jean?', word2: '- Кто такой Жан?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Jean est mon ami.',
            word2: '- Жан - это мой друг.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Et qui est cette jeune fille, là-bas?',
            word2: '- A кто эта молодая девушка.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Cette jeune fille, c’est Francoise.',
            word2: '- Эта молодая девушка - Франсуаза.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- C’est une famille.', word2: '- Это семья.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
// PAGE
        {word1: 'Une chambre', word2: 'Комната', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Voici une chambre.', word2: '- Вот комната.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- C’est une chambre.', word2: '- Это комната.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Et voici des meubles.',
            word2: '- A вот мебель.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Ce sont des meubles.', word2: '- Это мебель.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Qu’est-ce que c’est?', word2: '- Что это?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- C’est une phono, et voici des disques.',
            word2: '- Это проигрыватель, а вот пластинки.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Voici une étagère et des livres.',
            word2: '- Вот этажерка и книги.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Et voici des cahiers, des crayons et des papiers.',
            word2: '- A вот тетради, карандаши и бумага.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Ce sont des cahiers, des crayons   et des papiers.',
            word2: '- Это карандаши, тетради и бумага.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
// PAGE
        {word1: '- Voici une chambre.', word2: '- Вот комната.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- C’est la chambre de Pierre.',
            word2: '- Вот комната Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Voici le plafond, le plancher, les murs, la porte et les fenêtres de la chambre.',
            word2: '- Вот потолок, пол, стены, дверь и окна комнаты.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- C’est le plafond.', word2: '- Это потолок.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- C’est le plancher.', word2: '- Это пол.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Ce sont les murs.', word2: '- Это стены.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},

        {word1: '- C’est la porte.', word2: '- Это дверь.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {word1: '- Ce sont les fenêtres.', word2: '- Это окна.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Voici la table et les livres de Pierre.',
            word2: '- Вот стол и книги Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- C’est la table et ce sont les livres de Pierre.',
            word2: '- Это стол, а это книги Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Et voici une photo. C’est la photo d’André.',
            word2: '- А вот фотография. Это фотография Андрэ.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Qui est André?', word2: '- Кто такой Андрэ?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- André est un ami de Pierre.',
            word2: '- Андрэ - это друг Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
// PAGE
        {
            word1: '- Pierre est dans la chambre.',
            word2: '- Пьер (находится) в комнате.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- C’est la chambre de Pierre.',
            word2: '- Это комната Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Dans la chambre, il y a une table, une étagère, et quelques chaises.',
            word2: '- В комнате имеется стол, полка и несколько стульев.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },

        {
            word1: '- Sur le plancher, il y a un tapis.',
            word2: '- На полу (имеется) ковёр.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Sur le mur, il y a des tableaux.',
            word2: '- На стене висят (имеются) картины.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {word1: '- Ou est Pierre?', word2: '- Где Пьер?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1'},
        {
            word1: '- Il est assis devant la table.',
            word2: '- Он сидит за столом (досл.: перед столом).',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Sur la table, devant Pierre, il y a des livres, des cahiers, et des crayons.',
            word2: '- На столе перед Пьером (имеются) книги, тетради, карандаши.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
        {
            word1: '- Derrière la chaise, sur le tapis, est couché Néro, le chien de Pierre.',
            word2: '- За стулом, на ковре, лежит Нэро, собака Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::1',
        },
// PAGE
        {word1: 'Bonjour', word2: 'Здравствуйте', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Bonjour Pierre!', word2: '- Здравствуй, Пьер!', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Bonjour mon vieux.',
            word2: '- Здравствуй, дружище (досл.: мой старый).',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Tu es tout seul?', word2: '- Ты один?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},

        {
            word1: '- Oui, je suis tout seul pour le moment.',
            word2: '- Да, пока что я один.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Et où sont les autres? Où est monsieur Vernet?',
            word2: '- A где другие? Где господин Верне?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oh, il est absent.',
            word2: '- Ox, нет его (он отсутствует).',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Et Suzanne, où est-ce qu’elle est?',
            word2: '- A где Сюзанна?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Suzanne? Elle est à la maison. Mais tiens, la voici.',
            word2: '- Сюзанна? Она дома. А вот и она.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Bonjour, Jacques.', word2: '- Здравствуй, Жак.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Bonjour, Pierre.', word2: '- Здравствуй, Пьер.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Bonjour, Suzanne.',
            word2: '- Здравствуй, Сюзанна.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Vous êtes enfin tous les deux ensemble. Quelle chance! Allons faire une partie de croquet.',
            word2: '- Наконец-то вы вместе. Вот повезло!  Идемте играть в крокет.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
// PAGE
        {
            word1: '- Pardon monsieur!',
            word2: '- Извините, (господин)!',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Qu’y a-t-il pour votre service, mademoiselle?',
            word2: '- Чем вам могу служить, мадмуазель?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Êtes-vous monsieur Paul Vernet?',
            word2: '- Это вы - господин Поль Верне?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, mademoiselle, je suis Paul Vernet.',
            word2: '- Да, мадмуазель, это я, Поль Верне.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Vous êtes l’ami de Pierre?',
            word2: '- Это вы - друг Пьера?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, mademoiselle, je suis l’ami de Pierre.',
            word2: '- Да, мадмуазель, это я - друг Пьера.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Alors vous êtes l’homme que je cherche.',
            word2: '- Тогда вы - человек, которого я ищу.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Est-ce que vous êtes mademoiselle Françoise Dubois, la soeur de Pierre?',
            word2: '- Это вы мадмуазель Франсуаза  Дюбуа, сестра Пьера?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, je suis Françoise Dubois.',
            word2: '- Да, я - Франсуаза Дюбуа.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Je suis enchanté de faire votre connaissance, mademoiselle.',
            word2: '- Мне очень приятно познакомиться с вами, (мадмуазель).',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
// PAGE
        {word1: 'Une photo', word2: 'Фотография', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Voici la photo de mon fiancé.',
            word2: '- Вот фотография моего жениха.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Quel est son nom?', word2: '- Как его зовут?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {word1: '- Son nom est Paul.', word2: '- Его зовут Поль.', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Est-ce qu’il est grand?',
            word2: '- Высокий ли он?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, il est grand et fort.',
            word2: '- Да, он высокий и сильный!',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Et quelle est la couleur de ses yeux et de ses cheveux?',
            word2: '- А какого цвета у него глаза и волосы?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Ses yeux sont noirs et ses cheveux sont bruns.',
            word2: '- У него глаза чёрные, а волосы каштановые.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- C’est un joli garçon.',
            word2: '- Это красивый мальчик (юноша).',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Et voici maintenant la photo de la fianceé de mon frère.',
            word2: '- А вот фотография невесты моего брата.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Est-ce qu’elle est jolie?',
            word2: '- Красивая ли она?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Elle n’est pas jolie, mais elle est intelligente.',
            word2: '- Она не красивая, но умная.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
// PAGE
        {
            word1: '- Où sont vos enfants, madame?',
            word2: '- Где ваши дети (госпожа)?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Pierre est à l’école et Françoise, est à la maison.',
            word2: '- Пьер в школе, а Франсуаза дома.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Est-ce que vous êtes contente de vos enfants?',
            word2: '- Довольны ли вы вашими детьми?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Je suis très contente de mon fils: il est gai et gentil, mais je ne suis pas très contente de ma fille: elle est un peu paresseuse. Voici la photo de mes  enfants avec leur père.',
            word2: '- Я очень довольна моим сыном: он весёлый и славный, но я не очень довольна дочерью: она немного ленива. Вот фотография моих детей с (их) отцом.',
            lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2',
        },
// PAGE
        {
            word1: '- Françoise est belle, n’est-ce pas?',
            word2: '- Франсуаза красивая, не правда ли?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, elle est blonde et grande. Ses yeux sont bleus et ses sourcils sont épais et noirs.',
            word2: '- Да, она блондинка высокого роста. У неё голубые глаза  и черные густые брови.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {word1: '- Et Pierre?', word2: '- A Пьер?', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Pierre n’est ni beau ni laid.',
            word2: '- Пьер ни красивый и не уродливый.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Son front est haut, son nez est pointu, sa bouche est grande, son menton est carré. C’est un joli garçon quand même.',
            word2: '- У него высокий лоб, острый нос, квадратный подбородок, большой рот. Но всё-таки это красивый мальчик.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
// PAGE
        {word1: 'Les projets', word2: 'Планы', lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2'},
        {
            word1: '- Tu as congé aujourd’hui, n’est-ce pas, Suzanne?',
            word2: '- У тебя сегодня свободный день, не так ли, Сюзанна?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Oui, j’ai congé aujourd’hui et demain.',
            word2: '- Да, у меня сегодня (свободный день) выходной и завтра.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Alors j’ai une idée.',
            word2: '- Тогда у меня есть идея.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Et quelle est cette idée?',
            word2: '- A какая же эта идея?',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Mes amis ont une maison à la campagne et, comme nous avons deux jours libres,   nous pouvons y passer un weekend merveilleux.',
            word2: '- У моих друзей есть дача в деревне, а так как у нас свободных два дня, мы можем  замечательно там провести время.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
// PAGE
        {
            word1: '- Oui, tu as raison, ton idée est vraiment bonne. Eh bien moi, j’ai aussi une idée.',
            word2: '- Да, ты прав, твоя идея действительно хороша. И у меня есть также мысль.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- Tu sais, Georges a une voiture et nous pouvons y aller tous ensemble en auto.',
            word2: '- Знаешь, у Жоржа есть машина, и мы можем поехать туда все вместе на машине.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },
        {
            word1: '- C’est parfait, je suis entièrement d’accord, d’autant plus que Georges et toi, vous avez beacoup de choses à vous dire.',
            word2: '- Прекрасно, я вполне согласен, тем более, что вам с Жоржем есть о чем  поговорить.',
            lang1: 'FR',
            lang2: 'RU',
            scope: 'test::lesson::2',
        },

    ];

    private steps = [
        {
            id: 1,
            title: 'Проверка работы мультимедиа-устройств',
            lessons: 1,
            brief: 1,
            test: 0,
            learning: 0,
            briefText: 'Тестируемый должен убедиться, что его мультимедиа-устройства позволяют ему пройти тестирование и пробное обучение',
        },
        {
            id: 2,
            title: 'Описание методики тестирования',
            lessons: 1,
            brief: 1,
            test: 0,
            learning: 0,
            briefText: 'Тестируемый получает информацию о цели и методе тестирования.',
        },
        {
            id: 3,
            title: 'Мнемонический тест',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: 'Цель данного теста - определить способность тестируемого к зрительному ассоциативному запоминанию.',
        },
        {
            id: 4,
            title: 'Определение языка пробного обучения',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: 'Цель данного теста - определить наиболее слабый иностранный язык тестируемого, ' +
                'из набора (английский/ немецкий/ французский), ' +
                'который и будет использоваться для дальнейшего тестового обучения.',
        },
        {
            id: 5,
            title: 'Входной тест знания лексики языка пробного обучения',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: 'Тестируемому предъявляется 100 слов языка пробного обучения. Тестируемый должен отметиь известные ему слова.',
        },
        {
            id: 6,
            title: 'Влияние аутотренинга на интенсивность обучения',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: 'Тестируемому предлагается оценить свое состояние ' +
                '( Самочувствие, Активность, Настроение) по некоторой шкале (7/ 10-бальной ????). ' +
                'После этого, пройти тестовый аутотренинг. После этого, еще раз оценить свое состояние',
        },
        {
            id: 7,
            title: 'Пробное обучение – Пассив',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 1,
            briefText: 'Цель данного теста – показать тестируемому эффективность предлагаемой методики для него лично',
        },
        {
            id: 8,
            title: 'Выходной тест знания лексики языка пробного обучения',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: 'Тестируемому предъявляется 100 слов языка пробного обучения. Тестируемый должен отметиь известные ему слова.',
        },
        {
            id: 9,
            title: 'Результаты тестирования',
            lessons: 0,
            brief: 1,
            test: 1,
            learning: 0,
            briefText: '',
        },
    ];

    private phases = [
        {
            step: 1,
            num: 1,
            title: 'Тестирование звука',
            scope: '',
            text: 'Вы можете проверить, правильно ли воспроизводится звук, нажав клавишу "звуковой тест"',
            sounds: 'audiocheck.net_L.ogg#audiocheck.net_R.ogg',
            mode: 'CYCLE',
            time: 0,
            next: 0,
            stages: 0,
            pages: 0,
            component: 'SoundTest',
            phase: 1,
            action: 'BRIEF',
            result: '',
        },
        {
            step: 2,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Описание методики тестирования',
            scope: '',
            text: '<p><strong>Проверка начального лексического запаса на английском, французском и немецком языках.</strong></p> <p>Определение лингвистических способностей к усвоению иностранного языка в режиме автоматизированного обучения.Процедура тестирования занимает около 2-х часов.</p><p>Приступайте к работе только в том случае, если Вы уверены, что ничто не будет Вам мешать. Отключите телефон, устраните все другие отвлекающие моменты.</p> <p>Это необходимо сделать потому, что некоторые задания выполняются с контролем затраченного на их выполнение времени.</p>',
            sounds: 'cy-inst2fm1.mp3',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 3,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Мнемонический тест',
            scope: '',
            text: '<p>Сейчас Вы увидите на экране список из 50-ти пар слов на русском языке. Ваша задача в течении 3-х минут запомнить как можно больше пар.</p><p>Просматривайте список под звук метронома, стараясь мысленно связать ассоциативными связями слова в каждой паре.</p><p>Отмечайте мышкой запомненные пары слов, щелкнув на квадрате между словами одной пары.</p><p>Старайтесь просматривать список в ритме метронома.</p><p>Успехов Вам!</p>',
            sounds: 'cy-inst5_1.mp3#cy-inst5_1fm.mp3',
            mode: 'RANDOM',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 3,
            phase: 2,
            num: 2,
            action: 'TEST',
            result: 'mnemonic',
            title: 'Мнемонический тест',
            scope: 'RU#RU#mnemonic::test',
            text: '',
            sounds: 'metronom.mp3',
            mode: 'CYCLE',
            time: 180,
            next: 0,
            stages: 0,
            pages: 0,

            component: 'TwoColumnWordsWithCheckBox',
        },
        {
            step: 3,
            phase: 2,
            num: 3,
            action: 'BRIEF',
            result: '',
            title: 'Контроль - мнемонический тест',
            scope: '',
            text: '<p>Просмотрите список еще раз.</p><p>Восстановите правую часть списка (дополните пары), перетаскивая нужные слова с помощью мыши.</p><p>Если вы ошиблись очистите перенесенное слово кликнув Х</p><p>На это Вам отводится 10 мин. - если закончите раньше, нажмите кнопку "Продолжить".</p>',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 3,
            phase: 3,
            num: 4,
            action: 'TEST',
            result: 'mnemonic',
            title: 'Контроль - мнемонический тест',
            scope: 'RU#RU#mnemonic::test',
            text: '',
            sounds: 'metronom.mp3',
            mode: 'CYCLE',
            time: 600,
            next: 1,
            stages: 0,
            pages: 0,

            component: 'TwoColumnWordsWithMoveWords',
        },
        {
            step: 3,
            phase: 3,
            num: 5,
            action: 'BRIEF',
            result: 'mnemonic',
            title: 'Предъявление/интерпретация результатов - мнемонический тест',
            scope: 'Приложение 2',
            text: '<p>Из 50 предъявленных пар слов вы отметили  <strong>{{CHECKED}}</strong> и запомнили  <strong>{{REMEMBERED}}</strong> пар</p>  <p><strong>{{RECOMMENDATION}}</strong></p>',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 4,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Самооценка речевых навыков в общенении на английском, немецком и французском языках',
            scope: '',
            text: '<p>Вы видите пример шкалы самооценки речевых навыков общения на иностранном языке.</p> <p>Нас интересует, как Вы сами оцениваете свои возможности по общению, то есть, пониманию речи на слух и выражению своих мыслей в беседе.</p> <p>На следующей странице Вам надо выбрать тот уровень, которым Вы владеете в данный момент. Можете указать несколько уровней.</p> ',
            sounds: 'cy-inst6_1fm.mp3#cy-inst6_1.mp3',
            mode: 'RANDOM',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 4,
            phase: 1,
            num: 2,
            action: 'TEST',
            result: 'selfrating',
            title: 'Самооценка речевых навыков в общенении на английском, немецком и французском языках',
            scope: '',
            text: '<p>Оцените свои знания в общенении на английском, немецком и французском языках.</p> <p>Поставте галочку в тех местах, где считаете нужным.</p>',
            sounds: '',
            mode: 'CYCLE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'SelfLanguageRating',
        },
        {
            step: 4,
            phase: 2,
            num: 3,
            action: 'BRIEF',
            result: '',
            title: 'Контроль – оценка начального лексического запаса',
            scope: '',
            text: '<p>Сейчас Вам будет предъявлено по 25 слов на английском, немецком и французском языках. Постарайтесь перевести на русский язык все известные вам слова.</p> <p>Внимательно просмотрите списки на всех трех языках, даже если какие либо из них Вы не изучали. В тестах есть такие интернациональные слова, которые Вам наверняка знакомы.</p> <p>Ваша задача - выбрать правильный перевод каждого слова и переместить его на прямоугольник справа от иностранного слова.</p>  <p>Если Вы сомневаетесь в правильности подставленного значения слова, щелкните мышкой по знаку вопроса слева от иностранного слова.</p> <p>По результатам этого теста мы определим язык пробного обучения.</p> ',
            sounds: 'cy-inst7_1fm.mp3#cy-inst7_1.mp3',
            mode: 'RANDOM',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 4,
            phase: 2,
            num: 4,
            action: 'TEST',
            result: 'selfrating',
            title: 'Контроль – оценка начального лексического запаса',
            scope: 'EN#RU#vocabulary::test',
            text: '<p>Слова из правого столбца перетаскиваются в левый столбец.</p><p>Если вы ошиблись очистите перенесенное слово кликнув Х</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'ControlLanguageRating',
        },
        {
            step: 4,
            phase: 2,
            num: 5,
            action: 'TEST',
            result: 'selfrating',
            title: 'Контроль – оценка начального лексического запаса',
            scope: 'DE#RU#vocabulary::test',
            text: '<p>Слова из правого столбца перетаскиваются в левый столбец.</p><p>Если вы ошиблись очистите перенесенное слово кликнув Х</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'ControlLanguageRating',
        },
        {
            step: 4,
            phase: 2,
            num: 6,
            action: 'TEST',
            result: 'selfrating',
            title: 'Контроль – оценка начального лексического запаса',
            scope: 'FR#RU#vocabulary::test',
            text: '<p>Слова из правого столбца перетаскиваются в левый столбец.</p><p>Если вы ошиблись очистите перенесенное слово кликнув Х</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'ControlLanguageRating',
        },
        {
            step: 4,
            phase: 3,
            num: 7,
            action: 'BRIEF',
            result: 'selfrating',
            title: 'Предъявление/интерпретация результатов',
            scope: '',
            text: 'В результате тестирования выбран язык обучения: <p><strong>{{LANGUAGE_NAME_1}}</strong></p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 5,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Самооценка',
            scope: '',
            text: '<p>Сейчас Вам будут предъявлены 100 слов <strong>{{LANGUAGE_NAME_2}}</strong> языка.</p> <p>Показ будет сопровождаться звуками метронома. Вам нужно будет внимательно просмотреть весь список, стараясь просматривать слова в ритме метронома. Отмечайте каждое иностранное слово, значение которого вы знаете, нажатием на клавишу "ПРОБЕЛ"</p> ',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 5,
            phase: 1,
            num: 2,
            action: 'TEST',
            result: 'lexical',
            title: 'Самооценка',
            scope: '**#RU#vocabulary::learn',
            text: '',
            sounds: 'metronom.mp3',
            mode: 'CYCLE',
            time: 100,
            next: 0,
            stages: 0,
            pages: 0,

            component: 'SelfLexicalLearningLang',
        },
        {
            step: 5,
            phase: 2,
            num: 3,
            action: 'BRIEF',
            result: '',
            title: 'Контроль',
            scope: 'vocabulary::learn',
            text: '<p>Вам предстоит вновь просмотреть список из 100 слов.</p> <p>Из колонок слов на русском языке, расположенных справа, последовательно  выбирайте соответствующие значения для <strong>{{LANGUAGE_NAME_3}}</strong> слов (слева) и, с помощью мыши, перетаскивайте их на прямоугольники.</p> <p>Одним словом, расположите слово и его перевод напротив друг друга. Работать нужно быстро, так как время на перевод ограничено (10 мин + 10 мин).</p> ',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 2,
            component: '',
        },
        {
            step: 5,
            phase: 2,
            num: 4,
            action: 'TEST',
            result: 'lexical',
            title: 'Контроль',
            scope: '**#RU#vocabulary::learn#0#49',
            text: '',
            sounds: '',
            mode: '',
            time: 600,
            next: 1,
            stages: 0,
            pages: 2,
            component: 'TwoColumnWordsWithMoveWords',
        },
        {
            step: 5,
            phase: 3,
            num: 5,
            action: 'TEST',
            result: 'lexical',
            title: 'Контроль',
            scope: '**#RU#vocabulary::learn#50#99',
            text: '',
            sounds: '',
            mode: '',
            time: 600,
            next: 1,
            stages: 0,
            pages: 2,
            component: 'TwoColumnWordsWithMoveWords',
        },
        {
            step: 5,
            phase: 4,
            num: 6,
            action: 'BRIEF',
            result: 'lexical',
            title: 'Предъявление/интерпретация результатов',
            scope: '',
            text: '<p>Из 100 предъявленных пар слов вы отметили <strong>{{CHECKED}}</strong> и запомнили <strong>{{REMEMBERED}}</strong> пар</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 6,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Описание методик аутотренинга',
            scope: '',
            text: '<p>Правила подготовки к урокам: расслабление, аутогенная тренировка, самовнушение.</p>',
            sounds: 'cy-inst4_2fm.mp3#cy-inst4_2.mp3',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 6,
            phase: 1,
            num: 1,
            action: 'TEST',
            result: 'atself',
            title: 'Самооценка Вашего состояния',
            scope: '',
            text: '<p>Подумайте и оцените следующие параметры Вашего состояния:<br>самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'AutoTrainingSelfTest',
        },
        {
            step: 6,
            phase: 2,
            num: 2,
            action: 'BRIEF',
            result: '',
            title: 'Аутотренинг',
            scope: '',
            text: '<p>Для того чтобы настроиться на эффективную работу во время пробного обучения,<br>предлагаем Вам самостоятельно проделать упражнения по аутогенной тренировке (АТ).</p><p>Устройтесь поудобнее, устраните все отвлекающие факторы.<br>Внимательно слушайте инструкции, с полной самоотдачей выполняйте упражнения.</p> <p>Длительность сеанса аутотренинга: 6 мин 20 сек</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 6,
            phase: 2,
            num: 3,
            action: 'TEST',
            result: '',
            title: 'Аутотренинг',
            scope: '',
            text: '',
            sounds: 'atstartm_final.mp3',
            mode: 'ONCE',
            time: 0,
            next: 0,
            stages: 0,
            pages: 0,
            component: 'AutoTraining',
        },
        // { step: 6,
        //     phase: 3,
        //     num: 4,
        //     action: 'BRIEF',
        //     result: '',
        //     title: 'Самооценка Вашего состояния',
        //     scope: '',
        //     text: 'Оцените еще раз параметры вашего состояния: самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма',
        //     sounds: '',
        //     mode: '',
        //     time: 0,
        //     next: 1,
        //     stages: 0,
        //     pages: 0,
        //     component: '' },
        {
            step: 6,
            phase: 3,
            num: 4,
            action: 'TEST',
            result: 'atself',
            title: 'Самооценка Вашего состояния',
            scope: '',
            text: '<p>Оцените еще раз параметры вашего состояния: самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'AutoTrainingSelfTest',
        },
        {
            step: 6,
            phase: 4,
            num: 5,
            action: 'BRIEF',
            result: 'atself',
            title: 'Предъявление/интерпретация результатов',
            scope: '',
            text: '<p>Ваше самочувствие до проведения аутотренинга:<br> <strong>{{AUTOSELFBEFORE}}</strong>, после аутотренинга: <strong>{{AUTOSELFAFTER}}</strong>. <br><strong>{{AUTOSELFRECOMENDATION}}</strong></p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 7,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: '',
            scope: '',
            text: '<p>Приступаем к пробному обучению.<br> Вам будут предъявлены озвученные тексты на <strong>{{LANGUAGE_NAME}}</strong> языке с параллельным переводом.</p> <p>Вы должны будете слушать в левом наушнике тексты на <strong>{{LANGUAGE_NAME}}</strong> языке,<br> а в правом наушнике их перевод.</p> <p>Старайтесь читать текст вместе с диктором вслух или громко повторять за ним.</p><p> Всего тексты уроков будут предъявлены 4 раза подряд.<br> Общая длительность уроков -  <strong>{{STEP_7_TIME}}</strong></p>',
            sounds: 'cy-inst10_2fm.mp3#cy-inst10_2.mp3',
            mode: 'RANDOM',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 7,
            phase: 1,
            num: 2,
            action: 'TEST',
            result: 'lesson',
            title: 'Пробное обучение',
            scope: '',
            text: '',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'Lesson',
        },
        {
            step: 7,
            phase: 1,
            num: 3,
            action: 'BRIEF',
            result: 'lesson',
            title: 'Результат пробного обучения',
            scope: '',
            text: 'После прохождения пробного урока Ваш результат: <br>{{LESSON_RESULT}}',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },

// 8
        {
            step: 8,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Самооценка',
            scope: '',
            text: '<p>Сейчас Вам вновь будут предъявлены 100 слов <strong>{{LANGUAGE_NAME_2}}</strong> языка.</p> <p>Показ будет сопровождаться звуками метронома.<br> Вам нужно будет внимательно просмотреть весь список, стараясь просматривать слова в ритме метронома.<br> Отмечайте каждое иностранное слово, значение которого вы знаете, нажатием на клавишу "ПРОБЕЛ"</p> ',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },
        {
            step: 8,
            phase: 1,
            num: 2,
            action: 'TEST',
            result: 'endlexical',
            title: 'Самооценка',
            scope: '**#RU#vocabulary::learn',
            text: '',
            sounds: 'metronom.mp3',
            mode: 'CYCLE',
            time: 100,
            next: 0,
            stages: 0,
            pages: 0,
            component: 'SelfLexicalLearningLang',
        },
        {
            step: 8,
            phase: 2,
            num: 3,
            action: 'BRIEF',
            result: '',
            title: 'Контроль',
            scope: 'vocabulary::learn',
            text: '<p>Вам предстоит вновь просмотреть список из 100 слов.</p> <p>Из колонок слов на русском языке, расположенных справа, последовательно  выбирайте соответствующие значения для <strong>{{LANGUAGE_NAME_3}}</strong> слов (слева) и, с помощью мыши, перетаскивайте их на прямоугольники.</p> <p>Одним словом, расположите слово и его перевод напротив друг друга. Работать нужно быстро, так как время на перевод ограничено (10 мин + 10 мин).</p> ',
            sounds: '',
            mode: 'ONCE',
            time: 0,
            next: 1,
            stages: 0,
            pages: 2,
            component: '',
        },
        {
            step: 8,
            phase: 2,
            num: 4,
            action: 'TEST',
            result: 'endlexical',
            title: 'Контроль',
            scope: '**#RU#vocabulary::learn#0#49',
            text: '',
            sounds: '',
            mode: '',
            time: 600,
            next: 1,
            stages: 0,
            pages: 2,
            component: 'TwoColumnWordsWithMoveWords',
        },
        {
            step: 8,
            phase: 3,
            num: 5,
            action: 'TEST',
            result: 'endlexical',
            title: 'Контроль',
            scope: '**#RU#vocabulary::learn#50#99',
            text: '',
            sounds: '',
            mode: '',
            time: 600,
            next: 1,
            stages: 0,
            pages: 2,
            component: 'TwoColumnWordsWithMoveWords',
        },
        {
            step: 8,
            phase: 4,
            num: 6,
            action: 'BRIEF',
            result: 'endlexical',
            title: 'Предъявление/интерпретация результатов',
            scope: '',
            text: '<p>Из 100 предъявленных пар слов вы отметили <strong>{{CHECKED}}</strong> и запомнили <strong>{{REMEMBERED}}</strong> пар</p>',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: '',
        },

        {
            step: 9,
            phase: 1,
            num: 1,
            action: 'BRIEF',
            result: '',
            title: 'Результаты тестирования',
            scope: '',
            text: '',
            sounds: '',
            mode: '',
            time: 0,
            next: 1,
            stages: 0,
            pages: 0,
            component: 'BeginnerFinalResult',
        },
    ];

    private lessonStages = [

        // LESSON 1 EN
        {
            lang: 'EN',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 1,
            stage: 1,
            pages: 3,
            scope: 'test::lesson::1',
            sound: 'less1_eng-ru.mp3',
            time: 0,
        },
        // { lang: 'EN', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 1, stage: 2, pages: 3, scope: 'test::lesson::1', sound: 'less1_eng-ru.mp3',    time: 0 },
        // { lang: 'EN', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 1, stage: 3, pages: 3, scope: 'test::lesson::1', sound: 'less1_eng-ru.mp3',    time: 0 },
        {
            lang: 'EN',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 1,
            stage: 4,
            pages: 3,
            scope: 'test::lesson::1',
            sound: 'less1_eng.mp3',
            time: 0,
        },

        // LESSON 2 EN
        {
            lang: 'EN',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 2,
            stage: 1,
            pages: 4,
            scope: 'test::lesson::2',
            sound: 'less2_eng-ru.mp3',
            time: 0,
        },
        // { lang: 'EN', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 2, stage: 2, pages: 4, scope: 'test::lesson::2', sound: 'less2_eng-ru.mp3',    time: 0 },
        // { lang: 'EN', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 2, stage: 3, pages: 4, scope: 'test::lesson::2', sound: 'less2_eng-ru.mp3',    time: 0 },
        {
            lang: 'EN',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 2,
            stage: 4,
            pages: 4,
            scope: 'test::lesson::2',
            sound: 'less2_eng.mp3',
            time: 0,
        },

        // LESSON 3 EN
        {
            lang: 'EN',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 3,
            stage: 1,
            pages: 4,
            scope: 'test::lesson::3',
            sound: 'less3_eng-ru.mp3',
            time: 0,
        },
        // { lang: 'EN', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 3, stage: 2, pages: 4, scope: 'test::lesson::3', sound: 'less3_eng-ru.mp3',    time: 0 },
        // { lang: 'EN', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 3, stage: 3, pages: 4, scope: 'test::lesson::3', sound: 'less3_eng-ru.mp3',    time: 0 },
        {
            lang: 'EN',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 3,
            stage: 4,
            pages: 4,
            scope: 'test::lesson::3',
            sound: 'less3_eng.mp3',
            time: 0,
        },

        // LESSON 4 EN
        {
            lang: 'EN',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 4,
            stage: 1,
            pages: 5,
            scope: 'test::lesson::4',
            sound: 'less4_eng-ru.mp3',
            time: 0,
        },
        // { lang: 'EN', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 4, stage: 2, pages: 5, scope: 'test::lesson::4', sound: 'less4_eng-ru.mp3',    time: 0 },
        // { lang: 'EN', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 4, stage: 3, pages: 5, scope: 'test::lesson::4', sound: 'less4_eng-ru.mp3',    time: 0 },
        {
            lang: 'EN',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 4,
            stage: 4,
            pages: 5,
            scope: 'test::lesson::4',
            sound: 'less4_eng.mp3',
            time: 0,
        },

        // LESSON 1 DE
        {
            lang: 'DE',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 1,
            stage: 1,
            pages: 5,
            scope: 'test::lesson::1',
            sound: 'less1_deu-ru.mp3',
            time: 0,
        },
        // { lang: 'DE', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 1, stage: 2, pages: 5, scope: 'test::lesson::1', sound: 'less1_deu-ru.mp3',    time: 0 },
        // { lang: 'DE', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 1, stage: 3, pages: 5, scope: 'test::lesson::1', sound: 'less1_deu-ru.mp3',    time: 0 },
        {
            lang: 'DE',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 1,
            stage: 4,
            pages: 5,
            scope: 'test::lesson::1',
            sound: 'less1_deu.mp3',
            time: 0,
        },

        // LESSON 2 DE
        {
            lang: 'DE',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 2,
            stage: 1,
            pages: 1,
            scope: 'test::lesson::2',
            sound: 'less2_deu-ru.mp3',
            time: 0,
        },
        // { lang: 'DE', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 2, stage: 2, pages: 1, scope: 'test::lesson::2', sound: 'less2_deu-ru.mp3',    time: 0 },
        // { lang: 'DE', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 2, stage: 3, pages: 1, scope: 'test::lesson::2', sound: 'less2_deu-ru.mp3',    time: 0 },
        {
            lang: 'DE',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 2,
            stage: 4,
            pages: 1,
            scope: 'test::lesson::2',
            sound: 'less2_deu.mp3',
            time: 0,
        },

        // LESSON 1 FR
        {
            lang: 'FR',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 1,
            stage: 1,
            pages: 12,
            scope: 'test::lesson::1',
            sound: 'less1_fre-ru.mp3',
            time: 0,
        },
        // { lang: 'FR', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 1, stage: 2, pages: 12, scope: 'test::lesson::1', sound: 'less1_fre-ru.mp3',    time: 0 },
        // { lang: 'FR', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 1, stage: 3, pages: 12, scope: 'test::lesson::1', sound: 'less1_fre-ru.mp3',    time: 0 },
        {
            lang: 'FR',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 1,
            stage: 4,
            pages: 12,
            scope: 'test::lesson::1',
            sound: 'less1_fre.mp3',
            time: 0,
        },

        // LESSON 2 FR
        {
            lang: 'FR',
            title: 'отмечать знакомые иностранные слова',
            step: 7,
            lesson: 2,
            stage: 1,
            pages: 12,
            scope: 'test::lesson::2',
            sound: 'less2_fre-ru.mp3',
            time: 0,
        },
        // { lang: 'FR', title: 'отмечать иностранные фразы, общий смысл которых понятен',        step: 7, lesson: 2, stage: 2, pages: 12, scope: 'test::lesson::2', sound: 'less2_fre-ru.mp3',    time: 0 },
        // { lang: 'FR', title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',  step: 7, lesson: 2, stage: 3, pages: 12, scope: 'test::lesson::2', sound: 'less2_fre-ru.mp3',    time: 0 },
        {
            lang: 'FR',
            title: 'отмечать <strong>дословно</strong> понятные иностранные фразы',
            step: 7,
            lesson: 2,
            stage: 4,
            pages: 12,
            scope: 'test::lesson::2',
            sound: 'less2_fre.mp3',
            time: 0,
        },
    ];

    private less1EngRu: any[] = [
        {file: 'less1_eng-ru.mp3', pos: 5.378},
        {file: 'less1_eng-ru.mp3', pos: 7.312},
        {file: 'less1_eng-ru.mp3', pos: 9},
        {file: 'less1_eng-ru.mp3', pos: 10.59},
        {file: 'less1_eng-ru.mp3', pos: 12.17},
        {file: 'less1_eng-ru.mp3', pos: 13.8},
        {file: 'less1_eng-ru.mp3', pos: 15.572},
        {file: 'less1_eng-ru.mp3', pos: 17.093},
        {file: 'less1_eng-ru.mp3', pos: 18.865},
        {file: 'less1_eng-ru.mp3', pos: 20.4},
        {file: 'less1_eng-ru.mp3', pos: 22.164},
        {file: 'less1_eng-ru.mp3', pos: 23.715},
        {file: 'less1_eng-ru.mp3', pos: 25.5},
        {file: 'less1_eng-ru.mp3', pos: 27.081},
        {file: 'less1_eng-ru.mp3', pos: 29.065},
        {file: 'less1_eng-ru.mp3', pos: 30.615},
        {file: 'less1_eng-ru.mp3', pos: 32.342},
        {file: 'less1_eng-ru.mp3', pos: 33.922},
        {file: 'less1_eng-ru.mp3', pos: 35.693},
        {file: 'less1_eng-ru.mp3', pos: 37.207},
        {file: 'less1_eng-ru.mp3', pos: 42.888},
        {file: 'less1_eng-ru.mp3', pos: 44.52},
        {file: 'less1_eng-ru.mp3', pos: 46.313},
        {file: 'less1_eng-ru.mp3', pos: 47.826},
        {file: 'less1_eng-ru.mp3', pos: 50},
        {file: 'less1_eng-ru.mp3', pos: 51.574},
        {file: 'less1_eng-ru.mp3', pos: 56.336},
        {file: 'less1_eng-ru.mp3', pos: 57.66},
        {file: 'less1_eng-ru.mp3', pos: 59.173},
        {file: 'less1_eng-ru.mp3', pos: 60.466},
        {file: 'less1_eng-ru.mp3', pos: 62.186},
        {file: 'less1_eng-ru.mp3', pos: 63.127},
        {file: 'less1_eng-ru.mp3', pos: 65.375},
        {file: 'less1_eng-ru.mp3', pos: 66.860},
        {file: 'less1_eng-ru.mp3', pos: 68.580},
        {file: 'less1_eng-ru.mp3', pos: 70.064},
        {file: 'less1_eng-ru.mp3', pos: 71.887},
        {file: 'less1_eng-ru.mp3', pos: 73.209},
        {file: 'less1_eng-ru.mp3', pos: 75.076},
        {file: 'less1_eng-ru.mp3', pos: 76.384},
        {file: 'less1_eng-ru.mp3', pos: 81.969},
        {file: 'less1_eng-ru.mp3', pos: 83.395},
        {file: 'less1_eng-ru.mp3', pos: 85.5},
        {file: 'less1_eng-ru.mp3', pos: 86.9},
        {file: 'less1_eng-ru.mp3', pos: 89.553},
        {file: 'less1_eng-ru.mp3', pos: 90.876},
        {file: 'less1_eng-ru.mp3', pos: 93.316},
        {file: 'less1_eng-ru.mp3', pos: 94.771},
    ];

    private less1Eng: any[] = [
        {file: 'less1_eng.mp3', pos: 4.811},
        {file: 'less1_eng.mp3', pos: 6.6},
        {file: 'less1_eng.mp3', pos: 8.27},
        {file: 'less1_eng.mp3', pos: 9.9},
        {file: 'less1_eng.mp3', pos: 11.530},
        {file: 'less1_eng.mp3', pos: 13.147},
        {file: 'less1_eng.mp3', pos: 14.910},
        {file: 'less1_eng.mp3', pos: 16.514},
        {file: 'less1_eng.mp3', pos: 18.210},
        {file: 'less1_eng.mp3', pos: 19.787},
        {file: 'less1_eng.mp3', pos: 21.523},
        {file: 'less1_eng.mp3', pos: 23.061},
        {file: 'less1_eng.mp3', pos: 24.916},
        {file: 'less1_eng.mp3', pos: 26.374},
        {file: 'less1_eng.mp3', pos: 28.428},
        {file: 'less1_eng.mp3', pos: 30},
        {file: 'less1_eng.mp3', pos: 31.768},
        {file: 'less1_eng.mp3', pos: 33.345},
        {file: 'less1_eng.mp3', pos: 35.188},
        {file: 'less1_eng.mp3', pos: 36.672},
        {file: 'less1_eng.mp3', pos: 38.421},
        {file: 'less1_eng.mp3', pos: 40.038},
        {file: 'less1_eng.mp3', pos: 41.814},
        {file: 'less1_eng.mp3', pos: 43.219},
        {file: 'less1_eng.mp3', pos: 45.552},
        {file: 'less1_eng.mp3', pos: 47.05},
        {file: 'less1_eng.mp3', pos: 51.873},
        {file: 'less1_eng.mp3', pos: 53.146},
        {file: 'less1_eng.mp3', pos: 54.67},
        {file: 'less1_eng.mp3', pos: 55.942},
        {file: 'less1_eng.mp3', pos: 57.56},
        {file: 'less1_eng.mp3', pos: 58.9},
        {file: 'less1_eng.mp3', pos: 60.965},
        {file: 'less1_eng.mp3', pos: 62.436},
        {file: 'less1_eng.mp3', pos: 64.212},
        {file: 'less1_eng.mp3', pos: 65.63},
        {file: 'less1_eng.mp3', pos: 67.486},
        {file: 'less1_eng.mp3', pos: 68.9},
        {file: 'less1_eng.mp3', pos: 70.693},
        {file: 'less1_eng.mp3', pos: 72.045},
        {file: 'less1_eng.mp3', pos: 73.834},
        {file: 'less1_eng.mp3', pos: 75.2},
        {file: 'less1_eng.mp3', pos: 77.386},
        {file: 'less1_eng.mp3', pos: 78.831},
        {file: 'less1_eng.mp3', pos: 81.4},
        {file: 'less1_eng.mp3', pos: 82.807},
        {file: 'less1_eng.mp3', pos: 85.23},
        {file: 'less1_eng.mp3', pos: 86.7},
    ];

    private less2EngRu: any[] = [
        {file: 'less2_eng-ru.mp3', pos: 2.2},
        {file: 'less2_eng-ru.mp3', pos: 3.92},
        {file: 'less2_eng-ru.mp3', pos: 6.242},
        {file: 'less2_eng-ru.mp3', pos: 7.863},
        {file: 'less2_eng-ru.mp3', pos: 10.065},
        {file: 'less2_eng-ru.mp3', pos: 12},
        {file: 'less2_eng-ru.mp3', pos: 15},
        {file: 'less2_eng-ru.mp3', pos: 16.7},
        {file: 'less2_eng-ru.mp3', pos: 19},
        {file: 'less2_eng-ru.mp3', pos: 21.2},
        {file: 'less2_eng-ru.mp3', pos: 23.734},
        {file: 'less2_eng-ru.mp3', pos: 25.912},
        {file: 'less2_eng-ru.mp3', pos: 28.476},
        {file: 'less2_eng-ru.mp3', pos: 30.363},
        {file: 'less2_eng-ru.mp3', pos: 33.05},
        {file: 'less2_eng-ru.mp3', pos: 35.081},
        {file: 'less2_eng-ru.mp3', pos: 37.743},
        {file: 'less2_eng-ru.mp3', pos: 39.872},
        {file: 'less2_eng-ru.mp3', pos: 42.34},
        {file: 'less2_eng-ru.mp3', pos: 44.493},
        {file: 'less2_eng-ru.mp3', pos: 51.606},
        {file: 'less2_eng-ru.mp3', pos: 53.904},
        {file: 'less2_eng-ru.mp3', pos: 56.444},
        {file: 'less2_eng-ru.mp3', pos: 58.38},
        {file: 'less2_eng-ru.mp3', pos: 61.138},
        {file: 'less2_eng-ru.mp3', pos: 63.34},
        {file: 'less2_eng-ru.mp3', pos: 66.195},
        {file: 'less2_eng-ru.mp3', pos: 68.227},
        {file: 'less2_eng-ru.mp3', pos: 70.187},
        {file: 'less2_eng-ru.mp3', pos: 71.663},
        {file: 'less2_eng-ru.mp3', pos: 73.695},
        {file: 'less2_eng-ru.mp3', pos: 75.824},
        {file: 'less2_eng-ru.mp3', pos: 77.76},
        {file: 'less2_eng-ru.mp3', pos: 79.647},
        {file: 'less2_eng-ru.mp3', pos: 81.727},
        {file: 'less2_eng-ru.mp3', pos: 83.59},
        {file: 'less2_eng-ru.mp3', pos: 85.5},
        {file: 'less2_eng-ru.mp3', pos: 87.39},
        {file: 'less2_eng-ru.mp3', pos: 89.42},
        {file: 'less2_eng-ru.mp3', pos: 90.95},
        {file: 'less2_eng-ru.mp3', pos: 96.8},
        {file: 'less2_eng-ru.mp3', pos: 98.74},
        {file: 'less2_eng-ru.mp3', pos: 100.72},
        {file: 'less2_eng-ru.mp3', pos: 102.462},
        {file: 'less2_eng-ru.mp3', pos: 104.833},
        {file: 'less2_eng-ru.mp3', pos: 107.446},
        {file: 'less2_eng-ru.mp3', pos: 109.405},
        {file: 'less2_eng-ru.mp3', pos: 110.98},
        {file: 'less2_eng-ru.mp3', pos: 112.6},
        {file: 'less2_eng-ru.mp3', pos: 114.365},
        {file: 'less2_eng-ru.mp3', pos: 116.978},
        {file: 'less2_eng-ru.mp3', pos: 118.526},
        {file: 'less2_eng-ru.mp3', pos: 120.68},
        {file: 'less2_eng-ru.mp3', pos: 122.81},
        {file: 'less2_eng-ru.mp3', pos: 125.373},
        {file: 'less2_eng-ru.mp3', pos: 128.228},
        {file: 'less2_eng-ru.mp3', pos: 131.06},
        {file: 'less2_eng-ru.mp3', pos: 133.72},
        {file: 'less2_eng-ru.mp3', pos: 140.833},
        {file: 'less2_eng-ru.mp3', pos: 144.003},
        {file: 'less2_eng-ru.mp3', pos: 146.56},
        {file: 'less2_eng-ru.mp3', pos: 149.389},
        {file: 'less2_eng-ru.mp3', pos: 151.914},
        {file: 'less2_eng-ru.mp3', pos: 154.89},
        {file: 'less2_eng-ru.mp3', pos: 157.309},
    ];

    private less2Eng: any[] = [
        {file: 'less2_eng.mp3', pos: 2.47},
        {file: 'less2_eng.mp3', pos: 4.11},
        {file: 'less2_eng.mp3', pos: 6.39},
        {file: 'less2_eng.mp3', pos: 8.02},
        {file: 'less2_eng.mp3', pos: 10.23},
        {file: 'less2_eng.mp3', pos: 12.13},
        {file: 'less2_eng.mp3', pos: 15.0},
        {file: 'less2_eng.mp3', pos: 16.88},
        {file: 'less2_eng.mp3', pos: 19.2},
        {file: 'less2_eng.mp3', pos: 21.46},
        {file: 'less2_eng.mp3', pos: 23.97},
        {file: 'less2_eng.mp3', pos: 26.1},
        {file: 'less2_eng.mp3', pos: 28.66},
        {file: 'less2_eng.mp3', pos: 30.66},
        {file: 'less2_eng.mp3', pos: 33.29},
        {file: 'less2_eng.mp3', pos: 35.22},
        {file: 'less2_eng.mp3', pos: 37.94},
        {file: 'less2_eng.mp3', pos: 40.05},
        {file: 'less2_eng.mp3', pos: 42.63},
        {file: 'less2_eng.mp3', pos: 44.75},
        {file: 'less2_eng.mp3', pos: 48.07},
        {file: 'less2_eng.mp3', pos: 50.05},
        {file: 'less2_eng.mp3', pos: 52.72},
        {file: 'less2_eng.mp3', pos: 54.6},
        {file: 'less2_eng.mp3', pos: 57.35},
        {file: 'less2_eng.mp3', pos: 59.65},
        {file: 'less2_eng.mp3', pos: 62.48},
        {file: 'less2_eng.mp3', pos: 66.97},
        {file: 'less2_eng.mp3', pos: 68.9},
        {file: 'less2_eng.mp3', pos: 70.39},
        {file: 'less2_eng.mp3', pos: 72.32},
        {file: 'less2_eng.mp3', pos: 74.52},
        {file: 'less2_eng.mp3', pos: 76.36},
        {file: 'less2_eng.mp3', pos: 78.45},
        {file: 'less2_eng.mp3', pos: 80.54},
        {file: 'less2_eng.mp3', pos: 82.36},
        {file: 'less2_eng.mp3', pos: 84.2},
        {file: 'less2_eng.mp3', pos: 86.1},
        {file: 'less2_eng.mp3', pos: 88.22},
        {file: 'less2_eng.mp3', pos: 89.82},
        {file: 'less2_eng.mp3', pos: 91.73},
        {file: 'less2_eng.mp3', pos: 93.54},
        {file: 'less2_eng.mp3', pos: 95.56},
        {file: 'less2_eng.mp3', pos: 97.21},
        {file: 'less2_eng.mp3', pos: 99.56},
        {file: 'less2_eng.mp3', pos: 101.77},
        {file: 'less2_eng.mp3', pos: 104.25},
        {file: 'less2_eng.mp3', pos: 105.84},
        {file: 'less2_eng.mp3', pos: 60 + 47.49},
        {file: 'less2_eng.mp3', pos: 60 + 49.3},
        {file: 'less2_eng.mp3', pos: 60 + 51.76},
        {file: 'less2_eng.mp3', pos: 60 + 53.46},
        {file: 'less2_eng.mp3', pos: 60 + 55.57},
        {file: 'less2_eng.mp3', pos: 60 + 57.85},
        {file: 'less2_eng.mp3', pos: 120 + 0.55},
        {file: 'less2_eng.mp3', pos: 120 + 3.18},
        {file: 'less2_eng.mp3', pos: 120 + 6.13},
        {file: 'less2_eng.mp3', pos: 120 + 8.78},
        {file: 'less2_eng.mp3', pos: 120 + 14.54},
        {file: 'less2_eng.mp3', pos: 120 + 17.66},
        {file: 'less2_eng.mp3', pos: 120 + 20.17},
        {file: 'less2_eng.mp3', pos: 120 + 23.24},
        {file: 'less2_eng.mp3', pos: 120 + 25.72},
        {file: 'less2_eng.mp3', pos: 120 + 28.61},
        {file: 'less2_eng.mp3', pos: 120 + 31.07},
    ];

    private less3EngRu: any[] = [
        {file: 'less3_eng-ru.mp3', pos: 0},
        {file: 'less3_eng-ru.mp3', pos: 1.561},
        {file: 'less3_eng-ru.mp3', pos: 3.104},
        {file: 'less3_eng-ru.mp3', pos: 4.587},
        {file: 'less3_eng-ru.mp3', pos: 6.642},
        {file: 'less3_eng-ru.mp3', pos: 8.674},
        {file: 'less3_eng-ru.mp3', pos: 11.227},
        {file: 'less3_eng-ru.mp3', pos: 14.184},
        {file: 'less3_eng-ru.mp3', pos: 16.514},
        {file: 'less3_eng-ru.mp3', pos: 17.908},
        {file: 'less3_eng-ru.mp3', pos: 20.010},
        {file: 'less3_eng-ru.mp3', pos: 21.297},
        {file: 'less3_eng-ru.mp3', pos: 23.478},
        {file: 'less3_eng-ru.mp3', pos: 25.044},
        {file: 'less3_eng-ru.mp3', pos: 26.951},
        {file: 'less3_eng-ru.mp3', pos: 28.46},
        {file: 'less3_eng-ru.mp3', pos: 30.644},
        {file: 'less3_eng-ru.mp3', pos: 32.443},
        {file: 'less3_eng-ru.mp3', pos: 34.588},
        {file: 'less3_eng-ru.mp3', pos: 36.286},

        // { file: 'less3_eng-ru.mp3', pos: 38.6},
        // { file: 'less3_eng-ru.mp3', pos: 40.7},

        {file: 'less3_eng-ru.mp3', pos: 43.244},
        {file: 'less3_eng-ru.mp3', pos: 45.222},
        {file: 'less3_eng-ru.mp3', pos: 47.634},
        {file: 'less3_eng-ru.mp3', pos: 49.648},
        {file: 'less3_eng-ru.mp3', pos: 52.299},
        {file: 'less3_eng-ru.mp3', pos: 54.336},
        {file: 'less3_eng-ru.mp3', pos: 58.109},
        {file: 'less3_eng-ru.mp3', pos: 59.83},
        {file: 'less3_eng-ru.mp3', pos: 60 + 1.88},
        {file: 'less3_eng-ru.mp3', pos: 60 + 3.35},
        {file: 'less3_eng-ru.mp3', pos: 60 + 5.22},
        {file: 'less3_eng-ru.mp3', pos: 60 + 7.07},
        {file: 'less3_eng-ru.mp3', pos: 60 + 9.62},
        {file: 'less3_eng-ru.mp3', pos: 60 + 11.9},
        {file: 'less3_eng-ru.mp3', pos: 60 + 13.95},
        {file: 'less3_eng-ru.mp3', pos: 60 + 15.42},
        {file: 'less3_eng-ru.mp3', pos: 60 + 17.69},
        {file: 'less3_eng-ru.mp3', pos: 60 + 19.80},
        // { file: 'less3_eng-ru.mp3', pos: 60 + 21.98},
        {file: 'less3_eng-ru.mp3', pos: 60 + 23.38},
        {file: 'less3_eng-ru.mp3', pos: 60 + 28.98},
        {file: 'less3_eng-ru.mp3', pos: 60 + 30.78},
        {file: 'less3_eng-ru.mp3', pos: 60 + 31.9},
        {file: 'less3_eng-ru.mp3', pos: 60 + 34},
        {file: 'less3_eng-ru.mp3', pos: 60 + 36.87},
        {file: 'less3_eng-ru.mp3', pos: 60 + 39.06},
        {file: 'less3_eng-ru.mp3', pos: 60 + 40.67},
        {file: 'less3_eng-ru.mp3', pos: 60 + 43.73},
        {file: 'less3_eng-ru.mp3', pos: 60 + 45.6},
        {file: 'less3_eng-ru.mp3', pos: 60 + 48.64},
        {file: 'less3_eng-ru.mp3', pos: 60 + 50.34},
        {file: 'less3_eng-ru.mp3', pos: 60 + 53.48},
        {file: 'less3_eng-ru.mp3', pos: 60 + 54.87},
        {file: 'less3_eng-ru.mp3', pos: 120 + 2.0},
        {file: 'less3_eng-ru.mp3', pos: 120 + 4.17},
        {file: 'less3_eng-ru.mp3', pos: 120 + 6.30},
        {file: 'less3_eng-ru.mp3', pos: 120 + 8.2},
        {file: 'less3_eng-ru.mp3', pos: 120 + 10.6},
        {file: 'less3_eng-ru.mp3', pos: 120 + 12.33},
        {file: 'less3_eng-ru.mp3', pos: 120 + 14.74},
        {file: 'less3_eng-ru.mp3', pos: 120 + 16.93},
        {file: 'less3_eng-ru.mp3', pos: 120 + 19.6},
        {file: 'less3_eng-ru.mp3', pos: 120 + 22.0},
        {file: 'less3_eng-ru.mp3', pos: 120 + 25.0},
        {file: 'less3_eng-ru.mp3', pos: 120 + 27.14},
        {file: 'less3_eng-ru.mp3', pos: 120 + 29.6},
        {file: 'less3_eng-ru.mp3', pos: 120 + 31.46},
        {file: 'less3_eng-ru.mp3', pos: 120 + 33.68},
    ];

    private less3Eng: any[] = [
        {file: 'less3_eng.mp3', pos: 0},
        {file: 'less3_eng.mp3', pos: 1.3},
        {file: 'less3_eng.mp3', pos: 3.52},
        {file: 'less3_eng.mp3', pos: 5.08},
        {file: 'less3_eng.mp3', pos: 6.93},
        {file: 'less3_eng.mp3', pos: 9.06},
        {file: 'less3_eng.mp3', pos: 11.65},
        {file: 'less3_eng.mp3', pos: 14.06},
        {file: 'less3_eng.mp3', pos: 16.96},
        {file: 'less3_eng.mp3', pos: 18.46},
        {file: 'less3_eng.mp3', pos: 20.25},
        {file: 'less3_eng.mp3', pos: 21.93},
        {file: 'less3_eng.mp3', pos: 23.94},
        {file: 'less3_eng.mp3', pos: 25.57},
        {file: 'less3_eng.mp3', pos: 27.55},
        {file: 'less3_eng.mp3', pos: 29.09},
        {file: 'less3_eng.mp3', pos: 31.26},
        {file: 'less3_eng.mp3', pos: 33.1},
        {file: 'less3_eng.mp3', pos: 35.12},
        {file: 'less3_eng.mp3', pos: 36.92},
        {file: 'less3_eng.mp3', pos: 38.48},
        {file: 'less3_eng.mp3', pos: 41.03},
        {file: 'less3_eng.mp3', pos: 43.36},
        {file: 'less3_eng.mp3', pos: 45.43},
        {file: 'less3_eng.mp3', pos: 48.08},
        {file: 'less3_eng.mp3', pos: 50.24},
        {file: 'less3_eng.mp3', pos: 56.32},
        {file: 'less3_eng.mp3', pos: 59.29},
        {file: 'less3_eng.mp3', pos: 60 + 2},
        {file: 'less3_eng.mp3', pos: 60 + 3.55},
        {file: 'less3_eng.mp3', pos: 60 + 5.4},
        {file: 'less3_eng.mp3', pos: 60 + 7.35},
        {file: 'less3_eng.mp3', pos: 60 + 9.92},
        {file: 'less3_eng.mp3', pos: 60 + 11.87},
        {file: 'less3_eng.mp3', pos: 60 + 13.47},
        {file: 'less3_eng.mp3', pos: 60 + 15.72},
        {file: 'less3_eng.mp3', pos: 60 + 17.99},
        {file: 'less3_eng.mp3', pos: 60 + 20.17},
        {file: 'less3_eng.mp3', pos: 60 + 22.17},
        {file: 'less3_eng.mp3', pos: 60 + 23.82},
        {file: 'less3_eng.mp3', pos: 60 + 25.75},
        {file: 'less3_eng.mp3', pos: 60 + 27.11},
        {file: 'less3_eng.mp3', pos: 60 + 29.26},
        {file: 'less3_eng.mp3', pos: 60 + 31.25},
        {file: 'less3_eng.mp3', pos: 60 + 34.07},
        {file: 'less3_eng.mp3', pos: 60 + 35.66},
        {file: 'less3_eng.mp3', pos: 60 + 38.87},
        {file: 'less3_eng.mp3', pos: 60 + 40.6},
        {file: 'less3_eng.mp3', pos: 60 + 43.48},
        {file: 'less3_eng.mp3', pos: 60 + 45.21},
        {file: 'less3_eng.mp3', pos: 60 + 48.13},
        {file: 'less3_eng.mp3', pos: 60 + 49.93},
        {file: 'less3_eng.mp3', pos: 60 + 54.45},
        {file: 'less3_eng.mp3', pos: 60 + 56.17},
        {file: 'less3_eng.mp3', pos: 60 + 58.25},
        {file: 'less3_eng.mp3', pos: 120 + 0.22},
        {file: 'less3_eng.mp3', pos: 120 + 2.66},
        {file: 'less3_eng.mp3', pos: 120 + 4.16},
        {file: 'less3_eng.mp3', pos: 120 + 6.8},
        {file: 'less3_eng.mp3', pos: 120 + 8.99},
        {file: 'less3_eng.mp3', pos: 120 + 11.57},
        {file: 'less3_eng.mp3', pos: 120 + 14.03},
        {file: 'less3_eng.mp3', pos: 120 + 17.01},
        {file: 'less3_eng.mp3', pos: 120 + 19.32},
        {file: 'less3_eng.mp3', pos: 120 + 21.18},
        {file: 'less3_eng.mp3', pos: 120 + 23.5},
        {file: 'less3_eng.mp3', pos: 120 + 25.65},
    ];

    private less4EngRu: any[] = [
        {file: 'less4_eng-ru.mp3', pos: 1.39},
        {file: 'less4_eng-ru.mp3', pos: 4.75},
        {file: 'less4_eng-ru.mp3', pos: 8.44},
        {file: 'less4_eng-ru.mp3', pos: 10.27},
        {file: 'less4_eng-ru.mp3', pos: 15.43},

        {file: 'less4_eng-ru.mp3', pos: 19.29},

        {file: 'less4_eng-ru.mp3', pos: 20.27},

        {file: 'less4_eng-ru.mp3', pos: 23.07},
        {file: 'less4_eng-ru.mp3', pos: 26.83},
        {file: 'less4_eng-ru.mp3', pos: 29.21},

        {file: 'less4_eng-ru.mp3', pos: 37.42},
        {file: 'less4_eng-ru.mp3', pos: 40.13},
        {file: 'less4_eng-ru.mp3', pos: 42.37},
        {file: 'less4_eng-ru.mp3', pos: 45.9},
        {file: 'less4_eng-ru.mp3', pos: 49.34},
        {file: 'less4_eng-ru.mp3', pos: 50.79},
        {file: 'less4_eng-ru.mp3', pos: 52.61},
        {file: 'less4_eng-ru.mp3', pos: 54.74},
        {file: 'less4_eng-ru.mp3', pos: 56.39},
        {file: 'less4_eng-ru.mp3', pos: 58.3},
        {file: 'less4_eng-ru.mp3', pos: 59.73},
        {file: 'less4_eng-ru.mp3', pos: 60 + 1.38},
        {file: 'less4_eng-ru.mp3', pos: 60 + 3.73},
        {file: 'less4_eng-ru.mp3', pos: 60 + 7.20},
        {file: 'less4_eng-ru.mp3', pos: 60 + 8.59},
        {file: 'less4_eng-ru.mp3', pos: 60 + 10.35},
        {file: 'less4_eng-ru.mp3', pos: 60 + 11.99},

        {file: 'less4_eng-ru.mp3', pos: 60 + 18.16},
        {file: 'less4_eng-ru.mp3', pos: 60 + 21.22},
        {file: 'less4_eng-ru.mp3', pos: 60 + 24.84},
        {file: 'less4_eng-ru.mp3', pos: 60 + 27.41},
        {file: 'less4_eng-ru.mp3', pos: 60 + 31.33},
        {file: 'less4_eng-ru.mp3', pos: 60 + 34.92},
        {file: 'less4_eng-ru.mp3', pos: 60 + 36.72},
        {file: 'less4_eng-ru.mp3', pos: 60 + 41.47},

        {file: 'less4_eng-ru.mp3', pos: 60 + 49.91},
        {file: 'less4_eng-ru.mp3', pos: 60 + 51.98},
        {file: 'less4_eng-ru.mp3', pos: 60 + 54.41},
        {file: 'less4_eng-ru.mp3', pos: 60 + 55.71},
        {file: 'less4_eng-ru.mp3', pos: 60 + 57.44},
        {file: 'less4_eng-ru.mp3', pos: 120 + 0.2},
        {file: 'less4_eng-ru.mp3', pos: 120 + 1.72},
        {file: 'less4_eng-ru.mp3', pos: 120 + 3.15},
        {file: 'less4_eng-ru.mp3', pos: 120 + 4.83},
        {file: 'less4_eng-ru.mp3', pos: 120 + 7.34},
        {file: 'less4_eng-ru.mp3', pos: 120 + 9.27},
        {file: 'less4_eng-ru.mp3', pos: 120 + 11.62},
        {file: 'less4_eng-ru.mp3', pos: 120 + 16.67},
        {file: 'less4_eng-ru.mp3', pos: 120 + 19.7},

        {file: 'less4_eng-ru.mp3', pos: 120 + 26.29},
        {file: 'less4_eng-ru.mp3', pos: 120 + 28.57},
        {file: 'less4_eng-ru.mp3', pos: 120 + 30.29},
        {file: 'less4_eng-ru.mp3', pos: 120 + 34.26},
        {file: 'less4_eng-ru.mp3', pos: 120 + 36.77},
        {file: 'less4_eng-ru.mp3', pos: 120 + 38.81},
        {file: 'less4_eng-ru.mp3', pos: 120 + 40.79},
        {file: 'less4_eng-ru.mp3', pos: 120 + 45.13},
        {file: 'less4_eng-ru.mp3', pos: 120 + 47.26},
        {file: 'less4_eng-ru.mp3', pos: 120 + 49.15},
    ];

    private less4Eng: any[] = [
        {file: 'less4_eng.mp3', pos: 4.35},
        {file: 'less4_eng.mp3', pos: 6.08},
        {file: 'less4_eng.mp3', pos: 9.87},
        {file: 'less4_eng.mp3', pos: 11.71},
        {file: 'less4_eng.mp3', pos: 17.09},
        {file: 'less4_eng.mp3', pos: 20.59},
        {file: 'less4_eng.mp3', pos: 21.67},
        {file: 'less4_eng.mp3', pos: 24.7},
        {file: 'less4_eng.mp3', pos: 28.47},
        {file: 'less4_eng.mp3', pos: 30.68},
        {file: 'less4_eng.mp3', pos: 33.73},

        {file: 'less4_eng.mp3', pos: 36.19},
        {file: 'less4_eng.mp3', pos: 38.36},
        {file: 'less4_eng.mp3', pos: 43.42},
        {file: 'less4_eng.mp3', pos: 46.0},
        {file: 'less4_eng.mp3', pos: 47.9},
        {file: 'less4_eng.mp3', pos: 49.81},
        {file: 'less4_eng.mp3', pos: 52.06},
        {file: 'less4_eng.mp3', pos: 53.74},
        {file: 'less4_eng.mp3', pos: 55.55},
        {file: 'less4_eng.mp3', pos: 57.04},
        {file: 'less4_eng.mp3', pos: 58.7},
        {file: 'less4_eng.mp3', pos: 60 + 1.24},
        {file: 'less4_eng.mp3', pos: 60 + 4.61},
        {file: 'less4_eng.mp3', pos: 60 + 5.95},
        {file: 'less4_eng.mp3', pos: 60 + 7.56},
        {file: 'less4_eng.mp3', pos: 60 + 9.39},
        {file: 'less4_eng.mp3', pos: 60 + 11.8},

        {file: 'less4_eng.mp3', pos: 60 + 14.39},
        {file: 'less4_eng.mp3', pos: 60 + 18.25},
        {file: 'less4_eng.mp3', pos: 60 + 21.17},
        {file: 'less4_eng.mp3', pos: 60 + 24.26},
        {file: 'less4_eng.mp3', pos: 60 + 28.36},
        {file: 'less4_eng.mp3', pos: 60 + 30.18},
        {file: 'less4_eng.mp3', pos: 60 + 36.14},
        {file: 'less4_eng.mp3', pos: 60 + 40.53},

        {file: 'less4_eng.mp3', pos: 60 + 42.57},
        {file: 'less4_eng.mp3', pos: 60 + 44.86},
        {file: 'less4_eng.mp3', pos: 60 + 46.29},
        {file: 'less4_eng.mp3', pos: 60 + 48.11},
        {file: 'less4_eng.mp3', pos: 60 + 50.74},
        {file: 'less4_eng.mp3', pos: 60 + 52.22},
        {file: 'less4_eng.mp3', pos: 60 + 53.5},
        {file: 'less4_eng.mp3', pos: 60 + 55.48},
        {file: 'less4_eng.mp3', pos: 60 + 58},
        {file: 'less4_eng.mp3', pos: 60 + 59.82},
        {file: 'less4_eng.mp3', pos: 120 + 2.25},
        {file: 'less4_eng.mp3', pos: 120 + 7.18},
        {file: 'less4_eng.mp3', pos: 120 + 9.95},
        {file: 'less4_eng.mp3', pos: 120 + 13.15},

        {file: 'less4_eng.mp3', pos: 120 + 15.21},
        {file: 'less4_eng.mp3', pos: 120 + 17.33},
        {file: 'less4_eng.mp3', pos: 120 + 20},
        {file: 'less4_eng.mp3', pos: 120 + 23.36},
        {file: 'less4_eng.mp3', pos: 120 + 25.72},
        {file: 'less4_eng.mp3', pos: 120 + 29.86},
        {file: 'less4_eng.mp3', pos: 120 + 32.97},
        {file: 'less4_eng.mp3', pos: 120 + 35.91},
        {file: 'less4_eng.mp3', pos: 120 + 37.86},
    ];

    private less1DeuRu: any[] = [
        {file: 'less1_deu-ru.mp3', pos: 8.6}, //  Das ist ein Zimmer.
        {file: 'less1_deu-ru.mp3', pos: 10.84}, // Das ist ein Tisch.'
        {file: 'less1_deu-ru.mp3', pos: 13.02}, // Das ist ein Stuhl.
        {file: 'less1_deu-ru.mp3', pos: 15.3}, // Das ist ein Sessel.
        {file: 'less1_deu-ru.mp3', pos: 18.01}, //  Das ist ein Schrank.
        {file: 'less1_deu-ru.mp3', pos: 20.29}, // Das ist ein Bett.
        {file: 'less1_deu-ru.mp3', pos: 22.83}, // Das ist eine Decke.
        {file: 'less1_deu-ru.mp3', pos: 25.61}, // Das ist eine Lampe.
        {file: 'less1_deu-ru.mp3', pos: 27.54}, // Das ist eine Bank.
        {file: 'less1_deu-ru.mp3', pos: 29.78}, //  Das ist ein Spiegel.

        {file: 'less1_deu-ru.mp3', pos: 34.62}, // Was ist das?
        {file: 'less1_deu-ru.mp3', pos: 36.59}, // Das ist eine Straße.
        {file: 'less1_deu-ru.mp3', pos: 38.67}, // Was ist das?'
        {file: 'less1_deu-ru.mp3', pos: 40.51}, // Das ist ein Haus.
        {file: 'less1_deu-ru.mp3', pos: 42.59}, // Was ist das hier?
        {file: 'less1_deu-ru.mp3', pos: 44.74}, // Das ist ein Garten.
        {file: 'less1_deu-ru.mp3', pos: 44.65}, // Und das?
        {file: 'less1_deu-ru.mp3', pos: 48.04}, // Das ist ein Baum, und dort ist ein Strauch.

        {file: 'less1_deu-ru.mp3', pos: 56.88}, // Hier ist ein Rasen.
        {file: 'less1_deu-ru.mp3', pos: 59.71}, // Das ist ein Zaun.
        {file: 'less1_deu-ru.mp3', pos: 60 + 2.36}, // Was für ein Tier ist das?
        {file: 'less1_deu-ru.mp3', pos: 60 + 5.53}, // Das ist ein Hund.
        {file: 'less1_deu-ru.mp3', pos: 60 + 7.94}, // Und was für ein Tier ist das?
        {file: 'less1_deu-ru.mp3', pos: 60 + 11.16}, // Das ist eine Katze.
        {file: 'less1_deu-ru.mp3', pos: 60 + 13.9}, // Und was ist das da oben?
        {file: 'less1_deu-ru.mp3', pos: 60 + 17.04}, // Das ist ein Vogel.
        {file: 'less1_deu-ru.mp3', pos: 60 + 19.23}, // Ist das ein Pferd?'
        {file: 'less1_deu-ru.mp3', pos: 60 + 21.59}, // Nein, das ist ein Esel.
        {file: 'less1_deu-ru.mp3', pos: 60 + 24.89}, // Hier ist eine Wohnung.
        {file: 'less1_deu-ru.mp3', pos: 60 + 27.38}, // Was ist das, bitte?
        {file: 'less1_deu-ru.mp3', pos: 60 + 29.46}, // Das ist eine Tischdecke.
        {file: 'less1_deu-ru.mp3', pos: 60 + 32.06}, //  Und was ist das hier?
        {file: 'less1_deu-ru.mp3', pos: 60 + 34.45}, // Das ist ein Teller.
        {file: 'less1_deu-ru.mp3', pos: 60 + 36.9}, // Und das ist ein Glas.
        {file: 'less1_deu-ru.mp3', pos: 60 + 39.45}, // Und was ist das, bitte?
        {file: 'less1_deu-ru.mp3', pos: 60 + 44.24}, //  Das ist eine Tasse.

        {file: 'less1_deu-ru.mp3', pos: 60 + 48.36}, // Hier ist ein Besteck:  ein Messer, eine Gabel und ein Löffel.
        {file: 'less1_deu-ru.mp3', pos: 60 + 55.51}, // Danke. Und was ist das dort?
        {file: 'less1_deu-ru.mp3', pos: 60 + 59.29}, // Das ist eine Schüssel.
        {file: 'less1_deu-ru.mp3', pos: 120 + 1.65}, // Die Schüssel ist rund.
        {file: 'less1_deu-ru.mp3', pos: 120 + 4.12}, // Was ist das hier?
        {file: 'less1_deu-ru.mp3', pos: 120 + 6.29}, // Das ist Zucker. Der Zucker ist süß.
        {file: 'less1_deu-ru.mp3', pos: 120 + 11.8}, // Was ist das hier?
        {file: 'less1_deu-ru.mp3', pos: 120 + 14.25}, // Das ist Salz und Pfeffer.
        {file: 'less1_deu-ru.mp3', pos: 120 + 17.58}, // Das Salz ist salzig.
        {file: 'less1_deu-ru.mp3', pos: 120 + 20.30}, // Und das hier?
        {file: 'less1_deu-ru.mp3', pos: 120 + 22.57}, // Das ist Essig und Öl.
        {file: 'less1_deu-ru.mp3', pos: 120 + 25.18}, // Der Essig ist sauer.
        {file: 'less1_deu-ru.mp3', pos: 120 + 27.78}, // Das Öl ist fettig.
        {file: 'less1_deu-ru.mp3', pos: 120 + 30.26}, // Und was ist das, bitte?
        {file: 'less1_deu-ru.mp3', pos: 120 + 33.03}, // Das ist Brot und Butter.
        {file: 'less1_deu-ru.mp3', pos: 120 + 36.07}, // Das Brot ist schwarz, die Butter is frisch.
        {file: 'less1_deu-ru.mp3', pos: 120 + 40.85}, // Danke!

        {file: 'less1_deu-ru.mp3', pos: 120 + 47.98}, // Das ist eine Familie.
        {file: 'less1_deu-ru.mp3', pos: 120 + 51.02}, // Das ist der Vater, das ist die Mutter.
        {file: 'less1_deu-ru.mp3', pos: 120 + 55.58}, // Das sind die Kinder: das ist der Sohn, das ist die Tochter.
        {file: 'less1_deu-ru.mp3', pos: 180 + 2.69}, //  Vater und Mutter sind die Eltern. Sie sind gut.
        {file: 'less1_deu-ru.mp3', pos: 180 + 8.83}, // Der Vater heißt Herr Kröger. Die Mutter heißt Frau Kröger. Die Geschwister heißen Fritz und Karin Kröger. Sie lernen gut.
        {file: 'less1_deu-ru.mp3', pos: 180 + 22.75}, //  Karin lernt sehr gut.
        {file: 'less1_deu-ru.mp3', pos: 180 + 25.59}, // Sie treiben auch Sport.
    ];

    private less1Deu: any[] = [
        {file: 'less1_deu.mp3', pos: 10.88}, //  Das ist ein Zimmer.
        {file: 'less1_deu.mp3', pos: 12.98}, // Das ist ein Tisch.'
        {file: 'less1_deu.mp3', pos: 15.43}, // Das ist ein Stuhl.
        {file: 'less1_deu.mp3', pos: 17.40}, // Das ist ein Sessel.
        {file: 'less1_deu.mp3', pos: 20.24}, //  Das ist ein Schrank.
        {file: 'less1_deu.mp3', pos: 22.46}, // Das ist ein Bett.
        {file: 'less1_deu.mp3', pos: 24.92}, // Das ist eine Decke.
        {file: 'less1_deu.mp3', pos: 27.18}, // Das ist eine Lampe.
        {file: 'less1_deu.mp3', pos: 29.53}, // Das ist eine Bank.
        {file: 'less1_deu.mp3', pos: 31.66}, //  Das ist ein Spiegel.

        {file: 'less1_deu.mp3', pos: 36.92}, // Was ist das?
        {file: 'less1_deu.mp3', pos: 38.76}, // Das ist eine Straße.
        {file: 'less1_deu.mp3', pos: 41.09}, // Was ist das?'
        {file: 'less1_deu.mp3', pos: 42.83}, // Das ist ein Haus.
        {file: 'less1_deu.mp3', pos: 44.67}, // Was ist das hier?
        {file: 'less1_deu.mp3', pos: 46.93}, // Das ist ein Garten.
        {file: 'less1_deu.mp3', pos: 48.9}, // Und das?
        {file: 'less1_deu.mp3', pos: 50.25}, // Das ist ein Baum, und dort ist ein Strauch.

        {file: 'less1_deu.mp3', pos: 60 + 0.52}, // Hier ist ein Rasen.
        {file: 'less1_deu.mp3', pos: 60 + 3.2}, // Das ist ein Zaun.
        {file: 'less1_deu.mp3', pos: 60 + 5.84}, // Was für ein Tier ist das?
        {file: 'less1_deu.mp3', pos: 60 + 9.07}, // Das ist ein Hund.
        {file: 'less1_deu.mp3', pos: 60 + 11.52}, // Und was für ein Tier ist das?
        {file: 'less1_deu.mp3', pos: 60 + 14.78}, // Das ist eine Katze.
        {file: 'less1_deu.mp3', pos: 60 + 17.50}, // Und was ist das da oben?
        {file: 'less1_deu.mp3', pos: 60 + 20.56}, // Das ist ein Vogel.
        {file: 'less1_deu.mp3', pos: 60 + 22.82}, // Ist das ein Pferd?'
        {file: 'less1_deu.mp3', pos: 60 + 25.15}, // Nein, das ist ein Esel.
        {file: 'less1_deu.mp3', pos: 60 + 32.70}, // Hier ist eine Wohnung.
        {file: 'less1_deu.mp3', pos: 60 + 35.31}, // Was ist das, bitte?
        {file: 'less1_deu.mp3', pos: 60 + 37.64}, // Das ist eine Tischdecke.
        {file: 'less1_deu.mp3', pos: 60 + 40.12}, //  Und was ist das hier?
        {file: 'less1_deu.mp3', pos: 60 + 42.38}, // Das ist ein Teller.
        {file: 'less1_deu.mp3', pos: 60 + 44.93}, // Und das ist ein Glas.
        {file: 'less1_deu.mp3', pos: 60 + 47.51}, // Und was ist das, bitte?
        {file: 'less1_deu.mp3', pos: 60 + 50.45}, //  Das ist eine Tasse.

        {file: 'less1_deu.mp3', pos: 60 + 56.87}, // Hier ist ein Besteck:  ein Messer, eine Gabel und ein Löffel.
        {file: 'less1_deu.mp3', pos: 120 + 4.23}, // Danke. Und was ist das dort?
        {file: 'less1_deu.mp3', pos: 120 + 7.94}, // Das ist eine Schüssel.
        {file: 'less1_deu.mp3', pos: 120 + 10.40}, // Die Schüssel ist rund.
        {file: 'less1_deu.mp3', pos: 120 + 12.75}, // Was ist das hier?
        {file: 'less1_deu.mp3', pos: 120 + 14.95}, // Das ist Zucker. Der Zucker ist süß.
        {file: 'less1_deu.mp3', pos: 120 + 20.34}, // Was ist das hier?
        {file: 'less1_deu.mp3', pos: 120 + 22.92}, // Das ist Salz und Pfeffer.
        {file: 'less1_deu.mp3', pos: 120 + 26.15}, // Das Salz ist salzig.
        {file: 'less1_deu.mp3', pos: 120 + 28.96}, // Und das hier?
        {file: 'less1_deu.mp3', pos: 120 + 30.80}, // Das ist Essig und Öl.
        {file: 'less1_deu.mp3', pos: 120 + 33.70}, // Der Essig ist sauer.
        {file: 'less1_deu.mp3', pos: 120 + 36.41}, // Das Öl ist fettig.
        {file: 'less1_deu.mp3', pos: 120 + 38.99}, // Und was ist das, bitte?
        {file: 'less1_deu.mp3', pos: 120 + 41.64}, // Das ist Brot und Butter.
        {file: 'less1_deu.mp3', pos: 120 + 44.68}, // Das Brot ist schwarz, die Butter is frisch.
        {file: 'less1_deu.mp3', pos: 120 + 49.52}, // Danke!

        {file: 'less1_deu.mp3', pos: 120 + 56.59}, // Das ist eine Familie.
        {file: 'less1_deu.mp3', pos: 120 + 59.59}, // Das ist der Vater, das ist die Mutter.
        {file: 'less1_deu.mp3', pos: 180 + 4.36}, // Das sind die Kinder: das ist der Sohn, das ist die Tochter.
        {file: 'less1_deu.mp3', pos: 180 + 11.37}, //  Vater und Mutter sind die Eltern. Sie sind gut.
        {file: 'less1_deu.mp3', pos: 180 + 17.92}, // Der Vater heißt Herr Kröger. Die Mutter heißt Frau Kröger. Die Geschwister heißen Fritz und Karin Kröger. Sie lernen gut.
        {file: 'less1_deu.mp3', pos: 180 + 31.83}, //  Karin lernt sehr gut.
        {file: 'less1_deu.mp3', pos: 180 + 34.70}, // Sie treiben auch Sport.
    ];

    private less2DeuRu: any[] = [
        {file: 'less2_deu-ru.mp3', pos: 0}, // Guten Tag, Frau Kröger!
        {file: 'less2_deu-ru.mp3', pos: 3.49}, // Guten Tag, Frau Nowak, wieder in Berlin?
        {file: 'less2_deu-ru.mp3', pos: 7.25}, // Ja, wieder in Berlin.
        {file: 'less2_deu-ru.mp3', pos: 10.22}, // Wo ist Herr Kröger?
        {file: 'less2_deu-ru.mp3', pos: 12.34}, // Er kommt gleich.
        {file: 'less2_deu-ru.mp3', pos: 14.35}, // Und wo ist Fritz?
        {file: 'less2_deu-ru.mp3', pos: 16.2}, // Fritz ist nebenan.
        {file: 'less2_deu-ru.mp3', pos: 18.59}, // Und wo ist Fräulein Karin?
        {file: 'less2_deu-ru.mp3', pos: 21.13}, // Karin studiert in Moskau. Kennen Sie Karin?
        {file: 'less2_deu-ru.mp3', pos: 26.21}, // Nein, leider nicht. Wie ist sie den
        {file: 'less2_deu-ru.mp3', pos: 30.87}, // Wollen sie eine Beschreibung?
        {file: 'less2_deu-ru.mp3', pos: 38.55}, // Die Haare sind blond und glatt.
        {file: 'less2_deu-ru.mp3', pos: 42.10}, // Die Augen sind braun. Der Mund ist klein und schmal, die Nase ist gerade.
        {file: 'less2_deu-ru.mp3', pos: 51.15}, // Wie ist die Stirn, wie sind die Ohren?
        {file: 'less2_deu-ru.mp3', pos: 55.3}, // Die Stirn ist hoch, die Ohren sind zierlich.
        {file: 'less2_deu-ru.mp3', pos: 60 + 0.36}, // Ist sie blaß?
        {file: 'less2_deu-ru.mp3', pos: 60 + 2.11}, // Nein, die Wangen sind rosig, die Zähne sind weiß.
        {file: 'less2_deu-ru.mp3', pos: 60 + 8.52}, // Die Hände sind schmal, und die Füße sind klein.
        {file: 'less2_deu-ru.mp3', pos: 60 + 13.50}, // Die Beine sind schlank und lang.
        {file: 'less2_deu-ru.mp3', pos: 60 + 17.04}, // Sie ist also schon von Kopf bis Fuß.
        {file: 'less2_deu-ru.mp3', pos: 60 + 21.18}, // Ja, das ist sie!
    ];

    private less2Deu: any[] = [
        {file: 'less2_deu.mp3', pos: 0}, // Guten Tag, Frau Kröger!
        {file: 'less2_deu.mp3', pos: 2.99}, // Guten Tag, Frau Nowak, wieder in Berlin?
        {file: 'less2_deu.mp3', pos: 6.68}, // Ja, wieder in Berlin.
        {file: 'less2_deu.mp3', pos: 9.53}, // Wo ist Herr Kröger?
        {file: 'less2_deu.mp3', pos: 11.72}, // Er kommt gleich.
        {file: 'less2_deu.mp3', pos: 13.82}, // Und wo ist Fritz?
        {file: 'less2_deu.mp3', pos: 15.66}, // Fritz ist nebenan.
        {file: 'less2_deu.mp3', pos: 18.01}, // Und wo ist Fräulein Karin?
        {file: 'less2_deu.mp3', pos: 20.70}, // Karin studiert in Moskau. Kennen Sie Karin?
        {file: 'less2_deu.mp3', pos: 25.49}, // Nein, leider nicht. Wie ist sie den
        {file: 'less2_deu.mp3', pos: 30.43}, // Wollen sie eine Beschreibung?
        {file: 'less2_deu.mp3', pos: 36.96}, // Die Haare sind blond und glatt.
        {file: 'less2_deu.mp3', pos: 40.65}, // Die Augen sind braun. Der Mund ist klein und schmal, die Nase ist gerade.
        {file: 'less2_deu.mp3', pos: 50.03}, // Wie ist die Stirn, wie sind die Ohren?
        {file: 'less2_deu.mp3', pos: 53.97}, // Die Stirn ist hoch, die Ohren sind zierlich.
        {file: 'less2_deu.mp3', pos: 58.91}, // Ist sie blaß?
        {file: 'less2_deu.mp3', pos: 60 + 0.7}, // Nein, die Wangen sind rosig, die Zähne sind weiß.
        {file: 'less2_deu.mp3', pos: 60 + 7.14}, // Die Hände sind schmal, und die Füße sind klein.
        {file: 'less2_deu.mp3', pos: 60 + 12.17}, // Die Beine sind schlank und lang.
        {file: 'less2_deu.mp3', pos: 60 + 15.77}, // Sie ist also schon von Kopf bis Fuß.
        {file: 'less2_deu.mp3', pos: 60 + 19.86}, // Ja, das ist sie!
    ];

    private less1FreRu: any[] = [
        {file: 'less1_fre-ru.mp3', pos: 6.6}, // Une famille
        {file: 'less1_fre-ru.mp3', pos: 9.37}, // Voici un homme.
        {file: 'less1_fre-ru.mp3', pos: 11.95}, // C’est monsieur Jacques Vernet.
        {file: 'less1_fre-ru.mp3', pos: 15.06}, // Monsieur Jacques Vernet est un homme.
        {file: 'less1_fre-ru.mp3', pos: 18.99}, // Voici une femme.
        {file: 'less1_fre-ru.mp3', pos: 21.23}, // C’est madame Jeanne Vernet.
        {file: 'less1_fre-ru.mp3', pos: 24.92}, // Madame Jeanne Vernet est une femme.
        {file: 'less1_fre-ru.mp3', pos: 29.2}, // Voici un garçon. C’est Pierre.
        {file: 'less1_fre-ru.mp3', pos: 33.74}, // Pierre est un garçon.
        {file: 'less1_fre-ru.mp3', pos: 36.64}, // Voici une fille.

        {file: 'less1_fre-ru.mp3', pos: 39.22}, // C’est Françoise.
        {file: 'less1_fre-ru.mp3', pos: 41.52}, // Françoise est une fille.
        {file: 'less1_fre-ru.mp3', pos: 44.36}, // C’est une famille.'
// PAGE

        {file: 'less1_fre-ru.mp3', pos: 51.78}, // Qui est cet homme?
        {file: 'less1_fre-ru.mp3', pos: 54.84}, // C’est monsieur Jacques Vernet.
        {file: 'less1_fre-ru.mp3', pos: 58.03}, // Et qui est cette dame?
        {file: 'less1_fre-ru.mp3', pos: 60 + 0.2}, // C’est madame Jeanne Vernet.
        {file: 'less1_fre-ru.mp3', pos: 60 + 3.69}, // Et ce jeune homme?
        {file: 'less1_fre-ru.mp3', pos: 60 + 5.62}, // C’est Jean.
        {file: 'less1_fre-ru.mp3', pos: 60 + 7.46}, // Qui est Jean?

        {file: 'less1_fre-ru.mp3', pos: 60 + 8.73}, // Jean est mon ami.
        {file: 'less1_fre-ru.mp3', pos: 60 + 11.33}, // Et qui est cette jeune fille, là-bas?
        {file: 'less1_fre-ru.mp3', pos: 60 + 13.83}, // Cette jeune fille, c’est Francoise.
        {file: 'less1_fre-ru.mp3', pos: 60 + 18.16}, // C’est une famille.
// PAGE

        {file: 'less1_fre-ru.mp3', pos: 60 + 24.61}, // Une chambre
        {file: 'less1_fre-ru.mp3', pos: 60 + 27.69}, // Voici une chambre.
        {file: 'less1_fre-ru.mp3', pos: 60 + 30.75}, // C’est une chambre.
        {file: 'less1_fre-ru.mp3', pos: 60 + 33.03}, // Et voici des meubles.
        {file: 'less1_fre-ru.mp3', pos: 60 + 35.36}, // Ce sont des meubles.
        {file: 'less1_fre-ru.mp3', pos: 60 + 37.95}, // Qu’est-ce que c’est?

        {file: 'less1_fre-ru.mp3', pos: 60 + 39.94}, // C’est une phono, et voici des disques.
        {file: 'less1_fre-ru.mp3', pos: 60 + 45.13}, // Voici une étagère et des livres.
        {file: 'less1_fre-ru.mp3', pos: 60 + 49.04}, // Et voici des cahiers, des crayons et des papiers.
        {file: 'less1_fre-ru.mp3', pos: 60 + 54.67}, // Ce sont des cahiers, des crayons   et des papiers.

// page
        {file: 'less1_fre-ru.mp3', pos: 120 + 4.50}, // Voici une chambre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 7.67}, // C’est la chambre de Pierre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 10.67}, // Voici le plafond, le plancher, les murs, la porte et les fenêtres de la chambre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 19.18}, // C’est le plafond.
        {file: 'less1_fre-ru.mp3', pos: 120 + 21.66}, // C’est le plancher.
        {file: 'less1_fre-ru.mp3', pos: 120 + 23.99}, // Ce sont les murs.

        {file: 'less1_fre-ru.mp3', pos: 120 + 25.85}, // C’est la porte.
        {file: 'less1_fre-ru.mp3', pos: 120 + 27.41}, // Ce sont les fenêtres.
        {file: 'less1_fre-ru.mp3', pos: 120 + 29.82}, // Voici la table et les livres de Pierre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 33.93}, // C’est la table et ce sont les livres de Pierre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 38.87}, // Et voici une photo. C’est la photo d’André.
        {file: 'less1_fre-ru.mp3', pos: 120 + 43.72}, // Qui est André?
        {file: 'less1_fre-ru.mp3', pos: 120 + 45.09}, // André est un ami de Pierre.

// page
        {file: 'less1_fre-ru.mp3', pos: 120 + 53.08}, // Pierre est dans la chambre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 56.23}, // C’est la chambre de Pierre.
        {file: 'less1_fre-ru.mp3', pos: 120 + 59.13}, // Dans la chambre, il y a une table, une étagère, et quelques chaises.

        {file: 'less1_fre-ru.mp3', pos: 180 + 5.56}, // Sur le plancher, il y a un tapis.
        {file: 'less1_fre-ru.mp3', pos: 180 + 10.04}, // Sur le mur, il y a des tableaux.
        {file: 'less1_fre-ru.mp3', pos: 180 + 13.24}, // Ou est Pierre?
        {file: 'less1_fre-ru.mp3', pos: 180 + 15.43}, // Il est assis devant la table.
        {file: 'less1_fre-ru.mp3', pos: 180 + 18.41}, // Sur la table, devant Pierre, il y a des livres, des cahiers, et des crayons.
        {file: 'less1_fre-ru.mp3', pos: 180 + 26.94}, // Derrière la chaise, sur le tapis, est couché Néro, le chien de Pierre.
    ];

    private less2FreRu: any[] = [
        {file: 'less2_fre-ru.mp3', pos: 0}, // Bonjour
        {file: 'less2_fre-ru.mp3', pos: 2.42}, // Bonjour Pierre!
        {file: 'less2_fre-ru.mp3', pos: 5.08}, // Bonjour mon vieux.
        {file: 'less2_fre-ru.mp3', pos: 7.55}, // Tu es tout seul?

        {file: 'less2_fre-ru.mp3', pos: 9.52}, // Oui, je suis tout seul pour le moment.
        {file: 'less2_fre-ru.mp3', pos: 12.86}, // Et où sont les autres? Où est monsieur Vernet?
        {file: 'less2_fre-ru.mp3', pos: 17.46}, // Oh, il est absent.
        {file: 'less2_fre-ru.mp3', pos: 19.88}, // Et Suzanne, où est-ce qu’elle est?
        {file: 'less2_fre-ru.mp3', pos: 22.87}, // Suzanne? Elle est à la maison. Mais tiens, la voici.
        {file: 'less2_fre-ru.mp3', pos: 27.68}, // Bonjour, Jacques.
        {file: 'less2_fre-ru.mp3', pos: 29.31}, // Bonjour, Pierre.
        {file: 'less2_fre-ru.mp3', pos: 31.37}, // Bonjour, Suzanne.
        {file: 'less2_fre-ru.mp3', pos: 33.56}, // Vous êtes enfin tous les deux ensemble. Quelle chance! Allons faire une partie de croquet.

        {file: 'less2_fre-ru.mp3', pos: 46.6}, // Pardon monsieur!

        {file: 'less2_fre-ru.mp3', pos: 49}, // Qu’y a-t-il pour votre service, mademoiselle?
        {file: 'less2_fre-ru.mp3', pos: 52.34}, // Êtes-vous monsieur Paul Vernet?
        {file: 'less2_fre-ru.mp3', pos: 55.34}, // Oui, mademoiselle, je suis Paul Vernet.
        {file: 'less2_fre-ru.mp3', pos: 58.68}, // Vous êtes l’ami de Pierre?
        {file: 'less2_fre-ru.mp3', pos: 60 + 0.56}, // Oui, mademoiselle, je suis l’ami de Pierre.
        {file: 'less2_fre-ru.mp3', pos: 60 + 3.88}, // Alors vous êtes l’homme que je cherche.
        {file: 'less2_fre-ru.mp3', pos: 60 + 7.29}, // Est-ce que vous êtes mademoiselle Françoise Dubois, la soeur de Pierre?
        {file: 'less2_fre-ru.mp3', pos: 60 + 12.08}, // Oui, je suis Françoise Dubois.
        {file: 'less2_fre-ru.mp3', pos: 60 + 15.32}, //  Je suis enchanté de faire votre connaissance, mademoiselle.
        {file: 'less2_fre-ru.mp3', pos: 60 + 24.96}, // Une photo

        {file: 'less2_fre-ru.mp3', pos: 60 + 27.72}, // Voici la photo de mon fiancé.
        {file: 'less2_fre-ru.mp3', pos: 60 + 32.12}, // Quel est son nom?
        {file: 'less2_fre-ru.mp3', pos: 60 + 34.62}, // Son nom est Paul.
        {file: 'less2_fre-ru.mp3', pos: 60 + 37.4}, // Est-ce qu’il est grand?
        {file: 'less2_fre-ru.mp3', pos: 60 + 39.94}, //  Oui, il est grand et fort.
        {file: 'less2_fre-ru.mp3', pos: 60 + 44.38}, // Et quelle est la couleur de ses yeux et de ses cheveux?
        {file: 'less2_fre-ru.mp3', pos: 60 + 49.46}, // Ses yeux sont noirs et ses cheveux sont bruns.
        {file: 'less2_fre-ru.mp3', pos: 60 + 55.34}, // C’est un joli garçon.
        {file: 'less2_fre-ru.mp3', pos: 60 + 58.15}, // Et voici maintenant la photo de la fianceé de mon frère.
        {file: 'less2_fre-ru.mp3', pos: 120 + 4.26}, // Est-ce qu’elle est jolie?

        {file: 'less2_fre-ru.mp3', pos: 120 + 7.15}, // Elle n’est pas jolie, mais elle est intelligente.

        {file: 'less2_fre-ru.mp3', pos: 120 + 15.9}, // Où sont vos enfants, madame?
        {file: 'less2_fre-ru.mp3', pos: 120 + 19.33}, // Pierre est à l’école et Françoise, est à la maison.
        {file: 'less2_fre-ru.mp3', pos: 120 + 25.08}, // Est-ce que vous êtes contente de vos enfants?
        {file: 'less2_fre-ru.mp3', pos: 120 + 28.72}, // Je suis très contente de mon fils: il est gai et gentil, mais je ne suis pas très contente de ma fille: elle est un peu paresseuse. Voici la photo de mes  enfants avec leur père.
        {file: 'less2_fre-ru.mp3', pos: 120 + 47.58}, //  Françoise est belle, n’est-ce pas?
        {file: 'less2_fre-ru.mp3', pos: 120 + 50.99}, // Oui, elle est blonde et grande. Ses yeux sont bleus et ses sourcils sont épais et noirs.
        {file: 'less2_fre-ru.mp3', pos: 180 + 0.96}, // Et Pierre?
        {file: 'less2_fre-ru.mp3', pos: 180 + 2.34}, // Pierre n’est ni beau ni laid.
        {file: 'less2_fre-ru.mp3', pos: 180 + 5.93}, // Son front est haut, son nez est pointu, sa bouche est grande, son menton est carré. C’est un joli garçon quand même.

// page
        {file: 'less2_fre-ru.mp3', pos: 180 + 21}, // Les projets
        {file: 'less2_fre-ru.mp3', pos: 180 + 24.36}, // Tu as congé aujourd’hui, n’est-ce pas, Suzanne?
        {file: 'less2_fre-ru.mp3', pos: 180 + 28.55}, // Oui, j’ai congé aujourd’hui et demain.
        {file: 'less2_fre-ru.mp3', pos: 180 + 33.24}, // Alors j’ai une idée.
        {file: 'less2_fre-ru.mp3', pos: 180 + 35.78}, // Et quelle est cette idée?
        {file: 'less2_fre-ru.mp3', pos: 180 + 38.61}, // Mes amis ont une maison à la campagne et, comme nous avons deux jours libres,   nous pouvons y passer un weekend merveilleux.
        {file: 'less2_fre-ru.mp3', pos: 180 + 52.74}, // Oui, tu as raison, ton idée est vraiment bonne. Eh bien moi, j’ai aussi une idée.
// page
        {file: 'less2_fre-ru.mp3', pos: 240 + 3.38}, // Tu sais, Georges a une voiture et nous pouvons y aller tous ensemble en auto.
        {file: 'less2_fre-ru.mp3', pos: 240 + 12.04}, // C’est parfait, je suis entièrement d’accord, d’autant plus que Georges et toi, vous avez beacoup de choses à vous dire.
    ];

    private less1Fre: any[] = [
        {file: 'less1_fre.mp3', pos: 0}, // Une famille
        {file: 'less1_fre.mp3', pos: 5.72}, // Voici un homme.
        {file: 'less1_fre.mp3', pos: 8.56}, // C’est monsieur Jacques Vernet.
        {file: 'less1_fre.mp3', pos: 11.68}, // Monsieur Jacques Vernet est un homme.
        {file: 'less1_fre.mp3', pos: 15.54}, // Voici une femme.
        {file: 'less1_fre.mp3', pos: 18.62}, // C’est madame Jeanne Vernet.
        {file: 'less1_fre.mp3', pos: 21.45}, // Madame Jeanne Vernet est une femme.
        {file: 'less1_fre.mp3', pos: 25.74}, // Voici un garçon. C’est Pierre.
        {file: 'less1_fre.mp3', pos: 30.34}, // Pierre est un garçon.
        {file: 'less1_fre.mp3', pos: 33.03}, // Voici une fille.

        {file: 'less1_fre.mp3', pos: 35.89}, // C’est Françoise.
        {file: 'less1_fre.mp3', pos: 38.17}, // Françoise est une fille.
        {file: 'less1_fre.mp3', pos: 41.28}, // C’est une famille.'
// PAGE

        {file: 'less1_fre.mp3', pos: 46.70}, // Qui est cet homme?
        {file: 'less1_fre.mp3', pos: 49.2}, // C’est monsieur Jacques Vernet.
        {file: 'less1_fre.mp3', pos: 52.23}, // Et qui est cette dame?
        {file: 'less1_fre.mp3', pos: 54.86}, // C’est madame Jeanne Vernet.
        {file: 'less1_fre.mp3', pos: 58.14}, // Et ce jeune homme?
        {file: 'less1_fre.mp3', pos: 59.99}, // C’est Jean.
        {file: 'less1_fre.mp3', pos: 60 + 1.77}, // Qui est Jean?

        {file: 'less1_fre.mp3', pos: 60 + 3.38}, // Jean est mon ami.
        {file: 'less1_fre.mp3', pos: 60 + 5.97}, // Et qui est cette jeune fille, là-bas?
        {file: 'less1_fre.mp3', pos: 60 + 8.91}, // Cette jeune fille, c’est Francoise.
        {file: 'less1_fre.mp3', pos: 60 + 12.75}, // C’est une famille.
// PAGE

        {file: 'less1_fre.mp3', pos: 60 + 18.46}, // Une chambre
        {file: 'less1_fre.mp3', pos: 60 + 21.16}, // Voici une chambre.
        {file: 'less1_fre.mp3', pos: 60 + 23.74}, // C’est une chambre.
        {file: 'less1_fre.mp3', pos: 60 + 26.19}, // Et voici des meubles.
        {file: 'less1_fre.mp3', pos: 60 + 28.69}, // Ce sont des meubles.
        {file: 'less1_fre.mp3', pos: 60 + 31.31}, // Qu’est-ce que c’est?

        {file: 'less1_fre.mp3', pos: 60 + 33.41}, // C’est une phono, et voici des disques.
        {file: 'less1_fre.mp3', pos: 60 + 38.64}, // Voici une étagère et des livres.
        {file: 'less1_fre.mp3', pos: 60 + 42.33}, // Et voici des cahiers, des crayons et des papiers.
        {file: 'less1_fre.mp3', pos: 60 + 48.47}, // Ce sont des cahiers, des crayons   et des papiers.

        {file: 'less1_fre.mp3', pos: 60 + 56.6}, // Voici une chambre.
        {file: 'less1_fre.mp3', pos: 60 + 59.3}, // C’est la chambre de Pierre.
        {file: 'less1_fre.mp3', pos: 120 + 2.18}, // Voici le plafond, le plancher, les murs, la porte et les fenêtres de la chambre.
        {file: 'less1_fre.mp3', pos: 120 + 10.94}, // C’est le plafond.
        {file: 'less1_fre.mp3', pos: 120 + 13.32}, // C’est le plancher.
        {file: 'less1_fre.mp3', pos: 120 + 15.01}, // Ce sont les murs.

        {file: 'less1_fre.mp3', pos: 120 + 17.26}, // C’est la porte.
        {file: 'less1_fre.mp3', pos: 120 + 19.19}, // Ce sont les fenêtres.
        {file: 'less1_fre.mp3', pos: 120 + 21.44}, // Voici la table et les livres de Pierre.
        {file: 'less1_fre.mp3', pos: 120 + 25.39}, // C’est la table et ce sont les livres de Pierre.
        {file: 'less1_fre.mp3', pos: 120 + 30.49}, // Et voici une photo. C’est la photo d’André.
        {file: 'less1_fre.mp3', pos: 120 + 35.14}, // Qui est André?
        {file: 'less1_fre.mp3', pos: 120 + 36.78}, // André est un ami de Pierre.

        {file: 'less1_fre.mp3', pos: 120 + 43.14}, // Pierre est dans la chambre.
        {file: 'less1_fre.mp3', pos: 120 + 45.99}, // C’est la chambre de Pierre.
        {file: 'less1_fre.mp3', pos: 120 + 48.9}, // Dans la chambre, il y a une table, une étagère, et quelques chaises.

        {file: 'less1_fre.mp3', pos: 120 + 55.19}, // Sur le plancher, il y a un tapis.
        {file: 'less1_fre.mp3', pos: 120 + 59.5}, // Sur le mur, il y a des tableaux.
        {file: 'less1_fre.mp3', pos: 180 + 2.98}, // Ou est Pierre?
        {file: 'less1_fre.mp3', pos: 180 + 5.13}, // Il est assis devant la table.
        {file: 'less1_fre.mp3', pos: 180 + 8.31}, // Sur la table, devant Pierre, il y a des livres, des cahiers, et des crayons.
        {file: 'less1_fre.mp3', pos: 180 + 16.56}, // Derrière la chaise, sur le tapis, est couché Néro, le chien de Pierre.
    ];

    private less2Fre: any[] = [
        {file: 'less2_fre.mp3', pos: 0}, // Bonjour
        {file: 'less2_fre.mp3', pos: 2.82}, // Bonjour Pierre!
        {file: 'less2_fre.mp3', pos: 5.06}, // Bonjour mon vieux.
        {file: 'less2_fre.mp3', pos: 7.53}, // Tu es tout seul?

        {file: 'less2_fre.mp3', pos: 9.66}, // Oui, je suis tout seul pour le moment.
        {file: 'less2_fre.mp3', pos: 13.03}, // Et où sont les autres? Où est monsieur Vernet?
        {file: 'less2_fre.mp3', pos: 17.6}, // Oh, il est absent.
        {file: 'less2_fre.mp3', pos: 20.09}, // Et Suzanne, où est-ce qu’elle est?
        {file: 'less2_fre.mp3', pos: 23.0}, // Suzanne? Elle est à la maison. Mais tiens, la voici.
        {file: 'less2_fre.mp3', pos: 28.25}, // Bonjour, Jacques.
        {file: 'less2_fre.mp3', pos: 29.87}, // Bonjour, Pierre.
        {file: 'less2_fre.mp3', pos: 31.62}, // Bonjour, Suzanne.
        {file: 'less2_fre.mp3', pos: 33.66}, // Vous êtes enfin tous les deux ensemble. Quelle chance! Allons faire une partie de croquet.

        {file: 'less2_fre.mp3', pos: 46.67}, // Pardon monsieur!

        {file: 'less2_fre.mp3', pos: 48.98}, // Qu’y a-t-il pour votre service, mademoiselle?
        {file: 'less2_fre.mp3', pos: 52.41}, // Êtes-vous monsieur Paul Vernet?
        {file: 'less2_fre.mp3', pos: 55.35}, // Oui, mademoiselle, je suis Paul Vernet.
        {file: 'less2_fre.mp3', pos: 58.61}, // Vous êtes l’ami de Pierre?
        {file: 'less2_fre.mp3', pos: 60 + 0.78}, // Oui, mademoiselle, je suis l’ami de Pierre.
        {file: 'less2_fre.mp3', pos: 60 + 3.98}, // Alors vous êtes l’homme que je cherche.
        {file: 'less2_fre.mp3', pos: 60 + 6.92}, // Est-ce que vous êtes mademoiselle Françoise Dubois, la soeur de Pierre?
        {file: 'less2_fre.mp3', pos: 60 + 12.04}, // Oui, je suis Françoise Dubois.
        {file: 'less2_fre.mp3', pos: 60 + 15.27}, //  Je suis enchanté de faire votre connaissance, mademoiselle.
        {file: 'less2_fre.mp3', pos: 60 + 24.62}, // Une photo

        {file: 'less2_fre.mp3', pos: 60 + 27.44}, // Voici la photo de mon fiancé.
        {file: 'less2_fre.mp3', pos: 60 + 31.68}, // Quel est son nom?
        {file: 'less2_fre.mp3', pos: 60 + 34.18}, // Son nom est Paul.
        {file: 'less2_fre.mp3', pos: 60 + 37.16}, // Est-ce qu’il est grand?
        {file: 'less2_fre.mp3', pos: 60 + 39.58}, //  Oui, il est grand et fort.
        {file: 'less2_fre.mp3', pos: 60 + 44.18}, // Et quelle est la couleur de ses yeux et de ses cheveux?
        {file: 'less2_fre.mp3', pos: 60 + 49.26}, // Ses yeux sont noirs et ses cheveux sont bruns.
        {file: 'less2_fre.mp3', pos: 60 + 54.81}, // C’est un joli garçon.
        {file: 'less2_fre.mp3', pos: 60 + 57.67}, // Et voici maintenant la photo de la fianceé de mon frère.
        {file: 'less2_fre.mp3', pos: 120 + 4.16}, // Est-ce qu’elle est jolie?

        {file: 'less2_fre.mp3', pos: 120 + 6.63}, // Elle n’est pas jolie, mais elle est intelligente.

// page
        {file: 'less2_fre.mp3', pos: 120 + 15.62}, // Où sont vos enfants, madame?
        {file: 'less2_fre.mp3', pos: 120 + 18.66}, // Pierre est à l’école et Françoise, est à la maison.
        {file: 'less2_fre.mp3', pos: 120 + 24.44}, // Est-ce que vous êtes contente de vos enfants?
        {file: 'less2_fre.mp3', pos: 120 + 28.15}, // Je suis très contente de mon fils: il est gai et gentil, mais je ne suis pas très contente de ma fille: elle est un peu paresseuse. Voici la photo de mes  enfants avec leur père.
        {file: 'less2_fre.mp3', pos: 120 + 48.73}, //  Françoise est belle, n’est-ce pas?
        {file: 'less2_fre.mp3', pos: 120 + 51.61}, // Oui, elle est blonde et grande. Ses yeux sont bleus et ses sourcils sont épais et noirs.
        {file: 'less2_fre.mp3', pos: 180 + 1.43}, // Et Pierre?
        {file: 'less2_fre.mp3', pos: 180 + 2.9}, // Pierre n’est ni beau ni laid.
        {file: 'less2_fre.mp3', pos: 180 + 6.49}, // Son front est haut, son nez est pointu, sa bouche est grande, son menton est carré. C’est un joli garçon quand même.

        {file: 'less2_fre.mp3', pos: 180 + 22.17}, // Les projets
        {file: 'less2_fre.mp3', pos: 180 + 24.82}, // Tu as congé aujourd’hui, n’est-ce pas, Suzanne?
        {file: 'less2_fre.mp3', pos: 180 + 28.87}, // Oui, j’ai congé aujourd’hui et demain.
        {file: 'less2_fre.mp3', pos: 180 + 33.54}, // Alors j’ai une idée.
        {file: 'less2_fre.mp3', pos: 180 + 36.15}, // Et quelle est cette idée?
        {file: 'less2_fre.mp3', pos: 180 + 38.89}, // Mes amis ont une maison à la campagne et, comme nous avons deux jours libres,   nous pouvons y passer un weekend merveilleux.

        // page

        {file: 'less2_fre.mp3', pos: 180 + 53.9}, // Oui, tu as raison, ton idée est vraiment bonne. Eh bien moi, j’ai aussi une idée.
        {file: 'less2_fre.mp3', pos: 240 + 4.21}, // Tu sais, Georges a une voiture et nous pouvons y aller tous ensemble en auto.
        {file: 'less2_fre.mp3', pos: 240 + 13.21}, // C’est parfait, je suis entièrement d’accord, d’autant plus que Georges et toi, vous avez beacoup de choses à vous dire.
    ];

    private cue: any[] = [];

    constructor() {
        this.initCue();
        // this.testCue();
    }

    public async up(queryRunner: QueryRunner): Promise<any> {

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(this.mnemonic)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(this.vocabulary)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(this.lessons)
            .execute();

        // console.log(this.fields.steps);
        // console.log(this.steps);
        // console.log(Steps);

        await getConnection()
            .createQueryBuilder()
            .insert()
            // .into(Steps, this.fields.steps)
            .into(Steps)
            .values(this.steps)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Phases, this.fields.phases)
            .values(this.phases)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(LessonStages, this.fields.lessonStages)
            .values(this.lessonStages)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Cue, this.fields.cue)
            .values(this.cue)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        console.log('FillDictionary mutation DOWN');
    }

    private testCue() {
        this.lessonStages.forEach((stage) => {
            const cntLessons = this.lessons.reduce((cnt, lesson) => {
                if (lesson.scope === stage.scope && lesson.lang1 === stage.lang) {
                    return cnt + 1;
                }
                return cnt;
            }, 0);
            const cntCues = this.cue.reduce((cnt, cue) => cnt + (cue.file === stage.sound ? 1 : 0), 0);
            console.log(' scope:', stage.scope, ' sound:', stage.sound, ' lessons:', cntLessons, ' cues:', cntCues, ' result: ', cntLessons === cntCues ? 'OK' : ' *** WRONG ***');
        });
    }

    private initCue() {
        this.cue = []
            .concat(this.less1EngRu)
            .concat(this.less1Eng)
            .concat(this.less2EngRu)
            .concat(this.less2Eng)
            .concat(this.less3EngRu)
            .concat(this.less3Eng)
            .concat(this.less4EngRu)
            .concat(this.less4Eng)
            .concat(this.less1DeuRu)
            .concat(this.less1Deu)
            .concat(this.less2DeuRu)
            .concat(this.less2Deu)
            .concat(this.less1FreRu)
            .concat(this.less1Fre)
            .concat(this.less2FreRu)
            .concat(this.less2Fre);
    }
}
