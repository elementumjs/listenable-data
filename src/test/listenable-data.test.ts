import { Data } from "../lib/listenable-data";

test("Data.constructor", () => {
    // Type tests for check if result object has the same keys/indexes and 
    // values that the target one. 
    expect(
        new Data({ attr: true })["attr"]
    ).toBe(true);

    expect(
        new Data([ true ])[0]
    ).toBe(true);
});

test("Data.refs", () => {
    const d1 = new Data({
        level1: {
            level2a: {
                level3a: true,
                level3b: true
            },
            level2b: true
        }
    });

    // Checks deeply references format
    expect(d1.refs()).toStrictEqual([
        "level1",
        "level1.level2a",
        "level1.level2a.level3a",
        "level1.level2a.level3b",
        "level1.level2b"
    ]);

    const d2 = new Data({
        level1: {
            level2b: true,
            level2a: {
                level3b: true,
                level3a: true
            }
        }
    });

    // Checks deeply references order
    expect(d2.refs()).toStrictEqual([
        "level1",
        "level1.level2b",
        "level1.level2a",
        "level1.level2a.level3b",
        "level1.level2a.level3a"
    ]);
});

test("Data.contains", () => {
    const data = new Data({
        level1: {
            level2a: {
                level3a: true,
                level3b: true
            },
            level2b: true
        }
    });

    // Checks references that must to have been contained
    expect(data.contains("level1")).toBeTruthy();
    expect(data.contains("level1.level2a")).toBeTruthy();
    expect(data.contains("level1.level2b")).toBeTruthy();
    expect(data.contains("level1.level2a.level3a")).toBeTruthy();
    expect(data.contains("level1.level2a.level3b")).toBeTruthy();

    // Checks references that must to not have been contained
    expect(data.contains("level2")).not.toBeTruthy();
    expect(data.contains("level2a")).not.toBeTruthy();
    expect(data.contains("level3b")).not.toBeTruthy();
});

test("Single data property listener", () => {
    // Checks the counter changes updating it into a loop
    let counter = 0;
    
    const data = new Data({
        level1: {
            level2a: {
                level3a: {
                    counter: counter
                },
                level3b: true
            },
            level2b: true
        }
    });

    const listener = (value, last) => {
        expect(value).toBe(counter);
        expect(last).toBe(counter === 0 ? counter : counter -1);
    }
    data.listen("level1.level2a.level3a.counter", listener);

    data.listen("test", listener);
    expect(data["::listeners"]["test"]).toMatchObject([ listener ]);
    data.dismiss("test");
    expect(data["::listeners"]["test"]).toMatchObject([]);

    // Checks that a not existing reference returns undefined
    expect(data["level3a"]).toBeUndefined();

    // Checks the initial value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(0);

    for (counter; counter < 10; counter++)
        data["level1"]["level2a"]["level3a"]["counter"] = counter;

    // Checks the final value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(9);
});

test("Global data listener", () => {
    // Checks the counter changes updating it into a loop
    let counter = 0;
    
    const data = new Data({
        level1: {
            level2a: {
                level3a: {
                    counter: counter
                },
                level3b: true
            },
            level2b: true
        }
    });

    const listener = (value, last, ref) => {
        expect(value).toBe(counter);
        expect(last).toBe(counter === 0 ? counter : counter - 1);
        expect(ref).toBe("level1.level2a.level3a.counter");
    }
    
    data.listenAll(listener);
    expect(data["::listeners"]["*"]).toMatchObject([listener]);
    data.dismissAll();
    expect(data["::listeners"]["*"]).toMatchObject([]);

    data.listenAll(listener);

    // Checks the initial value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(0);

    for (counter; counter < 10; counter++)
        data["level1"]["level2a"]["level3a"]["counter"] = counter;

    // Checks the final value of counter
    expect(data["level1"]["level2a"]["level3a"]["counter"]).toBe(9);
});