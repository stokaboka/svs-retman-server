/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export default class Piper {
    private functions: any[] = [];
    private val: any = null;
    private ctx: any = null;

    public pipe(functions: any[]) {
        this.functions = functions;
        return this;
    }

    public calc() {
        if (this.functions) {
            for (const func of this.functions) {
                this.val = func.call(this.ctx, this.val);
            }
        }
        return this;
    }

    public plus(value: any, property: string) {
        if (property) {
            this.val[property] = this.val[property] + value;
        } else {
            this.val = this.val + value;
        }
        return this;
    }

    public minus(value: any, property: string) {
        if (property) {
            this.val[property] = this.val[property] - value;
        } else {
            this.val = this.val - value;
        }
        return this;
    }

    public clear() {
        this.functions = [];
        this.val = null;
        return this;
    }

    public context(context: any) {
        if (context) {
            this.ctx = context;
            return this;
        } else {
            return this.ctx;
        }
    }

    public value(value: any) {
        if (value) {
            this.val = value;
            return this;
        } else {
            return this.val;
        }
    }
}
