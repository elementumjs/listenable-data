
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
* [dismissAll](data.md#dismissall)
* [listen](data.md#listen)
* [listenAll](data.md#listenall)
* [refs](data.md#refs)

## Constructors

###  constructor

\+ **new Data**(`source`: object): *[Data](data.md)*

Constructor envolves the source object into the current instance of
[Data](data.md) to allow to listen by property and then make it observable.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`source` | object | The original object to listen to.  |

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

dismiss function unregisters a listener for the source data property
referenced by the provided reference. If provided reference has not any
listener registered the function throws an error.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ref` | string | The reference to unregister the listener.  |

**Returns:** *void*

___

###  dismissAll

▸ **dismissAll**(): *void*

dismiss function unregisters a global listener from the source data. If
the source data has not any global listener registered the function
throws an error.

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

###  listenAll

▸ **listenAll**(`listener`: [Listener](../interfaces/listener.md)): *void*

listenAll function registers a global listener function for any data
source property.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`listener` | [Listener](../interfaces/listener.md) | Function to listen an any property change.  |

**Returns:** *void*

___

###  refs

▸ **refs**(): *Array‹string›*

Returns a list of attributes references nested. For example, if the data
target has the following definition `{ attr1: { attr2: false }}`, the
function returns [ "attr1", "attr1.attr2" ].

**Returns:** *Array‹string›*

- List of attributes references.
