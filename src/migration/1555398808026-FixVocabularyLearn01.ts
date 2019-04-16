import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Dictionary from '../model/entity/Dictionary';

export class FixVocabularyLearn011555398808026 implements MigrationInterface {

    private static init(str: string, lang1: string): any[] {
        const a1 = str.split('\n');
        const aa1 = [];
        const out = [];
        const oo = {lang1, lang2: 'RU', scope: 'vocabulary::learn'};
        for (let i = 0; i < 3; i++) {
            for (const a of a1) {
                const x = a.split('\t');
                if (x.length > i) {
                    const y = x[i].split('~');
                    // console.log(x[i], y);
                    if (y.length === 2) {
                        aa1.push({
                            word1: y[0].replace(/\d+\./gm, '').trim(),
                            word2: y[1].replace(/\d+\./gm, '').trim(),
                        });
                    }
                }
            }
        }

        for (const o of aa1) {
            out.push({
                ...o,
                ...oo,
            });
        }

        return out;
    }

    private fields = {
        dictionary: ['word1', 'word2', 'lang1', 'lang2', 'scope'],
    };

    private mnemicStrEN = '1. this ~ это\t36. pen ~ ручка\t71. girl ~ девочка\n' +
        '2. glass ~ стакан\t37. apples ~ яблоки\t72. daughter ~ дочь\n' +
        '3. dog ~ собака\t38. oranges ~ апельсины\t73. boy ~ мальчик\n' +
        '4. cat ~ кошка\t39. pencil ~ карандаш\t74. airport ~ аэропорт\n' +
        '5. what ~ что\t40. sock ~ носок\t75. metal ~ металл\n' +
        '6. animal ~ животное   \t41. rubber ~ резина\t76. paper ~ газета\n' +
        '7. window ~ окно\t42. stocking ~ чулок\t77. their ~ их\n' +
        '8. tree ~ дерево\t43. thing ~ вещь\t78. I ~ я\n' +
        '9. car ~ машина\t44. too ~ тоже\t79. very ~ очень\n' +
        '10. bus ~ автобус\t45. person ~ персона\t80. who ~ кто\n' +
        '11. flower ~ цветок\t46. sister ~ сестра\t81. teacher ~ учитель\n' +
        '12. point ~ точка\t47. son ~ сын\t82. student ~ студент\n' +
        '13. line ~ линия\t48. brother ~ брат\t83. table ~ стол\n' +
        '14. figure ~ фигура\t49. hat ~ шляпа\t84. you ~ ты, вы\n' +
        '15. there ~ эти\t50. gloves ~ перчатки\t85. good ~ хороший\n' +
        '16. book ~ книга\t51. father ~ отец\t86. also ~ также\n' +
        '17. hospital ~ больница \t52. bag ~ сумка\t87. morning ~ утро\n' +
        '18. school ~ школа\t53. mother ~ мать\t88. think ~ думать\n' +
        '19. no ~ нет\t54. my ~ мой\t89. name ~ имя\n' +
        '20. yes ~ да\t55. your ~ твой, ваш\t90. tall ~ высокий\n' +
        '21. that ~ то\t56. his ~ его\t91. she ~ она\n' +
        '22. field ~ поле\t57. her ~ ее\t92. man ~ мужчина\n' +
        '23. those ~ те\t58. shoes ~ туфли\t93. husbend ~ муж\n' +
        '24. horse ~ лошадь\t59. frend ~ друг\t94. right ~ правильный\n' +
        '25. ships ~ корабли\t60. cousin ~ кузен, кузина \t95. woman ~ женщина\n' +
        '26. guide ~ проводник   \t61. ticket ~ билет\t96. old ~ старый\n' +
        '27. shops ~ магазины\t62. train ~ презд\t97. family ~ семья\n' +
        '28. stone ~ камень\t63. building ~ здание\t98. he ~ он\n' +
        '29. box ~ коробка\t64. master ~ хозяин\t99. again ~ опять\n' +
        '30. letters ~ письма\t65. leg ~ ножка\t100. big ~ большой\n' +
        '31. tram  ~ трамвай\t66. child ~ ребенок\n' +
        '32. picture ~ картина   \t67. wheels ~ колеса\n' +
        '33. wall ~ стена\t68. house ~ дом\n' +
        '34. step ~ ступенька\t69. garden ~ сад\n' +
        '35. stamp ~ марка\t70. wife ~ жена\n';

    private mnemicStrDE = '1. Zimmer ~ комната  \t36. nebenan ~ рядом\n' +
        '2. Tisch ~ стол\t37. Wohnung ~ квартира\n' +
        '3. Stuhl ~ стул\t38. bitte ~ пожалуйста\n' +
        '4. Sessen ~ кресло   \t39. Tischdecke ~ скатерть  \t71. blaв ~ бледный\n' +
        '5. Schrank ~ шкаф\t40. Teller ~ тарелка\t72. Wangen ~ щеки\n' +
        '6. Bett ~ кровать\t41. Glas ~ стакан\t73. Fraulein ~барышня\n' +
        '7. Decke ~ покрывало \t42. Tasse ~ чашка\t74. kennen ~ знать\n' +
        '8. Lampe ~ лампа\t43. Besteck ~ стол. прибор \t75. studiert ~ учиться\n' +
        '9. Bank ~ скамейка   \t44. Messer ~ нож\t76. leider ~ к сожалению\n' +
        '10. Spirgel ~ зеркало \t45. Gabel ~ вилка\t77. Beschreibung ~ описание\n' +
        '11. was ~ что\t46. Loffel ~ ложка\t78. Haare ~ волосы\n' +
        '12. ist ~ есть\t47. danke ~ спасибо\t79. glatt ~ ровный\n' +
        '13. Straвe ~ улица\t48. Schussel ~ миска\t80. Augen ~ глаза\n' +
        '14. Haus ~ дом\t49. rund ~ круглый\t81. braun ~ коричневый\n' +
        '15. hier ~ здесь\t50. suв ~ сладкий\t82. Mund ~ рот\n' +
        '16. Garten ~ сад\t51. Pfeffer ~ перец\t83. klein ~ маленький\n' +
        '17. und ~ и\t52. salzig ~ соленый\t84. Nase ~ нос\n' +
        '18. Baum ~ дерево\t53. Essig ~ уксус\t85. gerade ~ прямой\n' +
        '19. dort ~ там\t54. sauer ~ кислый\t86. Stirn ~ лоб\n' +
        '20. Strauch ~ куст\t55. Ol ~ растит. масло\t87. rosig ~ розовый\n' +
        '21. Kinder  ~ дети\t56. fettig ~ жирный\t88. Zahne ~ зубы\n' +
        '22. Rasen ~ газон\t57. Brot ~ хлеб\t89. weiв ~ белый\n' +
        '23. Zaun ~ забор\t58. frisch ~ свежий\t90. Hande ~ руки\n' +
        '24. Tier ~ животное   \t59. Familie ~ семья\t91. schmal ~ узкий\n' +
        '25. Hund ~ собака\t60. Sohn ~ сын\t92. Fuвe ~ ступни\n' +
        '26. Katze ~ кошка\t61. Tochter ~ дочь\t93. Beine ~ ноги\n' +
        '27. oben ~ наверху\t62. Eltern ~ родители\t94. schlank ~ стройный\n' +
        '28. Vogel ~ птица\t63. sie ~ они\t95. lang ~ длинный\n' +
        '29. Pferd ~ лощадь\t64. heiвen ~ звать\t96. Mutter ~ мать\n' +
        '30. nein ~ нет\t65. Herr ~ господин\t97. Vater ~ отец\n' +
        '31. Esel ~ осел\t66. Frau ~ госпожа\t98. schwarz ~ черный\n' +
        '32. wieder ~ снова\t67. lernen ~ учиться\t99. das ~ это\n' +
        '33. wo ~ где\t68. treiben ~ заниматься  \t100. Butter ~ масло\n' +
        '34. kommt ~ идет\t69. Ohren ~ уши\n' +
        '35. gleich ~ сейчас   \t70. zierlich ~ изящный\n';

    private mnemicStrFR = '1. pardon ~извините\t36. mais ~ но\t71. autre ~ другой\n' +
        '2. qui ~ кто\t37. fils ~ сын\t72. paresseux ~ ленивый\n' +
        '3. alors ~ тогда\t38. haut ~ высокий\t73. service ~ услуга\n' +
        '4. charme ~ очарование\t39. sourcil ~ бровь\t74. belle ~ красивая\n' +
        '5. nom ~ имя\t40. garcon ~ юноша\t75. chercher ~ искать\n' +
        '6. grand ~ большой\t41. fille ~ девушка\t76. vouz ~ вы\n' +
        '7. fort ~ сильный\t42. famille ~ семья\t77. intelligente ~ умная\n' +
        '8. couleur ~ цвет\t43. cet ~ этот\t78. enfant ~ ребенок\n' +
        '9. cheveu ~ волосы\t44. et ~ и\t79. carre ~ квадратный\n' +
        '10. fiance ~ жених\t45. je ~ я\t80. tres ~ очень\n' +
        '11. joli ~ красивый\t46. cette ~ эта\t81. soeur ~ сестра\n' +
        '12. content ~ довольный\t47. ce ~ это\t82. quelques ~ несколько\n' +
        '13. gai ~ веселый\t48. jeune ~ молодой\t83. tableau ~ картина\n' +
        '14. gentil ~ милый\t49. mon ~ мой\t84. tapis ~ ковер\n' +
        '15. noir ~ черный\t50. ami ~ друг\t85. etre assis ~ сидеть\n' +
        '16. beau ~ красивый\t51. chambre ~ комната\t86. sur ~ на\n' +
        '17. laid ~ безобразный\t52. meuble ~ мебель\t87. tu ~ ты\n' +
        '18. front ~ лоб\t53. phono~ проигрыватель \t88. ou ~ где\n' +
        '19. nez ~ нос\t54. disque ~ пластинка   \t89. menton ~ подбородок\n' +
        '20. pointu ~ остроконечный\t 55. livre ~ книга\t90. avoir raison ~ быть правым\n' +
        '21. bouche ~ рот\t56. cahier ~ тетрадь\n' +
        '22. demain ~ завтра\t57. crayon ~ карандаш\t91. voiture ~ автомобиль\n' +
        '23. campagne ~ деревня\t58. papier ~ бумага\t92. parfait ~ прекрасный\n' +
        '24. pere ~ отец\t59. plafond ~ потолок\t93. c`est ~ это есть\n' +
        '25. mur ~ стена\t60. plancher ~ пол\t94. ce sont ~ это (мн.ч.)\n' +
        '26. voici ~ вот\t61. porte ~ дверь\t95. il y a ~ имеется\n' +
        '27. homme ~ мужчина\t62. fenetre ~ окно\t96. qu`est-ce que c`est ~ что это\n' +
        '28. monsieur ~ господин\t63. table ~ стол\n' +
        '29. femme ~ женщина\t64. photo ~ фотография   \t97. ecole ~ школа\n' +
        '30. absent ~ отсутствующий \t65. etagere ~ этажерка   \t98. tout seul ~ один\n' +
        '31. ensemble ~ вместе\t66. chaise ~ стул\t99. pour le moment ~ в данный момент\n' +
        '32. chance ~ удача\t67. devant ~ перед\n' +
        '33. faire ~ делать\t68. derriere ~ позади\t   100. dans ~ в\n' +
        '34. maison ~ дом\t69. chien ~ собака\n' +
        '35. elle ~ она\t70. vieux ~ старый';

    private mnemic = [
        {word1: 'again', word2: 'снова', lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn'},
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
            .createQueryBuilder()
            .update(Dictionary)
            .set({ scope: 'vocabulary::learn::01' })
            .where('scope = :scope', { scope: 'vocabulary::learn' })
            .execute();

        let d = FixVocabularyLearn011555398808026.init(this.mnemicStrEN, 'EN');
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(d)
            .execute();

        d = FixVocabularyLearn011555398808026.init(this.mnemicStrDE, 'DE');
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(d)
            .execute();

        d = FixVocabularyLearn011555398808026.init(this.mnemicStrFR, 'FR');
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Dictionary, this.fields.dictionary)
            .values(d)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
