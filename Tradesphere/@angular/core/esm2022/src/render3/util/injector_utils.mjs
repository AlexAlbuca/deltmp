/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertGreaterThan, assertNotEqual, assertNumber } from '../../util/assert';
import { NO_PARENT_INJECTOR } from '../interfaces/injector';
import { DECLARATION_VIEW, HEADER_OFFSET } from '../interfaces/view';
/// Parent Injector Utils ///////////////////////////////////////////////////////////////
export function hasParentInjector(parentLocation) {
    return parentLocation !== NO_PARENT_INJECTOR;
}
export function getParentInjectorIndex(parentLocation) {
    ngDevMode && assertNumber(parentLocation, 'Number expected');
    ngDevMode && assertNotEqual(parentLocation, -1, 'Not a valid state.');
    const parentInjectorIndex = parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
    ngDevMode &&
        assertGreaterThan(parentInjectorIndex, HEADER_OFFSET, 'Parent injector must be pointing past HEADER_OFFSET.');
    return parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
}
export function getParentInjectorViewOffset(parentLocation) {
    return parentLocation >> 16 /* RelativeInjectorLocationFlags.ViewOffsetShift */;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @returns The LView instance that contains the parent injector
 */
export function getParentInjectorView(location, startView) {
    let viewOffset = getParentInjectorViewOffset(location);
    let parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = parentView[DECLARATION_VIEW];
        viewOffset--;
    }
    return parentView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3V0aWwvaW5qZWN0b3JfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0JBQWtCLEVBQTBELE1BQU0sd0JBQXdCLENBQUM7QUFDbkgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBRzFFLHlGQUF5RjtBQUN6RixNQUFNLFVBQVUsaUJBQWlCLENBQUMsY0FBd0M7SUFDeEUsT0FBTyxjQUFjLEtBQUssa0JBQWtCLENBQUM7QUFDL0MsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxjQUF3QztJQUM3RSxTQUFTLElBQUksWUFBWSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdELFNBQVMsSUFBSSxjQUFjLENBQUMsY0FBcUIsRUFBRSxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sbUJBQW1CLEdBQUcsY0FBYyw4REFBa0QsQ0FBQztJQUM3RixTQUFTO1FBQ0wsaUJBQWlCLENBQ2IsbUJBQW1CLEVBQUUsYUFBYSxFQUNsQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sY0FBYyw4REFBa0QsQ0FBQztBQUMxRSxDQUFDO0FBRUQsTUFBTSxVQUFVLDJCQUEyQixDQUFDLGNBQXdDO0lBQ2xGLE9BQU8sY0FBYywwREFBaUQsQ0FBQztBQUN6RSxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsUUFBa0MsRUFBRSxTQUFnQjtJQUN4RixJQUFJLFVBQVUsR0FBRywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDM0Isd0ZBQXdGO0lBQ3hGLDJGQUEyRjtJQUMzRixzRkFBc0Y7SUFDdEYsNEJBQTRCO0lBQzVCLE9BQU8sVUFBVSxHQUFHLENBQUMsRUFBRTtRQUNyQixVQUFVLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFFLENBQUM7UUFDM0MsVUFBVSxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRHcmVhdGVyVGhhbiwgYXNzZXJ0Tm90RXF1YWwsIGFzc2VydE51bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtOT19QQVJFTlRfSU5KRUNUT1IsIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbiwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3N9IGZyb20gJy4uL2ludGVyZmFjZXMvaW5qZWN0b3InO1xuaW1wb3J0IHtERUNMQVJBVElPTl9WSUVXLCBIRUFERVJfT0ZGU0VULCBMVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcblxuXG4vLy8gUGFyZW50IEluamVjdG9yIFV0aWxzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1BhcmVudEluamVjdG9yKHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHBhcmVudExvY2F0aW9uICE9PSBOT19QQVJFTlRfSU5KRUNUT1I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvckluZGV4KHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24pOiBudW1iZXIge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHBhcmVudExvY2F0aW9uLCAnTnVtYmVyIGV4cGVjdGVkJyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROb3RFcXVhbChwYXJlbnRMb2NhdGlvbiBhcyBhbnksIC0xLCAnTm90IGEgdmFsaWQgc3RhdGUuJyk7XG4gIGNvbnN0IHBhcmVudEluamVjdG9ySW5kZXggPSBwYXJlbnRMb2NhdGlvbiAmIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzLkluamVjdG9ySW5kZXhNYXNrO1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydEdyZWF0ZXJUaGFuKFxuICAgICAgICAgIHBhcmVudEluamVjdG9ySW5kZXgsIEhFQURFUl9PRkZTRVQsXG4gICAgICAgICAgJ1BhcmVudCBpbmplY3RvciBtdXN0IGJlIHBvaW50aW5nIHBhc3QgSEVBREVSX09GRlNFVC4nKTtcbiAgcmV0dXJuIHBhcmVudExvY2F0aW9uICYgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuSW5qZWN0b3JJbmRleE1hc2s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvclZpZXdPZmZzZXQocGFyZW50TG9jYXRpb246IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbik6IG51bWJlciB7XG4gIHJldHVybiBwYXJlbnRMb2NhdGlvbiA+PiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb25GbGFncy5WaWV3T2Zmc2V0U2hpZnQ7XG59XG5cbi8qKlxuICogVW53cmFwcyBhIHBhcmVudCBpbmplY3RvciBsb2NhdGlvbiBudW1iZXIgdG8gZmluZCB0aGUgdmlldyBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCBpbmplY3RvcixcbiAqIHRoZW4gd2Fsa3MgdXAgdGhlIGRlY2xhcmF0aW9uIHZpZXcgdHJlZSB1bnRpbCB0aGUgdmlldyBpcyBmb3VuZCB0aGF0IGNvbnRhaW5zIHRoZSBwYXJlbnRcbiAqIGluamVjdG9yLlxuICpcbiAqIEBwYXJhbSBsb2NhdGlvbiBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcmVudCBpbmplY3Rvciwgd2hpY2ggY29udGFpbnMgdGhlIHZpZXcgb2Zmc2V0XG4gKiBAcGFyYW0gc3RhcnRWaWV3IFRoZSBMVmlldyBpbnN0YW5jZSBmcm9tIHdoaWNoIHRvIHN0YXJ0IHdhbGtpbmcgdXAgdGhlIHZpZXcgdHJlZVxuICogQHJldHVybnMgVGhlIExWaWV3IGluc3RhbmNlIHRoYXQgY29udGFpbnMgdGhlIHBhcmVudCBpbmplY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KGxvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24sIHN0YXJ0VmlldzogTFZpZXcpOiBMVmlldyB7XG4gIGxldCB2aWV3T2Zmc2V0ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3T2Zmc2V0KGxvY2F0aW9uKTtcbiAgbGV0IHBhcmVudFZpZXcgPSBzdGFydFZpZXc7XG4gIC8vIEZvciBtb3N0IGNhc2VzLCB0aGUgcGFyZW50IGluamVjdG9yIGNhbiBiZSBmb3VuZCBvbiB0aGUgaG9zdCBub2RlIChlLmcuIGZvciBjb21wb25lbnRcbiAgLy8gb3IgY29udGFpbmVyKSwgYnV0IHdlIG11c3Qga2VlcCB0aGUgbG9vcCBoZXJlIHRvIHN1cHBvcnQgdGhlIHJhcmVyIGNhc2Ugb2YgZGVlcGx5IG5lc3RlZFxuICAvLyA8bmctdGVtcGxhdGU+IHRhZ3Mgb3IgaW5saW5lIHZpZXdzLCB3aGVyZSB0aGUgcGFyZW50IGluamVjdG9yIG1pZ2h0IGxpdmUgbWFueSB2aWV3c1xuICAvLyBhYm92ZSB0aGUgY2hpbGQgaW5qZWN0b3IuXG4gIHdoaWxlICh2aWV3T2Zmc2V0ID4gMCkge1xuICAgIHBhcmVudFZpZXcgPSBwYXJlbnRWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddITtcbiAgICB2aWV3T2Zmc2V0LS07XG4gIH1cbiAgcmV0dXJuIHBhcmVudFZpZXc7XG59XG4iXX0=