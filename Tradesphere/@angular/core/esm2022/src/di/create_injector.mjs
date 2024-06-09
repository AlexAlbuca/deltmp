/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EMPTY_ARRAY } from '../util/empty';
import { stringify } from '../util/stringify';
import { importProvidersFrom } from './provider_collection';
import { getNullInjector, R3Injector } from './r3_injector';
/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 */
export function createInjector(defType, parent = null, additionalProviders = null, name) {
    const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
    injector.resolveInjectorInitializers();
    return injector;
}
/**
 * Creates a new injector without eagerly resolving its injector types. Can be used in places
 * where resolving the injector types immediately can lead to an infinite loop. The injector types
 * should be resolved at a later point by calling `_resolveInjectorDefTypes`.
 */
export function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name, scopes = new Set()) {
    const providers = [
        additionalProviders || EMPTY_ARRAY,
        importProvidersFrom(defType),
    ];
    name = name || (typeof defType === 'object' ? undefined : stringify(defType));
    return new R3Injector(providers, parent || getNullInjector(), name || null, scopes);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2luamVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGkvY3JlYXRlX2luamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSTVDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyxlQUFlLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzFEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FDMUIsT0FBb0MsRUFBRSxTQUF3QixJQUFJLEVBQ2xFLHNCQUEyRCxJQUFJLEVBQUUsSUFBYTtJQUNoRixNQUFNLFFBQVEsR0FDVixzQ0FBc0MsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZGLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNDQUFzQyxDQUNsRCxPQUFvQyxFQUFFLFNBQXdCLElBQUksRUFDbEUsc0JBQTJELElBQUksRUFBRSxJQUFhLEVBQzlFLFNBQVMsSUFBSSxHQUFHLEVBQWlCO0lBQ25DLE1BQU0sU0FBUyxHQUFHO1FBQ2hCLG1CQUFtQixJQUFJLFdBQVc7UUFDbEMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO0tBQzdCLENBQUM7SUFDRixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTlFLE9BQU8sSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sSUFBSSxlQUFlLEVBQUUsRUFBRSxJQUFJLElBQUksSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFTVBUWV9BUlJBWX0gZnJvbSAnLi4vdXRpbC9lbXB0eSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuXG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCB7UHJvdmlkZXIsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICcuL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge2ltcG9ydFByb3ZpZGVyc0Zyb219IGZyb20gJy4vcHJvdmlkZXJfY29sbGVjdGlvbic7XG5pbXBvcnQge2dldE51bGxJbmplY3RvciwgUjNJbmplY3Rvcn0gZnJvbSAnLi9yM19pbmplY3Rvcic7XG5pbXBvcnQge0luamVjdG9yU2NvcGV9IGZyb20gJy4vc2NvcGUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBgSW5qZWN0b3JgIHdoaWNoIGlzIGNvbmZpZ3VyZWQgdXNpbmcgYSBgZGVmVHlwZWAgb2YgYEluamVjdG9yVHlwZTxhbnk+YHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbmplY3RvcihcbiAgICBkZWZUeXBlOiAvKiBJbmplY3RvclR5cGU8YW55PiAqLyBhbnksIHBhcmVudDogSW5qZWN0b3J8bnVsbCA9IG51bGwsXG4gICAgYWRkaXRpb25hbFByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXJ8U3RhdGljUHJvdmlkZXI+fG51bGwgPSBudWxsLCBuYW1lPzogc3RyaW5nKTogSW5qZWN0b3Ige1xuICBjb25zdCBpbmplY3RvciA9XG4gICAgICBjcmVhdGVJbmplY3RvcldpdGhvdXRJbmplY3Rvckluc3RhbmNlcyhkZWZUeXBlLCBwYXJlbnQsIGFkZGl0aW9uYWxQcm92aWRlcnMsIG5hbWUpO1xuICBpbmplY3Rvci5yZXNvbHZlSW5qZWN0b3JJbml0aWFsaXplcnMoKTtcbiAgcmV0dXJuIGluamVjdG9yO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5qZWN0b3Igd2l0aG91dCBlYWdlcmx5IHJlc29sdmluZyBpdHMgaW5qZWN0b3IgdHlwZXMuIENhbiBiZSB1c2VkIGluIHBsYWNlc1xuICogd2hlcmUgcmVzb2x2aW5nIHRoZSBpbmplY3RvciB0eXBlcyBpbW1lZGlhdGVseSBjYW4gbGVhZCB0byBhbiBpbmZpbml0ZSBsb29wLiBUaGUgaW5qZWN0b3IgdHlwZXNcbiAqIHNob3VsZCBiZSByZXNvbHZlZCBhdCBhIGxhdGVyIHBvaW50IGJ5IGNhbGxpbmcgYF9yZXNvbHZlSW5qZWN0b3JEZWZUeXBlc2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbmplY3RvcldpdGhvdXRJbmplY3Rvckluc3RhbmNlcyhcbiAgICBkZWZUeXBlOiAvKiBJbmplY3RvclR5cGU8YW55PiAqLyBhbnksIHBhcmVudDogSW5qZWN0b3J8bnVsbCA9IG51bGwsXG4gICAgYWRkaXRpb25hbFByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXJ8U3RhdGljUHJvdmlkZXI+fG51bGwgPSBudWxsLCBuYW1lPzogc3RyaW5nLFxuICAgIHNjb3BlcyA9IG5ldyBTZXQ8SW5qZWN0b3JTY29wZT4oKSk6IFIzSW5qZWN0b3Ige1xuICBjb25zdCBwcm92aWRlcnMgPSBbXG4gICAgYWRkaXRpb25hbFByb3ZpZGVycyB8fCBFTVBUWV9BUlJBWSxcbiAgICBpbXBvcnRQcm92aWRlcnNGcm9tKGRlZlR5cGUpLFxuICBdO1xuICBuYW1lID0gbmFtZSB8fCAodHlwZW9mIGRlZlR5cGUgPT09ICdvYmplY3QnID8gdW5kZWZpbmVkIDogc3RyaW5naWZ5KGRlZlR5cGUpKTtcblxuICByZXR1cm4gbmV3IFIzSW5qZWN0b3IocHJvdmlkZXJzLCBwYXJlbnQgfHwgZ2V0TnVsbEluamVjdG9yKCksIG5hbWUgfHwgbnVsbCwgc2NvcGVzKTtcbn1cbiJdfQ==