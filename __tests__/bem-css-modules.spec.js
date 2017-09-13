import bem from 'bem-css-modules';


const mockCSSModule = {
    input: 'HASH_INPUT',
    input__field: 'HASH_INPUT_FIELD',
    input__field_disabled: 'HASH_INPUT_FIELD_DISABLED',
    input__field_type_text: 'HASH_INPUT_FIELD_TYPE_TEXT',
    input__field_type_phone: 'HASH_INPUT_FIELD_TYPE_PHONE',
    input__icon: 'HASH_INPUT_ICON',
    'is-active': 'HASH_IS_ACTIVE',
    'is-removed': 'HASH_IS_REMOVED',
};

const namesToArray = (name) =>
    name.split(' ').sort();

describe('bem-css-modules', () => {
    const block = bem(mockCSSModule);

    it('should return base element', () => {
        expect(block()).toBe('HASH_INPUT');
        expect(block(null)).toBe('HASH_INPUT');
        expect(block('')).toBe('HASH_INPUT');
    });

    it('should return elements', () => {
        expect(block('icon')).toBe('HASH_INPUT_ICON');
        expect(block('field')).toBe('HASH_INPUT_FIELD');
    });

    it('should return elements with mods', () => {
        expect(block('field', {disabled: true})).toBe('HASH_INPUT_FIELD HASH_INPUT_FIELD_DISABLED');
        expect(block('field', {disabled: false})).toBe('HASH_INPUT_FIELD');
        expect(block('field', {type: 'text'})).toBe('HASH_INPUT_FIELD HASH_INPUT_FIELD_TYPE_TEXT');
        expect(
            namesToArray(block('field', {type: 'phone', disabled: true}))
        ).toEqual(namesToArray('HASH_INPUT_FIELD HASH_INPUT_FIELD_TYPE_PHONE HASH_INPUT_FIELD_DISABLED'));
    });

    it('should return elements with states', () => {
        expect(block('field', null, {active: true, removed: false})).toBe('HASH_INPUT_FIELD HASH_IS_ACTIVE');
        expect(
            namesToArray(block('field', null, {active: true, removed: true}))
        ).toEqual(namesToArray('HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED'));

        expect(
            namesToArray(block(null, null, {active: true, removed: true}))
        ).toEqual(namesToArray('HASH_INPUT HASH_IS_ACTIVE HASH_IS_REMOVED'));
    });

    it('should return elements with mods and states', () => {
        expect(
            namesToArray(block('field', {disabled: true}, {active: true, removed: true}))
        ).toEqual(namesToArray('HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED HASH_INPUT_FIELD_DISABLED'));
        expect(
            namesToArray(block('field', {disabled: true, type: 'text'}, {active: true, removed: true}))
        ).toEqual(
            namesToArray('HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED HASH_INPUT_FIELD_DISABLED HASH_INPUT_FIELD_TYPE_TEXT')
        );
    });

    describe('errors', () => {
        it('should throw error with invalid css modules', () => {
            expect(() => bem()).toThrowError('cssModule object should be a Object with keys');
            expect(() => bem(null)).toThrowError('cssModule object should be a Object with keys');
            expect(() => bem(false)).toThrowError('cssModule object should be a Object with keys');
            expect(() => bem('foo')).toThrowError('cssModule object should be a Object with keys');
            expect(() => bem([])).toThrowError('cssModule object should be a Object with keys');
        });

        it('should throw error with css modules without keys', () => {
            expect(() => bem({})).toThrowError('cssModule has no keys');

            function SomeClass() {
                // pass
            }

            SomeClass.prototype = {foo: 1};

            expect(() => bem(new SomeClass())).toThrowError('cssModule has no keys');
        });

        it('should throw error with unexisted elements', () => {
            expect(() => block('foo')).toThrowError('There is no input__foo in cssModule');
        });

        it('should throw error with unexisted mods', () => {
            expect(() => block('icon', {foo: true})).toThrowError('There is no input__icon_foo in cssModule');
            expect(() => block('icon', {foo: 'bar'})).toThrowError('There is no input__icon_foo_bar in cssModule');
        });

        it('should throw error with unexisted states', () => {
            expect(() => block('icon', null, {foo: true})).toThrowError('There is no is-foo in cssModule');
        });
    });
});