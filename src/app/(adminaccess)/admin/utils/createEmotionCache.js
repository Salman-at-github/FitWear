import createCache from '@emotion/cache';
var isBrowser = typeof document !== 'undefined';
// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
    var insertionPoint;
    if (isBrowser) {
        var emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
        insertionPoint = emotionInsertionPoint !== null && emotionInsertionPoint !== void 0 ? emotionInsertionPoint : undefined;
    }
    return createCache({ key: 'mui-style', insertionPoint: insertionPoint });
}
