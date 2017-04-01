let currentValue
function observe(store, selector, onChange) {
    if (!store) throw Error("'store' should be truthy")
    if (!selector) throw Error("'selector' should be truthy")
    store.subscribe(() => {
        const previousValue = currentValue
        try {
            currentValue = selector(store.getState())
        }
        catch(e) {
            currentValue = undefined
        }
        if (previousValue !== currentValue) {
            onChange(store, previousValue, currentValue)
        }
    })
}

export default observe
