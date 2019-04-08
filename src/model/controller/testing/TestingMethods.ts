export default class TestingMethods {

    public testing: any[] = [
        {label: 'Сусггестивность по АТ', method: 'at0', min: 1, max: 100, k1: 0.05, k2: 0.6, k: 0.03, value: 0, result: 0},
        {label: 'Мнемический тест', method: 'mnemic', min: 1, max: 40, k1: 0.125, k2: 0.8, k: 0.1, value: 0, result: 0},
        {label: 'Словарный запас по трем языкам', method: 'ratingWords', min: 1, max: 25, k1: 0.2, k2: 0.25, k: 0.05, value: 0, result: 0},
        {label: 'Способность понимания смысла текстов', method: 'selftext', min: 1, max: 20, k1: 0.25, k2: 0.3, k: 0.075, value: 0, result: 0},
        {label: 'Показатель "delta"', method: 'delta', min: 1, max: 40, k1: 1.125, k2: 1, k: 1.125, value: 0, result: 0},
        {label: 'Самооценка', method: 'ratingSelf', min: 1, max: 40, k1: 1.125, k2: 1, k: 1.125, value: 0, result: 0},
        {label: 'Речевая активность', method: 'talking', min: 1, max: 5, k1: 1, k2: 0.7, k: 0.7, value: 0, result: 0},
    ];

    public calculate(results: string): any[] {
        const jsonResults = JSON.parse(results);
        const testing = this.testing.map((elem) => {
            const value = this.calc(elem.method, jsonResults);
            const result = value * elem.k;
            return Object.assign(
                {},
                elem,
                {value, result},
            );
        });
        return testing;
    }

    public at0(result: any) {
        return 0;
    }

    public selftext(result: any) {
        return 0;
    }

    public mnemic(result: any) {
        return result.mnemic.remembered;
    }

    public ratingWords(result: any) {
        return result.selfrating.ControlRating.reduced.EN + result.selfrating.ControlRating.reduced.DE + result.selfrating.ControlRating.reduced.FR;
    }

    public ratingSelf(result: any) {
        return result.selfrating.SelfRating.reduced.EN + result.selfrating.SelfRating.reduced.DE + result.selfrating.SelfRating.reduced.FR;
    }

    public delta(result: any) {
        return result.endlexical.remembered - result.lexical.remembered;
    }

    public talking(result: any) {
        return 0;
    }

    public calc(method: string, result: any): number {
        switch (method) {
            case 'at0':
                return this.at0((result));
            case 'selftext':
                return this.selftext((result));
            case 'mnemic':
                    return this.mnemic((result));
            case 'ratingWords':
                return this.ratingWords((result));
            case 'ratingSelf':
                return this.ratingSelf((result));
            case 'delta':
                return this.delta((result));
            case 'talking':
                return this.delta((result));
            default:
                return 0;
        }
    }
}
