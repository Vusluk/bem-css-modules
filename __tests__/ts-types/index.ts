import block from '../../src/bem-css-modules.js';

block({foo: '1'});
block({foo: '1'}, 'foo');
block({foo: '1'})('element');
block({foo: '1'})({foo: '1'});
block({foo: '1'})({foo: '1'}, {bar: true});
block({foo: '1'})();
block({foo: '1'})(null);
block({foo: '1'})(null, null, null);
block({foo: '1'})(null, {foo: true, foo2: '', foo3: '1'});
block({foo: '1'})(null, null, {foo: true, foo1: false});

type Foo = {
    readonly [key: string]: string;
};

const styleModule: Foo = Object.freeze({foo: '1'});
block(styleModule);

block.setSettings({throwOnError: true});
block.setSettings({});
