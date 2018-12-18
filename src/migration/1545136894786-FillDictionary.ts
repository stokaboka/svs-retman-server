import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Dictionary from '../model/entity/Dictionary';

export class FillDictionary1545136894786 implements MigrationInterface {

    private mnemonic = [
        { word1: 'история', word2: 'арка', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'будущее', word2: 'писать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'мех', word2: 'минута', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'цвет', word2: 'зал', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'почва', word2: 'потеря', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'получать', word2: 'сила', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'ответ', word2: 'пищать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'берег', word2: 'рюмка', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'атом', word2: 'власть', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'медь', word2: 'архив', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },

        { word1: 'цветок', word2: 'мир', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'характер', word2: 'характер', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'сердце', word2: 'сад', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'факт', word2: 'конец', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'один', word2: 'смотреть', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'рука', word2: 'пилот', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'ребенок', word2: 'город', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'орган', word2: 'оружие', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'пила', word2: 'писатель', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'класс', word2: 'близко', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },

        { word1: 'спускать', word2: 'осень', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'базар', word2: 'облако', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'малыш', word2: 'пища', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'бак', word2: 'мебель', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'круг', word2: 'рыба', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'большой', word2: 'машина', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'приходить', word2: 'рассматривать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'кровать', word2: 'сарай', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'появляться', word2: 'нравиться', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'спрашивать', word2: 'план', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },

        { word1: 'разбивать', word2: 'мачта', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'сражение', word2: 'мечта', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'обложка', word2: 'отвечать', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'разница', word2: 'уметь', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'принимать', word2: 'окоп', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'тяжелый', word2: 'русло', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'складывать', word2: 'арбуз', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'высокий', word2: 'праздник', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'рассказ', word2: 'экран', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'разделять', word2: 'дело', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },

        { word1: 'явление', word2: 'туман', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'действовать', word2: 'озеро', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'сооружение', word2: 'ходить', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'возраст', word2: 'склад', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'правительство', word2: 'земля', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'преследовать', word2: 'аромат', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'воздух', word2: 'сено', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'основа', word2: 'подарок', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'расти', word2: 'день', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
        { word1: 'туловище', word2: 'балет', lang1: 'RU', lang2: 'RU', scope: 'mnemonic' },
    ];

    private vocabulary = [
        { word1: 'boundless', word2: 'безграничный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'bright', word2: 'яркий', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'broadcast', word2: 'радиовещание', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to eat', word2: 'кушать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'family', word2: 'семья', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to fly', word2: 'летать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'fury', word2: 'ярость', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'guilt', word2: 'вина', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'heart', word2: 'сердце', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to help', word2: 'помогать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to improve', word2: 'улучшать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to knock', word2: 'стучать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'lush', word2: 'сочный, пышный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to mistrust', word2: 'не доверять', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'mother', word2: 'мать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'poll', word2: 'избирательный участок', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to remember', word2: 'помнить', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to shrink', word2: 'отпрянуть', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'to suggest', word2: 'предлагать', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'table', word2: 'стол', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'wedge', word2: 'клин', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'whiskers', word2: 'бакенбарды', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'wholesale', word2: 'оптовый', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'worthy', word2: 'достойный', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },
        { word1: 'yes', word2: 'да', lang1: 'EN', lang2: 'RU', scope: 'vocabulary' },

    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary)
            .values(this.mnemonic)
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary)
            .values(this.vocabulary)
            .execute();

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
