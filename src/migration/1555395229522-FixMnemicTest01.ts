import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Dictionary from '../model/entity/Dictionary';

export class FixMnemicTest011555395229522 implements MigrationInterface {

    private fields = {
        dictionary: ['word1', 'word2', 'lang1', 'lang2', 'scope'],
    };

    private mnemicStr = 'ВОЛ- СОСНА#СТУЛ- САПОГ=' +
        'ВЕТЕР- ГОЛОД#ЗАБОР- БУМАГА=' +
        'КОВЕР- БРИТВА#КНИГА- СОЛЕНЫЙ=' +
        'ГЛУПЫЙ   - ТЕЛЕФОН#ГРЕЛКА- ВЕРЕВКА=' +
        'ЖАРА- ШУМЕТЬ#МУЗЫКА- БРЕВНО=' +
        'СЫР- КИЛОМЕТР#БАТАРЕЯ   - СЛАДКИЙ=' +
        'МОЧАЛКА  - МИЛИЦИОНЕР#БИНОКЛЬ   - КОШКА=' +
        'СЕРДЦЕ   - РЫЧАТЬ#ВОЛК- ВДОВА=' +
        'НОГА- УГОЛ#ПИСАТЬ- ВАРЕНЬЕ=' +
        'ПЕТЬ- ПУСТЫНЯ#СОН- КУПАТЬСЯ=' +
        'ДНО- УМОРА#СТАТЬЯ- ГНЕВ=' +
        'ГАЗЕТА   - ПОЛДЕНЬ#БОЛЕЗНЬ   - ОСЕНЬ=' +
        'ТОПОР- ОКЕАН#КОНЦЕРТ   - ПАХАТЬ=' +
        'ВЫТЬ- БАШМАК#МЯСО- ФИНИШ=' +
        'ЦИРК- УХА#ВЕРБЛЮД   - ГОСТИНИЦА=' +
        'ГАЛСТУК  - ТАРАКАН#КРЫША- БАШНЯ=' +
        'СМЕЯТЬСЯ - НОСИЛКИ#ЗЕРКАЛО   - ПОРТФЕЛЬ=' +
        'КРЕСЛО   - ГОРА#СИДЕТЬ- СИНИЙ=' +
        'РАДИО- НОЖ#ХЛЕБ- ГОРЕТЬ=' +
        'СТРАНИЦА - КОМАР#ДОЖДЬ- ЧАСЫ=' +
        'ШКАФ- СЛОН#ОБЕЗЬЯНА  - ГОЛУБОЙ=' +
        'МУСОР- ДИВАН#СЕРЫЙ- СТУЧАТЬ=' +
        'МОРЕ- ДЕНЬГИ#ЧЕРЕПАХА  - ПРЫГАТЬ=' +
        'УЧИТЕЛЬ  - ЖЕВАТЬ#КРОКОДИЛ  - ТАБУРЕТКА=' +
        'ВРАЧ- ГРЫЗТЬ#ДЛИННЫЙ   - ВИДЕТЬ';

    private mnemic = [
        {word1: 'история', word2: 'арка', lang1: 'RU', lang2: 'RU', scope: 'mnemic::test'},
        ];

    public async up(queryRunner: QueryRunner): Promise<any> {

        this.mnemic = this.init();

        await getConnection()
            .createQueryBuilder()
            .update(Dictionary)
            .set({ scope: 'mnemic::test::01' })
            .where('scope = :scope', { scope: 'mnemic::test' })
            .execute();

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(this.mnemic)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

    private init(): any[] {
        const a1 = this.mnemicStr.split('=');
        const aa1 = [];
        const aa2 = [];
        const out = [];
        const oo = {lang1: 'RU', lang2: 'RU', scope: 'mnemic::test'};
        for (const a of a1) {
            const x = a.split('#');
            let y = x[0].split('-');
            aa1.push({word1: y[0].trim(), word2: y[1].trim()});

            y = x[1].split('-');
            aa2.push({word1: y[0].trim(), word2: y[1].trim()});
        }

        for (const o of aa1) {
            out.push({
                ...o,
                ...oo,
            });
        }

        for (const o of aa2) {
            out.push({
                ...o,
                ...oo,
            });
        }

        return out;
    }

}
