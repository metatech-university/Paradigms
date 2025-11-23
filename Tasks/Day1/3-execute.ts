interface Logger {
    log: (...args: unknown[]) => void;
}

type Value = Record<string, unknown>;

type Reader = (value: Value) => Value;

interface ReadStep {
    type: 'read';
    value: Value;
    next: Step;
}

interface MatchStep {
    type: 'match';
    field: string;
    expected: unknown;
    success: Step;
    fail: Step;
}

interface LogEffect {
    type: 'log';
    field: string;
}

interface NoopEffect {
    type: 'noop';
}

type EffectStep = LogEffect | NoopEffect;

type Step = ReadStep | MatchStep | EffectStep;

class Exec {
    private readonly logger: Logger;
    private readonly reader: Reader;

    constructor(options: { logger: Logger; reader: Reader }) {
        this.logger = options.logger;
        this.reader = options.reader;
    }

    public run(steps: Step[]): void {
        for (const step of steps) {
            this.handlerSteps(step);
        }
    }

    private handlerSteps(step: Step, value?: Value): void {
        switch (step.type) {
            case 'read':
                return this.read(step, value);
            case 'match':
                return this.match(step, value);
            case 'log':
            case 'noop':
                return this.effect(step, value);
            default:
                throw new Error(`Unknown step: ${JSON.stringify(step)}`);
        }
    }

    private read(step: ReadStep, value?: Value): void {
        const _value = this.reader(step.value);
        const nextValue = { ...value, ..._value };
        this.handlerSteps(step.next, nextValue);
    }

    private match(step: MatchStep, value?: Value): void {
        const actual = value?.[step.field];
        const ok = actual === step.expected;
        this.handlerSteps(ok ? step.success : step.fail, value);
    }

    private effect(step: EffectStep, value?: Value): void {
        if (step.type === 'log') {
            this.logger.log(value?.[step.field]);
        }
        // step.type === 'noop'
        // noop do nothing
    }
}

const reader: Reader = (value: Value) => {
    const { id } = value;
    return { id, name: 'marcus', age: 42 };
};

const plan: Step[] = [{
    type: 'read',
    value: { id: 15 },
    next: {
        type: 'match',
        field: 'name',
        expected: 'marcus',
        success: {
            type: 'log',
            field: 'age',
        },
        fail: {
            type: 'noop',
        },
    },
}];

const main = new Exec({ logger: console, reader });
main.run(plan);