/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertIndexInRange, assertLessThan, assertNotSame } from '../util/assert';
import { devModeEqual } from '../util/comparison';
import { getExpressionChangedErrorDetails, throwErrorIfNoChangesMode } from './errors';
import { isInCheckNoChangesMode } from './state';
import { NO_CHANGE } from './tokens';
// TODO(misko): consider inlining
/** Updates binding and returns the value. */
export function updateBinding(lView, bindingIndex, value) {
    return lView[bindingIndex] = value;
}
/** Gets the current binding value. */
export function getBinding(lView, bindingIndex) {
    ngDevMode && assertIndexInRange(lView, bindingIndex);
    ngDevMode &&
        assertNotSame(lView[bindingIndex], NO_CHANGE, 'Stored value should never be NO_CHANGE.');
    return lView[bindingIndex];
}
/**
 * Updates binding if changed, then returns whether it was updated.
 *
 * This function also checks the `CheckNoChangesMode` and throws if changes are made.
 * Some changes (Objects/iterables) during `CheckNoChangesMode` are exempt to comply with VE
 * behavior.
 *
 * @param lView current `LView`
 * @param bindingIndex The binding in the `LView` to check
 * @param value New value to check against `lView[bindingIndex]`
 * @returns `true` if the bindings has changed. (Throws if binding has changed during
 *          `CheckNoChangesMode`)
 */
export function bindingUpdated(lView, bindingIndex, value) {
    ngDevMode && assertNotSame(value, NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
    ngDevMode &&
        assertLessThan(bindingIndex, lView.length, `Slot should have been initialized to NO_CHANGE`);
    const oldValue = lView[bindingIndex];
    if (Object.is(oldValue, value)) {
        return false;
    }
    else {
        if (ngDevMode && isInCheckNoChangesMode()) {
            // View engine didn't report undefined values as changed on the first checkNoChanges pass
            // (before the change detection was run).
            const oldValueToCompare = oldValue !== NO_CHANGE ? oldValue : undefined;
            if (!devModeEqual(oldValueToCompare, value)) {
                const details = getExpressionChangedErrorDetails(lView, bindingIndex, oldValueToCompare, value);
                throwErrorIfNoChangesMode(oldValue === NO_CHANGE, details.oldValue, details.newValue, details.propName, lView);
            }
            // There was a change, but the `devModeEqual` decided that the change is exempt from an error.
            // For this reason we exit as if no change. The early exit is needed to prevent the changed
            // value to be written into `LView` (If we would write the new value that we would not see it
            // as change on next CD.)
            return false;
        }
        lView[bindingIndex] = value;
        return true;
    }
}
/** Updates 2 bindings if changed, then returns whether either was updated. */
export function bindingUpdated2(lView, bindingIndex, exp1, exp2) {
    const different = bindingUpdated(lView, bindingIndex, exp1);
    return bindingUpdated(lView, bindingIndex + 1, exp2) || different;
}
/** Updates 3 bindings if changed, then returns whether any was updated. */
export function bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) {
    const different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
    return bindingUpdated(lView, bindingIndex + 2, exp3) || different;
}
/** Updates 4 bindings if changed, then returns whether any was updated. */
export function bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) {
    const different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
    return bindingUpdated2(lView, bindingIndex + 2, exp3, exp4) || different;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2JpbmRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRWhELE9BQU8sRUFBQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVyRixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDL0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUduQyxpQ0FBaUM7QUFDakMsNkNBQTZDO0FBQzdDLE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBWSxFQUFFLFlBQW9CLEVBQUUsS0FBVTtJQUMxRSxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDckMsQ0FBQztBQUdELHNDQUFzQztBQUN0QyxNQUFNLFVBQVUsVUFBVSxDQUFDLEtBQVksRUFBRSxZQUFvQjtJQUMzRCxTQUFTLElBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JELFNBQVM7UUFDTCxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO0lBQzdGLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQVksRUFBRSxZQUFvQixFQUFFLEtBQVU7SUFDM0UsU0FBUyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLDJDQUEyQyxDQUFDLENBQUM7SUFDMUYsU0FBUztRQUNMLGNBQWMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzlCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLElBQUksU0FBUyxJQUFJLHNCQUFzQixFQUFFLEVBQUU7WUFDekMseUZBQXlGO1lBQ3pGLHlDQUF5QztZQUN6QyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sT0FBTyxHQUNULGdDQUFnQyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLHlCQUF5QixDQUNyQixRQUFRLEtBQUssU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFGO1lBQ0QsOEZBQThGO1lBQzlGLDJGQUEyRjtZQUMzRiw2RkFBNkY7WUFDN0YseUJBQXlCO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsOEVBQThFO0FBQzlFLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBWSxFQUFFLFlBQW9CLEVBQUUsSUFBUyxFQUFFLElBQVM7SUFDdEYsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsT0FBTyxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO0FBQ3BFLENBQUM7QUFFRCwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLGVBQWUsQ0FDM0IsS0FBWSxFQUFFLFlBQW9CLEVBQUUsSUFBUyxFQUFFLElBQVMsRUFBRSxJQUFTO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxPQUFPLGNBQWMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDcEUsQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsZUFBZSxDQUMzQixLQUFZLEVBQUUsWUFBb0IsRUFBRSxJQUFTLEVBQUUsSUFBUyxFQUFFLElBQVMsRUFBRSxJQUFTO0lBQ2hGLE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO0FBQzNFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRJbmRleEluUmFuZ2UsIGFzc2VydExlc3NUaGFuLCBhc3NlcnROb3RTYW1lfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Rldk1vZGVFcXVhbH0gZnJvbSAnLi4vdXRpbC9jb21wYXJpc29uJztcblxuaW1wb3J0IHtnZXRFeHByZXNzaW9uQ2hhbmdlZEVycm9yRGV0YWlscywgdGhyb3dFcnJvcklmTm9DaGFuZ2VzTW9kZX0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtMVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtpc0luQ2hlY2tOb0NoYW5nZXNNb2RlfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuLy8gVE9ETyhtaXNrbyk6IGNvbnNpZGVyIGlubGluaW5nXG4vKiogVXBkYXRlcyBiaW5kaW5nIGFuZCByZXR1cm5zIHRoZSB2YWx1ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVCaW5kaW5nKGxWaWV3OiBMVmlldywgYmluZGluZ0luZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiBhbnkge1xuICByZXR1cm4gbFZpZXdbYmluZGluZ0luZGV4XSA9IHZhbHVlO1xufVxuXG5cbi8qKiBHZXRzIHRoZSBjdXJyZW50IGJpbmRpbmcgdmFsdWUuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmluZGluZyhsVmlldzogTFZpZXcsIGJpbmRpbmdJbmRleDogbnVtYmVyKTogYW55IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydEluZGV4SW5SYW5nZShsVmlldywgYmluZGluZ0luZGV4KTtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnROb3RTYW1lKGxWaWV3W2JpbmRpbmdJbmRleF0sIE5PX0NIQU5HRSwgJ1N0b3JlZCB2YWx1ZSBzaG91bGQgbmV2ZXIgYmUgTk9fQ0hBTkdFLicpO1xuICByZXR1cm4gbFZpZXdbYmluZGluZ0luZGV4XTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGJpbmRpbmcgaWYgY2hhbmdlZCwgdGhlbiByZXR1cm5zIHdoZXRoZXIgaXQgd2FzIHVwZGF0ZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBhbHNvIGNoZWNrcyB0aGUgYENoZWNrTm9DaGFuZ2VzTW9kZWAgYW5kIHRocm93cyBpZiBjaGFuZ2VzIGFyZSBtYWRlLlxuICogU29tZSBjaGFuZ2VzIChPYmplY3RzL2l0ZXJhYmxlcykgZHVyaW5nIGBDaGVja05vQ2hhbmdlc01vZGVgIGFyZSBleGVtcHQgdG8gY29tcGx5IHdpdGggVkVcbiAqIGJlaGF2aW9yLlxuICpcbiAqIEBwYXJhbSBsVmlldyBjdXJyZW50IGBMVmlld2BcbiAqIEBwYXJhbSBiaW5kaW5nSW5kZXggVGhlIGJpbmRpbmcgaW4gdGhlIGBMVmlld2AgdG8gY2hlY2tcbiAqIEBwYXJhbSB2YWx1ZSBOZXcgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCBgbFZpZXdbYmluZGluZ0luZGV4XWBcbiAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgYmluZGluZ3MgaGFzIGNoYW5nZWQuIChUaHJvd3MgaWYgYmluZGluZyBoYXMgY2hhbmdlZCBkdXJpbmdcbiAqICAgICAgICAgIGBDaGVja05vQ2hhbmdlc01vZGVgKVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZ1VwZGF0ZWQobFZpZXc6IExWaWV3LCBiaW5kaW5nSW5kZXg6IG51bWJlciwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0Tm90U2FtZSh2YWx1ZSwgTk9fQ0hBTkdFLCAnSW5jb21pbmcgdmFsdWUgc2hvdWxkIG5ldmVyIGJlIE5PX0NIQU5HRS4nKTtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnRMZXNzVGhhbihiaW5kaW5nSW5kZXgsIGxWaWV3Lmxlbmd0aCwgYFNsb3Qgc2hvdWxkIGhhdmUgYmVlbiBpbml0aWFsaXplZCB0byBOT19DSEFOR0VgKTtcbiAgY29uc3Qgb2xkVmFsdWUgPSBsVmlld1tiaW5kaW5nSW5kZXhdO1xuXG4gIGlmIChPYmplY3QuaXMob2xkVmFsdWUsIHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAobmdEZXZNb2RlICYmIGlzSW5DaGVja05vQ2hhbmdlc01vZGUoKSkge1xuICAgICAgLy8gVmlldyBlbmdpbmUgZGlkbid0IHJlcG9ydCB1bmRlZmluZWQgdmFsdWVzIGFzIGNoYW5nZWQgb24gdGhlIGZpcnN0IGNoZWNrTm9DaGFuZ2VzIHBhc3NcbiAgICAgIC8vIChiZWZvcmUgdGhlIGNoYW5nZSBkZXRlY3Rpb24gd2FzIHJ1bikuXG4gICAgICBjb25zdCBvbGRWYWx1ZVRvQ29tcGFyZSA9IG9sZFZhbHVlICE9PSBOT19DSEFOR0UgPyBvbGRWYWx1ZSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmICghZGV2TW9kZUVxdWFsKG9sZFZhbHVlVG9Db21wYXJlLCB2YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9XG4gICAgICAgICAgICBnZXRFeHByZXNzaW9uQ2hhbmdlZEVycm9yRGV0YWlscyhsVmlldywgYmluZGluZ0luZGV4LCBvbGRWYWx1ZVRvQ29tcGFyZSwgdmFsdWUpO1xuICAgICAgICB0aHJvd0Vycm9ySWZOb0NoYW5nZXNNb2RlKFxuICAgICAgICAgICAgb2xkVmFsdWUgPT09IE5PX0NIQU5HRSwgZGV0YWlscy5vbGRWYWx1ZSwgZGV0YWlscy5uZXdWYWx1ZSwgZGV0YWlscy5wcm9wTmFtZSwgbFZpZXcpO1xuICAgICAgfVxuICAgICAgLy8gVGhlcmUgd2FzIGEgY2hhbmdlLCBidXQgdGhlIGBkZXZNb2RlRXF1YWxgIGRlY2lkZWQgdGhhdCB0aGUgY2hhbmdlIGlzIGV4ZW1wdCBmcm9tIGFuIGVycm9yLlxuICAgICAgLy8gRm9yIHRoaXMgcmVhc29uIHdlIGV4aXQgYXMgaWYgbm8gY2hhbmdlLiBUaGUgZWFybHkgZXhpdCBpcyBuZWVkZWQgdG8gcHJldmVudCB0aGUgY2hhbmdlZFxuICAgICAgLy8gdmFsdWUgdG8gYmUgd3JpdHRlbiBpbnRvIGBMVmlld2AgKElmIHdlIHdvdWxkIHdyaXRlIHRoZSBuZXcgdmFsdWUgdGhhdCB3ZSB3b3VsZCBub3Qgc2VlIGl0XG4gICAgICAvLyBhcyBjaGFuZ2Ugb24gbmV4dCBDRC4pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxWaWV3W2JpbmRpbmdJbmRleF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKiogVXBkYXRlcyAyIGJpbmRpbmdzIGlmIGNoYW5nZWQsIHRoZW4gcmV0dXJucyB3aGV0aGVyIGVpdGhlciB3YXMgdXBkYXRlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nVXBkYXRlZDIobFZpZXc6IExWaWV3LCBiaW5kaW5nSW5kZXg6IG51bWJlciwgZXhwMTogYW55LCBleHAyOiBhbnkpOiBib29sZWFuIHtcbiAgY29uc3QgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQobFZpZXcsIGJpbmRpbmdJbmRleCwgZXhwMSk7XG4gIHJldHVybiBiaW5kaW5nVXBkYXRlZChsVmlldywgYmluZGluZ0luZGV4ICsgMSwgZXhwMikgfHwgZGlmZmVyZW50O1xufVxuXG4vKiogVXBkYXRlcyAzIGJpbmRpbmdzIGlmIGNoYW5nZWQsIHRoZW4gcmV0dXJucyB3aGV0aGVyIGFueSB3YXMgdXBkYXRlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nVXBkYXRlZDMoXG4gICAgbFZpZXc6IExWaWV3LCBiaW5kaW5nSW5kZXg6IG51bWJlciwgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSk6IGJvb2xlYW4ge1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDIobFZpZXcsIGJpbmRpbmdJbmRleCwgZXhwMSwgZXhwMik7XG4gIHJldHVybiBiaW5kaW5nVXBkYXRlZChsVmlldywgYmluZGluZ0luZGV4ICsgMiwgZXhwMykgfHwgZGlmZmVyZW50O1xufVxuXG4vKiogVXBkYXRlcyA0IGJpbmRpbmdzIGlmIGNoYW5nZWQsIHRoZW4gcmV0dXJucyB3aGV0aGVyIGFueSB3YXMgdXBkYXRlZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nVXBkYXRlZDQoXG4gICAgbFZpZXc6IExWaWV3LCBiaW5kaW5nSW5kZXg6IG51bWJlciwgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55KTogYm9vbGVhbiB7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkMihsVmlldywgYmluZGluZ0luZGV4LCBleHAxLCBleHAyKTtcbiAgcmV0dXJuIGJpbmRpbmdVcGRhdGVkMihsVmlldywgYmluZGluZ0luZGV4ICsgMiwgZXhwMywgZXhwNCkgfHwgZGlmZmVyZW50O1xufVxuIl19