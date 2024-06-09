/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectFlags, resolveForwardRef } from '../../di';
import { assertInjectImplementationNotEqual } from '../../di/inject_switch';
import { ɵɵinject } from '../../di/injector_compatibility';
import { emitInjectEvent } from '../debug/injector_profiler';
import { getOrCreateInjectable } from '../di';
import { getCurrentTNode, getLView } from '../state';
export function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
    const lView = getLView();
    // Fall back to inject() if view hasn't been created. This situation can happen in tests
    // if inject utilities are used before bootstrapping.
    if (lView === null) {
        // Verify that we will not get into infinite loop.
        ngDevMode && assertInjectImplementationNotEqual(ɵɵdirectiveInject);
        return ɵɵinject(token, flags);
    }
    const tNode = getCurrentTNode();
    const value = getOrCreateInjectable(tNode, lView, resolveForwardRef(token), flags);
    ngDevMode && emitInjectEvent(token, value, flags);
    return value;
}
/**
 * Throws an error indicating that a factory function could not be generated by the compiler for a
 * particular class.
 *
 * This instruction allows the actual error message to be optimized away when ngDevMode is turned
 * off, saving bytes of generated code while still providing a good experience in dev mode.
 *
 * The name of the class is not mentioned here, but will be in the generated factory function name
 * and thus in the stack trace.
 *
 * @codeGenApi
 */
export function ɵɵinvalidFactory() {
    const msg = ngDevMode ? `This constructor was not compatible with Dependency Injection.` : 'invalid';
    throw new Error(msg);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luc3RydWN0aW9ucy9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sT0FBTyxDQUFDO0FBRTVDLE9BQU8sRUFBQyxlQUFlLEVBQUUsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBNEJuRCxNQUFNLFVBQVUsaUJBQWlCLENBQUksS0FBdUIsRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU87SUFDdkYsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsd0ZBQXdGO0lBQ3hGLHFEQUFxRDtJQUNyRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsa0RBQWtEO1FBQ2xELFNBQVMsSUFBSSxrQ0FBa0MsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvQjtJQUNELE1BQU0sS0FBSyxHQUFHLGVBQWUsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sS0FBSyxHQUNQLHFCQUFxQixDQUFJLEtBQTJCLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLFNBQVMsSUFBSSxlQUFlLENBQUMsS0FBc0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkUsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCO0lBQzlCLE1BQU0sR0FBRyxHQUNMLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0VBQWdFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM3RixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7SW5qZWN0RmxhZ3MsIHJlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi8uLi9kaSc7XG5pbXBvcnQge2Fzc2VydEluamVjdEltcGxlbWVudGF0aW9uTm90RXF1YWx9IGZyb20gJy4uLy4uL2RpL2luamVjdF9zd2l0Y2gnO1xuaW1wb3J0IHvJtcm1aW5qZWN0fSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7UHJvdmlkZXJUb2tlbn0gZnJvbSAnLi4vLi4vZGkvcHJvdmlkZXJfdG9rZW4nO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2VtaXRJbmplY3RFdmVudH0gZnJvbSAnLi4vZGVidWcvaW5qZWN0b3JfcHJvZmlsZXInO1xuaW1wb3J0IHtnZXRPckNyZWF0ZUluamVjdGFibGV9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7VERpcmVjdGl2ZUhvc3ROb2RlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3fSBmcm9tICcuLi9zdGF0ZSc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUgZ2l2ZW4gdG9rZW4gZnJvbSB0aGUgaW5qZWN0b3JzLlxuICpcbiAqIGBkaXJlY3RpdmVJbmplY3RgIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgZm9yIGRpcmVjdGl2ZSwgY29tcG9uZW50IGFuZCBwaXBlIGZhY3Rvcmllcy5cbiAqICBBbGwgb3RoZXIgaW5qZWN0aW9uIHVzZSBgaW5qZWN0YCB3aGljaCBkb2VzIG5vdCB3YWxrIHRoZSBub2RlIGluamVjdG9yIHRyZWUuXG4gKlxuICogVXNhZ2UgZXhhbXBsZSAoaW4gZmFjdG9yeSBmdW5jdGlvbik6XG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIFNvbWVEaXJlY3RpdmUge1xuICogICBjb25zdHJ1Y3RvcihkaXJlY3RpdmU6IERpcmVjdGl2ZUEpIHt9XG4gKlxuICogICBzdGF0aWMgybVkaXIgPSDJtcm1ZGVmaW5lRGlyZWN0aXZlKHtcbiAqICAgICB0eXBlOiBTb21lRGlyZWN0aXZlLFxuICogICAgIGZhY3Rvcnk6ICgpID0+IG5ldyBTb21lRGlyZWN0aXZlKMm1ybVkaXJlY3RpdmVJbmplY3QoRGlyZWN0aXZlQSkpXG4gKiAgIH0pO1xuICogfVxuICogYGBgXG4gKiBAcGFyYW0gdG9rZW4gdGhlIHR5cGUgb3IgdG9rZW4gdG8gaW5qZWN0XG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3Igb3IgYG51bGxgIHdoZW4gbm90IGZvdW5kXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkaXJlY3RpdmVJbmplY3Q8VD4odG9rZW46IFByb3ZpZGVyVG9rZW48VD4pOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkaXJlY3RpdmVJbmplY3Q8VD4odG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIGZsYWdzOiBJbmplY3RGbGFncyk6IFQ7XG5leHBvcnQgZnVuY3Rpb24gybXJtWRpcmVjdGl2ZUluamVjdDxUPih0b2tlbjogUHJvdmlkZXJUb2tlbjxUPiwgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogVHxudWxsIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICAvLyBGYWxsIGJhY2sgdG8gaW5qZWN0KCkgaWYgdmlldyBoYXNuJ3QgYmVlbiBjcmVhdGVkLiBUaGlzIHNpdHVhdGlvbiBjYW4gaGFwcGVuIGluIHRlc3RzXG4gIC8vIGlmIGluamVjdCB1dGlsaXRpZXMgYXJlIHVzZWQgYmVmb3JlIGJvb3RzdHJhcHBpbmcuXG4gIGlmIChsVmlldyA9PT0gbnVsbCkge1xuICAgIC8vIFZlcmlmeSB0aGF0IHdlIHdpbGwgbm90IGdldCBpbnRvIGluZmluaXRlIGxvb3AuXG4gICAgbmdEZXZNb2RlICYmIGFzc2VydEluamVjdEltcGxlbWVudGF0aW9uTm90RXF1YWwoybXJtWRpcmVjdGl2ZUluamVjdCk7XG4gICAgcmV0dXJuIMm1ybVpbmplY3QodG9rZW4sIGZsYWdzKTtcbiAgfVxuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpO1xuICBjb25zdCB2YWx1ZSA9XG4gICAgICBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4odE5vZGUgYXMgVERpcmVjdGl2ZUhvc3ROb2RlLCBsVmlldywgcmVzb2x2ZUZvcndhcmRSZWYodG9rZW4pLCBmbGFncyk7XG4gIG5nRGV2TW9kZSAmJiBlbWl0SW5qZWN0RXZlbnQodG9rZW4gYXMgVHlwZTx1bmtub3duPiwgdmFsdWUsIGZsYWdzKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBlcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBmYWN0b3J5IGZ1bmN0aW9uIGNvdWxkIG5vdCBiZSBnZW5lcmF0ZWQgYnkgdGhlIGNvbXBpbGVyIGZvciBhXG4gKiBwYXJ0aWN1bGFyIGNsYXNzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWxsb3dzIHRoZSBhY3R1YWwgZXJyb3IgbWVzc2FnZSB0byBiZSBvcHRpbWl6ZWQgYXdheSB3aGVuIG5nRGV2TW9kZSBpcyB0dXJuZWRcbiAqIG9mZiwgc2F2aW5nIGJ5dGVzIG9mIGdlbmVyYXRlZCBjb2RlIHdoaWxlIHN0aWxsIHByb3ZpZGluZyBhIGdvb2QgZXhwZXJpZW5jZSBpbiBkZXYgbW9kZS5cbiAqXG4gKiBUaGUgbmFtZSBvZiB0aGUgY2xhc3MgaXMgbm90IG1lbnRpb25lZCBoZXJlLCBidXQgd2lsbCBiZSBpbiB0aGUgZ2VuZXJhdGVkIGZhY3RvcnkgZnVuY3Rpb24gbmFtZVxuICogYW5kIHRodXMgaW4gdGhlIHN0YWNrIHRyYWNlLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aW52YWxpZEZhY3RvcnkoKTogbmV2ZXIge1xuICBjb25zdCBtc2cgPVxuICAgICAgbmdEZXZNb2RlID8gYFRoaXMgY29uc3RydWN0b3Igd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggRGVwZW5kZW5jeSBJbmplY3Rpb24uYCA6ICdpbnZhbGlkJztcbiAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG59XG4iXX0=