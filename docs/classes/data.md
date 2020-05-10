
# Class: Data

Data class makes any object properties deeply observable and associates a
listener to execute if the target object changes.

## Hierarchy

* **Data**

## Index

### Constructors

* [constructor](data.md#constructor)

### Methods

* [contains](data.md#contains)
* [dismiss](data.md#dismiss)
* [listen](data.md#listen)
* [refs](data.md#refs)

## Constructors

###  constructor

\+ **new Data**(`target`: object): *[Data](data.md)*

Constructor envolves the target object into a {@link Wrap} to allow to
listen by property and then make it observable.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | object | The original object to listen to.  |

**Returns:** *[Data](data.md)*

## Methods

###  contains

▸ **contains**(`ref`: string): *boolean*

Returns if the current data contains the provided reference.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ref` | string | Reference to search for. |

**Returns:** *boolean*

- Returns `true` if the provided data contains the
provided reference.

___

###  dismiss

▸ **dismiss**(`ref`: string): *void*

dismiss function unregister a listener for a data source property by the
provided reference.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ref` | string | The reference to unregister the listener.  |

**Returns:** *void*

___

###  listen

▸ **listen**(`ref`: string, `listener`: [Listener](../interfaces/listener.md)): *void*

listen function registers a change listener function for a data source
property by the provided refenrence.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ref` | string | The reference to register the listener. |
`listener` | [Listener](../interfaces/listener.md) | Function to listen a property change  |

**Returns:** *void*

___

###  refs

▸ **refs**(): *Array‹string›*

Returns a list of attributes references nested. For example, if the data
target has the following definition `{ attr1: { attr2: false }}`, the
function returns [ "attr1", "attr1.attr2" ].

**Returns:** *Array‹string›*

- List of attributes references.
