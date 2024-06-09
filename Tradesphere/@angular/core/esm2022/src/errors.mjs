/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ERROR_DETAILS_PAGE_BASE_URL } from './error_details_base_url';
/**
 * Class that represents a runtime error.
 * Formats and outputs the error message in a consistent way.
 *
 * Example:
 * ```
 *  throw new RuntimeError(
 *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
 *    ngDevMode && 'Injector has already been destroyed.');
 * ```
 *
 * Note: the `message` argument contains a descriptive error message as a string in development
 * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
 * `message` argument becomes `false`, thus we account for it in the typings and the runtime
 * logic.
 */
export class RuntimeError extends Error {
    constructor(code, message) {
        super(formatRuntimeError(code, message));
        this.code = code;
    }
}
/**
 * Called to format a runtime error.
 * See additional info on the `message` argument type in the `RuntimeError` class description.
 */
export function formatRuntimeError(code, message) {
    // Error code might be a negative number, which is a special marker that instructs the logic to
    // generate a link to the error details page on angular.io.
    // We also prepend `0` to non-compile-time errors.
    const fullCode = `NG0${Math.abs(code)}`;
    let errorMessage = `${fullCode}${message ? ': ' + message : ''}`;
    if (ngDevMode && code < 0) {
        const addPeriodSeparator = !errorMessage.match(/[.,;!?\n]$/);
        const separator = addPeriodSeparator ? '.' : '';
        errorMessage =
            `${errorMessage}${separator} Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
    }
    return errorMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBOEdyRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLE9BQU8sWUFBa0QsU0FBUSxLQUFLO0lBQzFFLFlBQW1CLElBQU8sRUFBRSxPQUEwQjtRQUNwRCxLQUFLLENBQUMsa0JBQWtCLENBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBRztJQUUxQixDQUFDO0NBQ0Y7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQzlCLElBQU8sRUFBRSxPQUEwQjtJQUNyQywrRkFBK0Y7SUFDL0YsMkRBQTJEO0lBQzNELGtEQUFrRDtJQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUV4QyxJQUFJLFlBQVksR0FBRyxHQUFHLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRWpFLElBQUksU0FBUyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDekIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hELFlBQVk7WUFDUixHQUFHLFlBQVksR0FBRyxTQUFTLGlCQUFpQiwyQkFBMkIsSUFBSSxRQUFRLEVBQUUsQ0FBQztLQUMzRjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFUlJPUl9ERVRBSUxTX1BBR0VfQkFTRV9VUkx9IGZyb20gJy4vZXJyb3JfZGV0YWlsc19iYXNlX3VybCc7XG5cbi8qKlxuICogVGhlIGxpc3Qgb2YgZXJyb3IgY29kZXMgdXNlZCBpbiBydW50aW1lIGNvZGUgb2YgdGhlIGBjb3JlYCBwYWNrYWdlLlxuICogUmVzZXJ2ZWQgZXJyb3IgY29kZSByYW5nZTogMTAwLTk5OS5cbiAqXG4gKiBOb3RlOiB0aGUgbWludXMgc2lnbiBkZW5vdGVzIHRoZSBmYWN0IHRoYXQgYSBwYXJ0aWN1bGFyIGNvZGUgaGFzIGEgZGV0YWlsZWQgZ3VpZGUgb25cbiAqIGFuZ3VsYXIuaW8uIFRoaXMgZXh0cmEgYW5ub3RhdGlvbiBpcyBuZWVkZWQgdG8gYXZvaWQgaW50cm9kdWNpbmcgYSBzZXBhcmF0ZSBzZXQgdG8gc3RvcmVcbiAqIGVycm9yIGNvZGVzIHdoaWNoIGhhdmUgZ3VpZGVzLCB3aGljaCBtaWdodCBsZWFrIGludG8gcnVudGltZSBjb2RlLlxuICpcbiAqIEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgZXJyb3IgZ3VpZGVzIGNhbiBiZSBmb3VuZCBhdCBodHRwczovL2FuZ3VsYXIuaW8vZXJyb3JzLlxuICpcbiAqIEVycm9yIGNvZGUgcmFuZ2VzIHBlciBwYWNrYWdlOlxuICogIC0gY29yZSAodGhpcyBwYWNrYWdlKTogMTAwLTk5OVxuICogIC0gZm9ybXM6IDEwMDAtMTk5OVxuICogIC0gY29tbW9uOiAyMDAwLTI5OTlcbiAqICAtIGFuaW1hdGlvbnM6IDMwMDAtMzk5OVxuICogIC0gcm91dGVyOiA0MDAwLTQ5OTlcbiAqICAtIHBsYXRmb3JtLWJyb3dzZXI6IDUwMDAtNTUwMFxuICovXG5leHBvcnQgY29uc3QgZW51bSBSdW50aW1lRXJyb3JDb2RlIHtcbiAgLy8gQ2hhbmdlIERldGVjdGlvbiBFcnJvcnNcbiAgRVhQUkVTU0lPTl9DSEFOR0VEX0FGVEVSX0NIRUNLRUQgPSAtMTAwLFxuICBSRUNVUlNJVkVfQVBQTElDQVRJT05fUkVGX1RJQ0sgPSAxMDEsXG4gIFJFQ1VSU0lWRV9BUFBMSUNBVElPTl9SRU5ERVIgPSAxMDIsXG5cbiAgLy8gRGVwZW5kZW5jeSBJbmplY3Rpb24gRXJyb3JzXG4gIENZQ0xJQ19ESV9ERVBFTkRFTkNZID0gLTIwMCxcbiAgUFJPVklERVJfTk9UX0ZPVU5EID0gLTIwMSxcbiAgSU5WQUxJRF9GQUNUT1JZX0RFUEVOREVOQ1kgPSAyMDIsXG4gIE1JU1NJTkdfSU5KRUNUSU9OX0NPTlRFWFQgPSAtMjAzLFxuICBJTlZBTElEX0lOSkVDVElPTl9UT0tFTiA9IDIwNCxcbiAgSU5KRUNUT1JfQUxSRUFEWV9ERVNUUk9ZRUQgPSAyMDUsXG4gIFBST1ZJREVSX0lOX1dST05HX0NPTlRFWFQgPSAyMDcsXG4gIE1JU1NJTkdfSU5KRUNUSU9OX1RPS0VOID0gMjA4LFxuICBJTlZBTElEX01VTFRJX1BST1ZJREVSID0gLTIwOSxcbiAgTUlTU0lOR19ET0NVTUVOVCA9IDIxMCxcblxuICAvLyBUZW1wbGF0ZSBFcnJvcnNcbiAgTVVMVElQTEVfQ09NUE9ORU5UU19NQVRDSCA9IC0zMDAsXG4gIEVYUE9SVF9OT1RfRk9VTkQgPSAtMzAxLFxuICBQSVBFX05PVF9GT1VORCA9IC0zMDIsXG4gIFVOS05PV05fQklORElORyA9IDMwMyxcbiAgVU5LTk9XTl9FTEVNRU5UID0gMzA0LFxuICBURU1QTEFURV9TVFJVQ1RVUkVfRVJST1IgPSAzMDUsXG4gIElOVkFMSURfRVZFTlRfQklORElORyA9IDMwNixcbiAgSE9TVF9ESVJFQ1RJVkVfVU5SRVNPTFZBQkxFID0gMzA3LFxuICBIT1NUX0RJUkVDVElWRV9OT1RfU1RBTkRBTE9ORSA9IDMwOCxcbiAgRFVQTElDQVRFX0RJUkVDVElUVkUgPSAzMDksXG4gIEhPU1RfRElSRUNUSVZFX0NPTVBPTkVOVCA9IDMxMCxcbiAgSE9TVF9ESVJFQ1RJVkVfVU5ERUZJTkVEX0JJTkRJTkcgPSAzMTEsXG4gIEhPU1RfRElSRUNUSVZFX0NPTkZMSUNUSU5HX0FMSUFTID0gMzEyLFxuICBNVUxUSVBMRV9NQVRDSElOR19QSVBFUyA9IDMxMyxcblxuICAvLyBCb290c3RyYXAgRXJyb3JzXG4gIE1VTFRJUExFX1BMQVRGT1JNUyA9IDQwMCxcbiAgUExBVEZPUk1fTk9UX0ZPVU5EID0gNDAxLFxuICBNSVNTSU5HX1JFUVVJUkVEX0lOSkVDVEFCTEVfSU5fQk9PVFNUUkFQID0gNDAyLFxuICBCT09UU1RSQVBfQ09NUE9ORU5UU19OT1RfRk9VTkQgPSAtNDAzLFxuICBQTEFURk9STV9BTFJFQURZX0RFU1RST1lFRCA9IDQwNCxcbiAgQVNZTkNfSU5JVElBTElaRVJTX1NUSUxMX1JVTk5JTkcgPSA0MDUsXG4gIEFQUExJQ0FUSU9OX1JFRl9BTFJFQURZX0RFU1RST1lFRCA9IDQwNixcbiAgUkVOREVSRVJfTk9UX0ZPVU5EID0gNDA3LFxuXG4gIC8vIEh5ZHJhdGlvbiBFcnJvcnNcbiAgSFlEUkFUSU9OX05PREVfTUlTTUFUQ0ggPSAtNTAwLFxuICBIWURSQVRJT05fTUlTU0lOR19TSUJMSU5HUyA9IC01MDEsXG4gIEhZRFJBVElPTl9NSVNTSU5HX05PREUgPSAtNTAyLFxuICBVTlNVUFBPUlRFRF9QUk9KRUNUSU9OX0RPTV9OT0RFUyA9IC01MDMsXG4gIElOVkFMSURfU0tJUF9IWURSQVRJT05fSE9TVCA9IC01MDQsXG4gIE1JU1NJTkdfSFlEUkFUSU9OX0FOTk9UQVRJT05TID0gLTUwNSxcbiAgSFlEUkFUSU9OX1NUQUJMRV9USU1FRE9VVCA9IC01MDYsXG4gIE1JU1NJTkdfU1NSX0NPTlRFTlRfSU5URUdSSVRZX01BUktFUiA9IC01MDcsXG5cbiAgLy8gU2lnbmFsIEVycm9yc1xuICBTSUdOQUxfV1JJVEVfRlJPTV9JTExFR0FMX0NPTlRFWFQgPSA2MDAsXG4gIFJFUVVJUkVfU1lOQ19XSVRIT1VUX1NZTkNfRU1JVCA9IDYwMSxcblxuICAvLyBTdHlsaW5nIEVycm9yc1xuXG4gIC8vIERlY2xhcmF0aW9ucyBFcnJvcnNcblxuICAvLyBpMThuIEVycm9yc1xuICBJTlZBTElEX0kxOE5fU1RSVUNUVVJFID0gNzAwLFxuICBNSVNTSU5HX0xPQ0FMRV9EQVRBID0gNzAxLFxuXG4gIC8vIHN0YW5kYWxvbmUgZXJyb3JzXG4gIElNUE9SVF9QUk9WSURFUlNfRlJPTV9TVEFOREFMT05FID0gODAwLFxuXG4gIC8vIEpJVCBDb21waWxhdGlvbiBFcnJvcnNcbiAgLy8gT3RoZXJcbiAgSU5WQUxJRF9ESUZGRVJfSU5QVVQgPSA5MDAsXG4gIE5PX1NVUFBPUlRJTkdfRElGRkVSX0ZBQ1RPUlkgPSA5MDEsXG4gIFZJRVdfQUxSRUFEWV9BVFRBQ0hFRCA9IDkwMixcbiAgSU5WQUxJRF9JTkhFUklUQU5DRSA9IDkwMyxcbiAgVU5TQUZFX1ZBTFVFX0lOX1JFU09VUkNFX1VSTCA9IDkwNCxcbiAgVU5TQUZFX1ZBTFVFX0lOX1NDUklQVCA9IDkwNSxcbiAgTUlTU0lOR19HRU5FUkFURURfREVGID0gOTA2LFxuICBUWVBFX0lTX05PVF9TVEFOREFMT05FID0gOTA3LFxuICBNSVNTSU5HX1pPTkVKUyA9IDkwOCxcbiAgVU5FWFBFQ1RFRF9aT05FX1NUQVRFID0gOTA5LFxuICBVTlNBRkVfSUZSQU1FX0FUVFJTID0gLTkxMCxcbiAgVklFV19BTFJFQURZX0RFU1RST1lFRCA9IDkxMSxcbiAgQ09NUE9ORU5UX0lEX0NPTExJU0lPTiA9IC05MTIsXG5cbiAgLy8gUnVudGltZSBkZXBlbmRlbmN5IHRyYWNrZXIgZXJyb3JzXG4gIFJVTlRJTUVfREVQU19JTlZBTElEX0lNUE9SVEVEX1RZUEUgPSAxMDAwLFxufVxuXG5cbi8qKlxuICogQ2xhc3MgdGhhdCByZXByZXNlbnRzIGEgcnVudGltZSBlcnJvci5cbiAqIEZvcm1hdHMgYW5kIG91dHB1dHMgdGhlIGVycm9yIG1lc3NhZ2UgaW4gYSBjb25zaXN0ZW50IHdheS5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgXG4gKiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAqICAgIFJ1bnRpbWVFcnJvckNvZGUuSU5KRUNUT1JfQUxSRUFEWV9ERVNUUk9ZRUQsXG4gKiAgICBuZ0Rldk1vZGUgJiYgJ0luamVjdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkLicpO1xuICogYGBgXG4gKlxuICogTm90ZTogdGhlIGBtZXNzYWdlYCBhcmd1bWVudCBjb250YWlucyBhIGRlc2NyaXB0aXZlIGVycm9yIG1lc3NhZ2UgYXMgYSBzdHJpbmcgaW4gZGV2ZWxvcG1lbnRcbiAqIG1vZGUgKHdoZW4gdGhlIGBuZ0Rldk1vZGVgIGlzIGRlZmluZWQpLiBJbiBwcm9kdWN0aW9uIG1vZGUgKGFmdGVyIHRyZWUtc2hha2luZyBwYXNzKSwgdGhlXG4gKiBgbWVzc2FnZWAgYXJndW1lbnQgYmVjb21lcyBgZmFsc2VgLCB0aHVzIHdlIGFjY291bnQgZm9yIGl0IGluIHRoZSB0eXBpbmdzIGFuZCB0aGUgcnVudGltZVxuICogbG9naWMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW50aW1lRXJyb3I8VCBleHRlbmRzIG51bWJlciA9IFJ1bnRpbWVFcnJvckNvZGU+IGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29kZTogVCwgbWVzc2FnZTogbnVsbHxmYWxzZXxzdHJpbmcpIHtcbiAgICBzdXBlcihmb3JtYXRSdW50aW1lRXJyb3I8VD4oY29kZSwgbWVzc2FnZSkpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbGVkIHRvIGZvcm1hdCBhIHJ1bnRpbWUgZXJyb3IuXG4gKiBTZWUgYWRkaXRpb25hbCBpbmZvIG9uIHRoZSBgbWVzc2FnZWAgYXJndW1lbnQgdHlwZSBpbiB0aGUgYFJ1bnRpbWVFcnJvcmAgY2xhc3MgZGVzY3JpcHRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRSdW50aW1lRXJyb3I8VCBleHRlbmRzIG51bWJlciA9IFJ1bnRpbWVFcnJvckNvZGU+KFxuICAgIGNvZGU6IFQsIG1lc3NhZ2U6IG51bGx8ZmFsc2V8c3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gRXJyb3IgY29kZSBtaWdodCBiZSBhIG5lZ2F0aXZlIG51bWJlciwgd2hpY2ggaXMgYSBzcGVjaWFsIG1hcmtlciB0aGF0IGluc3RydWN0cyB0aGUgbG9naWMgdG9cbiAgLy8gZ2VuZXJhdGUgYSBsaW5rIHRvIHRoZSBlcnJvciBkZXRhaWxzIHBhZ2Ugb24gYW5ndWxhci5pby5cbiAgLy8gV2UgYWxzbyBwcmVwZW5kIGAwYCB0byBub24tY29tcGlsZS10aW1lIGVycm9ycy5cbiAgY29uc3QgZnVsbENvZGUgPSBgTkcwJHtNYXRoLmFicyhjb2RlKX1gO1xuXG4gIGxldCBlcnJvck1lc3NhZ2UgPSBgJHtmdWxsQ29kZX0ke21lc3NhZ2UgPyAnOiAnICsgbWVzc2FnZSA6ICcnfWA7XG5cbiAgaWYgKG5nRGV2TW9kZSAmJiBjb2RlIDwgMCkge1xuICAgIGNvbnN0IGFkZFBlcmlvZFNlcGFyYXRvciA9ICFlcnJvck1lc3NhZ2UubWF0Y2goL1suLDshP1xcbl0kLyk7XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gYWRkUGVyaW9kU2VwYXJhdG9yID8gJy4nIDogJyc7XG4gICAgZXJyb3JNZXNzYWdlID1cbiAgICAgICAgYCR7ZXJyb3JNZXNzYWdlfSR7c2VwYXJhdG9yfSBGaW5kIG1vcmUgYXQgJHtFUlJPUl9ERVRBSUxTX1BBR0VfQkFTRV9VUkx9LyR7ZnVsbENvZGV9YDtcbiAgfVxuICByZXR1cm4gZXJyb3JNZXNzYWdlO1xufVxuIl19