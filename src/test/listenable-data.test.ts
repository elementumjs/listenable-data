import Data from "../lib/listenable-data";

test("Data.constructor", () => {
    const fn = () => {};

    // Type tests for check if result object has the same keys/indexes and 
    // values that the target one. 
    expect(
        Data.create({ attr: true }, fn)["attr"]
    ).toBe(true);

    expect(
        Data.create([ true ], fn)[0]
    ).toBe(true);
});

test("Data.refs", () => {
    const fn = () => {};

    // Checks deeply references format
    expect(
        Data.refs(Data.create(
            {
                level1: {
                    level2a: {
                        level3a: true,
                        level3b: true
                    },
                    level2b: true
                }
            },
            fn
        ))
    ).toStrictEqual([
        "level1",
        "level1.level2a",
        "level1.level2a.level3a",
        "level1.level2a.level3b",
        "level1.level2b"
    ]);

    // Checks deeply references order
    expect(
        Data.refs(Data.create(
            {
                level1: {
                    level2b: true,
                    level2a: {
                        level3b: true,
                        level3a: true
                    }
                }
            },
            fn
        ))
    ).toStrictEqual([
        "level1",
        "level1.level2b",
        "level1.level2a",
        "level1.level2a.level3b",
        "level1.level2a.level3a"
    ]);
});

test("Data.contains", () => {
    let data = Data.create({
        level1: {
            level2a: {
                level3a: true,
                level3b: true
            },
            level2b: true
        }
    }, () => {});

    // Checks references that must to have been contained
    expect(Data.contains(data, "level1")).toBeTruthy();
    expect(Data.contains(data, "level1.level2a")).toBeTruthy();
    expect(Data.contains(data, "level1.level2b")).toBeTruthy();
    expect(Data.contains(data, "level1.level2a.level3a")).toBeTruthy();
    expect(Data.contains(data, "level1.level2a.level3b")).toBeTruthy();

    // Checks references that must to not have been contained
    expect(Data.contains(data, "level2")).not.toBeTruthy();
    expect(Data.contains(data, "level2a")).not.toBeTruthy();
    expect(Data.contains(data, "level3b")).not.toBeTruthy();
});

test("Data class base functionality", () => {
    // Checks the counter changes updating it into a loop
    let counter = 0;
    let listener = (ref, value, last) => {
        expect(ref).toBe("level1.level2a.level3a.counter");
        expect(value).toBe(counter);
        expect(last).toBe(counter === 0 ? counter : counter -1);
    }

    let data = Data.create({
        level1: {
            level2a: {
                level3a: {
                    counter: counter
                },
                level3b: true
            },
            level2b: true
        }
    }, listener);

    // Checks that a not existing reference returns undefined
    expect(data["level3a"]).toBeUndefined();

    // Checks the initial value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(0);

    for (counter; counter < 10; counter++)
        data["level1"]["level2a"]["level3a"]["counter"] = counter;

    // Checks the final value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(9);
});