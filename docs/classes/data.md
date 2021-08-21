# Class: Data

Data class makes any object properties deeply observable and associates a
listener to execute if the target object changes.

## Table of contents

### Constructors

- [constructor](Data.md#constructor)

### Methods

- [contains](Data.md#contains)
- [dismiss](Data.md#dismiss)
- [dismissAll](Data.md#dismissall)
- [listen](Data.md#listen)
- [listenAll](Data.md#listenall)
- [refs](Data.md#refs)

## Constructors

### constructor

• **new Data**(`source`)

Constructor envolves the source object into the current instance of
[Data](Data.md) to allow to listen by property and then make it observable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `object` | The original object to listen to. |

#### Defined in

[listenable-data.ts:38](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L38)

## Methods

### contains

▸ **contains**(`ref`): `boolean`

Returns if the current data contains the provided reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `string` | Reference to search for. |

#### Returns

`boolean`

- Returns `true` if the provided data contains the
provided reference.

#### Defined in

[listenable-data.ts:129](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L129)

___

### dismiss

▸ **dismiss**(`ref`, `listener?`): `void`

dismiss function unregisters the provided listener (or all of them if the
listener is not provided) for the source data property referenced by the
provided reference. If provided reference has not any listener registered
the function throws an error.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ref` | `string` | `undefined` | The reference to unregister the listener. |
| `listener` | `Listener` | `null` | The listener to dismiss. If any listener is provided, all listener will be dismissed. |

#### Returns

`void`

#### Defined in

[listenable-data.ts:97](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L97)

___

### dismissAll

▸ **dismissAll**(`listener?`): `void`

dismissAll function unregisters the provided global listener from the source
data. If the listener is not provided, all the global listeners will be dismissed.
the source data has not any global listener registered the function
throws an error.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `listener` | `Listener` | `null` | The global listener to dismiss. If any listener is provided, all listener will be dismissed. |

#### Returns

`void`

#### Defined in

[listenable-data.ts:115](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L115)

___

### listen

▸ **listen**(`ref`, `listener`): `void`

listen function registers a change listener function for a data source
property by the provided refenrence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `string` | The reference to register the listener. |
| `listener` | `Listener` | Function to listen a property change |

#### Returns

`void`

#### Defined in

[listenable-data.ts:74](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L74)

___

### listenAll

▸ **listenAll**(`listener`): `void`

listenAll function registers a global listener function for any data
source property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | `Listener` | Function to listen an any property change. |

#### Returns

`void`

#### Defined in

[listenable-data.ts:84](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L84)

___

### refs

▸ **refs**(): `string`[]

Returns a list of attributes references nested. For example, if the data
target has the following definition `{ attr1: { attr2: false }}`, the
function returns [ "attr1", "attr1.attr2" ].

#### Returns

`string`[]

- List of attributes references.

#### Defined in

[listenable-data.ts:139](https://github.com/elementumjs/listenable-data/blob/e4d5362/src/lib/listenable-data.ts#L139)
