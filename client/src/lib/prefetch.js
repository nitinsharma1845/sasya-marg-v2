export const createPrefetch = (fn) => {
    let prefetch = false;
    return () => {
        if (!prefetch) {
            prefetch = true
            fn()
        }
    }
}