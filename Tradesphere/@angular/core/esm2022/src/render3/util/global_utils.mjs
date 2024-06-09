/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined } from '../../util/assert';
import { global } from '../../util/global';
import { setupFrameworkInjectorProfiler } from '../debug/framework_injector_profiler';
import { setProfiler } from '../profiler';
import { applyChanges } from './change_detection_utils';
import { getComponent, getContext, getDirectiveMetadata, getDirectives, getHostElement, getInjector, getListeners, getOwningComponent, getRootComponents } from './discovery_utils';
import { getDependenciesFromInjectable, getInjectorProviders, getInjectorResolutionPath } from './injector_discovery_utils';
/**
 * This file introduces series of globally accessible debug tools
 * to allow for the Angular debugging story to function.
 *
 * To see this in action run the following command:
 *
 *   bazel run //packages/core/test/bundling/todo:devserver
 *
 *  Then load `localhost:5432` and start using the console tools.
 */
/**
 * This value reflects the property on the window where the dev
 * tools are patched (window.ng).
 * */
export const GLOBAL_PUBLISH_EXPANDO_KEY = 'ng';
let _published = false;
/**
 * Publishes a collection of default debug tools onto`window.ng`.
 *
 * These functions are available globally when Angular is in development
 * mode and are automatically stripped away from prod mode is on.
 */
export function publishDefaultGlobalUtils() {
    if (!_published) {
        _published = true;
        setupFrameworkInjectorProfiler();
        publishGlobalUtil('ɵgetDependenciesFromInjectable', getDependenciesFromInjectable);
        publishGlobalUtil('ɵgetInjectorProviders', getInjectorProviders);
        publishGlobalUtil('ɵgetInjectorResolutionPath', getInjectorResolutionPath);
        /**
         * Warning: this function is *INTERNAL* and should not be relied upon in application's code.
         * The contract of the function might be changed in any release and/or the function can be
         * removed completely.
         */
        publishGlobalUtil('ɵsetProfiler', setProfiler);
        publishGlobalUtil('getDirectiveMetadata', getDirectiveMetadata);
        publishGlobalUtil('getComponent', getComponent);
        publishGlobalUtil('getContext', getContext);
        publishGlobalUtil('getListeners', getListeners);
        publishGlobalUtil('getOwningComponent', getOwningComponent);
        publishGlobalUtil('getHostElement', getHostElement);
        publishGlobalUtil('getInjector', getInjector);
        publishGlobalUtil('getRootComponents', getRootComponents);
        publishGlobalUtil('getDirectives', getDirectives);
        publishGlobalUtil('applyChanges', applyChanges);
    }
}
/**
 * Publishes the given function to `window.ng` so that it can be
 * used from the browser console when an application is not in production.
 */
export function publishGlobalUtil(name, fn) {
    if (typeof COMPILED === 'undefined' || !COMPILED) {
        // Note: we can't export `ng` when using closure enhanced optimization as:
        // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
        // - we can't declare a closure extern as the namespace `ng` is already used within Google
        //   for typings for AngularJS (via `goog.provide('ng....')`).
        const w = global;
        ngDevMode && assertDefined(fn, 'function not defined');
        if (w) {
            let container = w[GLOBAL_PUBLISH_EXPANDO_KEY];
            if (!container) {
                container = w[GLOBAL_PUBLISH_EXPANDO_KEY] = {};
            }
            container[name] = fn;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy91dGlsL2dsb2JhbF91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFeEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xMLE9BQU8sRUFBQyw2QkFBNkIsRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBSTFIOzs7Ozs7Ozs7R0FTRztBQUVIOzs7S0FHSztBQUNMLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQztBQUUvQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDdkI7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWxCLDhCQUE4QixFQUFFLENBQUM7UUFDakMsaUJBQWlCLENBQUMsZ0NBQWdDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUNuRixpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pFLGlCQUFpQixDQUFDLDRCQUE0QixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDM0U7Ozs7V0FJRztRQUNILGlCQUFpQixDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hFLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRCxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2hELGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDNUQsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsaUJBQWlCLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDMUQsaUJBQWlCLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELGlCQUFpQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNqRDtBQUNILENBQUM7QUFNRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBWSxFQUFFLEVBQVk7SUFDMUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDaEQsMEVBQTBFO1FBQzFFLGdHQUFnRztRQUNoRywwRkFBMEY7UUFDMUYsOERBQThEO1FBQzlELE1BQU0sQ0FBQyxHQUFHLE1BQXVDLENBQUM7UUFDbEQsU0FBUyxJQUFJLGFBQWEsQ0FBQyxFQUFFLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsRUFBRTtZQUNMLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsU0FBUyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNoRDtZQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDdEI7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uLy4uL3V0aWwvZ2xvYmFsJztcbmltcG9ydCB7c2V0dXBGcmFtZXdvcmtJbmplY3RvclByb2ZpbGVyfSBmcm9tICcuLi9kZWJ1Zy9mcmFtZXdvcmtfaW5qZWN0b3JfcHJvZmlsZXInO1xuaW1wb3J0IHtzZXRQcm9maWxlcn0gZnJvbSAnLi4vcHJvZmlsZXInO1xuXG5pbXBvcnQge2FwcGx5Q2hhbmdlc30gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWxzJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50LCBnZXRDb250ZXh0LCBnZXREaXJlY3RpdmVNZXRhZGF0YSwgZ2V0RGlyZWN0aXZlcywgZ2V0SG9zdEVsZW1lbnQsIGdldEluamVjdG9yLCBnZXRMaXN0ZW5lcnMsIGdldE93bmluZ0NvbXBvbmVudCwgZ2V0Um9vdENvbXBvbmVudHN9IGZyb20gJy4vZGlzY292ZXJ5X3V0aWxzJztcbmltcG9ydCB7Z2V0RGVwZW5kZW5jaWVzRnJvbUluamVjdGFibGUsIGdldEluamVjdG9yUHJvdmlkZXJzLCBnZXRJbmplY3RvclJlc29sdXRpb25QYXRofSBmcm9tICcuL2luamVjdG9yX2Rpc2NvdmVyeV91dGlscyc7XG5cblxuXG4vKipcbiAqIFRoaXMgZmlsZSBpbnRyb2R1Y2VzIHNlcmllcyBvZiBnbG9iYWxseSBhY2Nlc3NpYmxlIGRlYnVnIHRvb2xzXG4gKiB0byBhbGxvdyBmb3IgdGhlIEFuZ3VsYXIgZGVidWdnaW5nIHN0b3J5IHRvIGZ1bmN0aW9uLlxuICpcbiAqIFRvIHNlZSB0aGlzIGluIGFjdGlvbiBydW4gdGhlIGZvbGxvd2luZyBjb21tYW5kOlxuICpcbiAqICAgYmF6ZWwgcnVuIC8vcGFja2FnZXMvY29yZS90ZXN0L2J1bmRsaW5nL3RvZG86ZGV2c2VydmVyXG4gKlxuICogIFRoZW4gbG9hZCBgbG9jYWxob3N0OjU0MzJgIGFuZCBzdGFydCB1c2luZyB0aGUgY29uc29sZSB0b29scy5cbiAqL1xuXG4vKipcbiAqIFRoaXMgdmFsdWUgcmVmbGVjdHMgdGhlIHByb3BlcnR5IG9uIHRoZSB3aW5kb3cgd2hlcmUgdGhlIGRldlxuICogdG9vbHMgYXJlIHBhdGNoZWQgKHdpbmRvdy5uZykuXG4gKiAqL1xuZXhwb3J0IGNvbnN0IEdMT0JBTF9QVUJMSVNIX0VYUEFORE9fS0VZID0gJ25nJztcblxubGV0IF9wdWJsaXNoZWQgPSBmYWxzZTtcbi8qKlxuICogUHVibGlzaGVzIGEgY29sbGVjdGlvbiBvZiBkZWZhdWx0IGRlYnVnIHRvb2xzIG9udG9gd2luZG93Lm5nYC5cbiAqXG4gKiBUaGVzZSBmdW5jdGlvbnMgYXJlIGF2YWlsYWJsZSBnbG9iYWxseSB3aGVuIEFuZ3VsYXIgaXMgaW4gZGV2ZWxvcG1lbnRcbiAqIG1vZGUgYW5kIGFyZSBhdXRvbWF0aWNhbGx5IHN0cmlwcGVkIGF3YXkgZnJvbSBwcm9kIG1vZGUgaXMgb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdWJsaXNoRGVmYXVsdEdsb2JhbFV0aWxzKCkge1xuICBpZiAoIV9wdWJsaXNoZWQpIHtcbiAgICBfcHVibGlzaGVkID0gdHJ1ZTtcblxuICAgIHNldHVwRnJhbWV3b3JrSW5qZWN0b3JQcm9maWxlcigpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCfJtWdldERlcGVuZGVuY2llc0Zyb21JbmplY3RhYmxlJywgZ2V0RGVwZW5kZW5jaWVzRnJvbUluamVjdGFibGUpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCfJtWdldEluamVjdG9yUHJvdmlkZXJzJywgZ2V0SW5qZWN0b3JQcm92aWRlcnMpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCfJtWdldEluamVjdG9yUmVzb2x1dGlvblBhdGgnLCBnZXRJbmplY3RvclJlc29sdXRpb25QYXRoKTtcbiAgICAvKipcbiAgICAgKiBXYXJuaW5nOiB0aGlzIGZ1bmN0aW9uIGlzICpJTlRFUk5BTCogYW5kIHNob3VsZCBub3QgYmUgcmVsaWVkIHVwb24gaW4gYXBwbGljYXRpb24ncyBjb2RlLlxuICAgICAqIFRoZSBjb250cmFjdCBvZiB0aGUgZnVuY3Rpb24gbWlnaHQgYmUgY2hhbmdlZCBpbiBhbnkgcmVsZWFzZSBhbmQvb3IgdGhlIGZ1bmN0aW9uIGNhbiBiZVxuICAgICAqIHJlbW92ZWQgY29tcGxldGVseS5cbiAgICAgKi9cbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnybVzZXRQcm9maWxlcicsIHNldFByb2ZpbGVyKTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0RGlyZWN0aXZlTWV0YWRhdGEnLCBnZXREaXJlY3RpdmVNZXRhZGF0YSk7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldENvbXBvbmVudCcsIGdldENvbXBvbmVudCk7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldENvbnRleHQnLCBnZXRDb250ZXh0KTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0TGlzdGVuZXJzJywgZ2V0TGlzdGVuZXJzKTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0T3duaW5nQ29tcG9uZW50JywgZ2V0T3duaW5nQ29tcG9uZW50KTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0SG9zdEVsZW1lbnQnLCBnZXRIb3N0RWxlbWVudCk7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldEluamVjdG9yJywgZ2V0SW5qZWN0b3IpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCdnZXRSb290Q29tcG9uZW50cycsIGdldFJvb3RDb21wb25lbnRzKTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0RGlyZWN0aXZlcycsIGdldERpcmVjdGl2ZXMpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCdhcHBseUNoYW5nZXMnLCBhcHBseUNoYW5nZXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWNsYXJlIHR5cGUgR2xvYmFsRGV2TW9kZUNvbnRhaW5lciA9IHtcbiAgW0dMT0JBTF9QVUJMSVNIX0VYUEFORE9fS0VZXToge1tmbk5hbWU6IHN0cmluZ106IEZ1bmN0aW9ufTtcbn07XG5cbi8qKlxuICogUHVibGlzaGVzIHRoZSBnaXZlbiBmdW5jdGlvbiB0byBgd2luZG93Lm5nYCBzbyB0aGF0IGl0IGNhbiBiZVxuICogdXNlZCBmcm9tIHRoZSBicm93c2VyIGNvbnNvbGUgd2hlbiBhbiBhcHBsaWNhdGlvbiBpcyBub3QgaW4gcHJvZHVjdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hHbG9iYWxVdGlsKG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICh0eXBlb2YgQ09NUElMRUQgPT09ICd1bmRlZmluZWQnIHx8ICFDT01QSUxFRCkge1xuICAgIC8vIE5vdGU6IHdlIGNhbid0IGV4cG9ydCBgbmdgIHdoZW4gdXNpbmcgY2xvc3VyZSBlbmhhbmNlZCBvcHRpbWl6YXRpb24gYXM6XG4gICAgLy8gLSBjbG9zdXJlIGRlY2xhcmVzIGdsb2JhbHMgaXRzZWxmIGZvciBtaW5pZmllZCBuYW1lcywgd2hpY2ggc29tZXRpbWVzIGNsb2JiZXIgb3VyIGBuZ2AgZ2xvYmFsXG4gICAgLy8gLSB3ZSBjYW4ndCBkZWNsYXJlIGEgY2xvc3VyZSBleHRlcm4gYXMgdGhlIG5hbWVzcGFjZSBgbmdgIGlzIGFscmVhZHkgdXNlZCB3aXRoaW4gR29vZ2xlXG4gICAgLy8gICBmb3IgdHlwaW5ncyBmb3IgQW5ndWxhckpTICh2aWEgYGdvb2cucHJvdmlkZSgnbmcuLi4uJylgKS5cbiAgICBjb25zdCB3ID0gZ2xvYmFsIGFzIGFueSBhcyBHbG9iYWxEZXZNb2RlQ29udGFpbmVyO1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKGZuLCAnZnVuY3Rpb24gbm90IGRlZmluZWQnKTtcbiAgICBpZiAodykge1xuICAgICAgbGV0IGNvbnRhaW5lciA9IHdbR0xPQkFMX1BVQkxJU0hfRVhQQU5ET19LRVldO1xuICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyID0gd1tHTE9CQUxfUFVCTElTSF9FWFBBTkRPX0tFWV0gPSB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lcltuYW1lXSA9IGZuO1xuICAgIH1cbiAgfVxufVxuIl19