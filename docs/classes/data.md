
# Class: Data

Data class makes any object properties deeply observable and associates a
listener to execute if the target object changes.

## Hierarchy

* **Data**

## Index

### Methods

* [contains](data.md#static-contains)
* [create](data.md#static-create)
* [refs](data.md#static-refs)

## Methods

### `Static` contains

▸ **contains**(`source`: [Data](data.md), `ref`: string): *boolean*

Returns if the provided data contains the provided reference as a
parameter.

**`static`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`source` | [Data](data.md) | Class instance to check if it contains the reference. |
`ref` | string | Reference to search for. |

**Returns:** *boolean*

- Returns `true` if the provided data contains the
provided reference.

___

### `Static` create

▸ **create**(`target`: object, `listener`: [DataListener](../interfaces/datalistener.md)): *object*

Creates a observable object based on the target object provided. If any
object property changes, the listener provided will be executed.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | object | The original object to listen to. |
`listener` | [DataListener](../interfaces/datalistener.md) | listener function to call when target data changes.  |

**Returns:** *object*

___

### `Static` refs

▸ **refs**(`target`: [Data](data.md)): *Array‹string›*

Returns a list of attributes references nested. For example, if the data
target has the following definition `{ attr1: { attr2: false }}`, the
function returns [ "attr1", "attr1.attr2" ].

**`static`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | [Data](data.md) | Target [Data](data.md) instance to retrive its attributes references. |

**Returns:** *Array‹string›*

- List of attributes references.
